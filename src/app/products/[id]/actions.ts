'use server';

import db from '@/libs/db';
import getSession from '@/libs/session';
import { redirect } from 'next/navigation';

export const createChatRoom = async (ownerId: number) => {
  const session = await getSession();
  const room = await db.chatRoom.create({
    data: {
      users: {
        connect: [
          {
            id: ownerId,
          },
          {
            id: session.id,
          },
        ],
      },
    },
    select: {
      id: true,
    },
  });

  redirect(`/chats/${room.id}`);
};
