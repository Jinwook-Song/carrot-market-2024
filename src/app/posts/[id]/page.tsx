import { DynamicParamas } from '@/interfaces/params';
import db from '@/libs/db';
import getSession from '@/libs/session';
import { unstable_cache as nextCache } from 'next/cache';
import { notFound } from 'next/navigation';
import { EyeIcon } from '@heroicons/react/24/solid';

import Image from 'next/image';
import { formatTimeAgo } from '@/libs/utils';
import LikeButton from '@/components/LikeButton';

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

async function getLikeStatus(postId: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: session.id!,
      },
    },
  });
  const likeCount = await db.like.count({
    where: { postId },
  });
  return {
    isLiked: Boolean(isLiked),
    likeCount,
  };
}

const getCachedPost = nextCache(getPost, ['post-detail']);
function getCachedLikeStatus(postId: number) {
  const cachedOperation = nextCache(getLikeStatus, ['product-like-status'], {
    tags: [`like-status-${postId}`],
    revalidate: 60,
  });
  return cachedOperation(postId);
}

export default async function PostDetail({ params }: DynamicParamas) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const post = await getCachedPost(id);
  if (!post) return notFound();

  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <div className='p-5 text-white'>
      <div className='flex items-center gap-2 mb-2'>
        <Image
          width={28}
          height={28}
          className='size-7 rounded-full'
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <span className='text-sm font-semibold'>{post.user.username}</span>
          <div className='text-xs'>
            <span>{formatTimeAgo(post.createdAt)}</span>
          </div>
        </div>
      </div>
      <h2 className='text-lg font-semibold'>{post.title}</h2>
      <p className='mb-5'>{post.description}</p>
      <div className='flex flex-col gap-5 items-start'>
        <div className='flex items-center gap-2 text-neutral-400 text-sm'>
          <EyeIcon className='size-5' />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton postId={id} isLiked={isLiked} likeCount={likeCount} />
      </div>
    </div>
  );
}
