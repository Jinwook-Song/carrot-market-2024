'use client';

import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from '@heroicons/react/24/outline';
import { cls } from '@/libs/utils';
import { useOptimistic } from 'react';
import { dislikePost, likePost } from '@/app/posts/[id]/actions';

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

export default function LikeButton({
  postId,
  isLiked,
  likeCount,
}: LikeButtonProps) {
  const [state, reducer] = useOptimistic(
    { isLiked, likeCount }, // initial state
    (prev, payload) => ({
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    })
  );

  const toggleLike = async () => {
    reducer(undefined);
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      onClick={toggleLike}
      className={cls(
        `flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:brightness-105 transition-colors`,
        state.isLiked ? 'bg-orange-500 text-white border-orange-500' : ''
      )}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className='size-5' />
      ) : (
        <OutlineHandThumbUpIcon className='size-5' />
      )}
      <span>공감하기 ({state.likeCount})</span>
    </button>
  );
}
