'use server';

import db from '@/libs/db';
import getSession from '@/libs/session';
import { sleep } from '@/libs/utils';
import { revalidateTag } from 'next/cache';

export const likePost = async (postId: number) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {
    console.error(e);
  }
};

export const dislikePost = async (postId: number) => {
  await sleep();
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (e) {
    console.error(e);
  }
};
