'use server';

import db from '@/libs/db';
import getSession from '@/libs/session';
import { ChatMessage } from '@prisma/client';

interface SaveMessageProps {
  chatRoomId: string;
  payload: string;
}

export async function saveMessage({ chatRoomId, payload }: SaveMessageProps) {
  const session = await getSession();
  await db.chatMessage.create({
    data: {
      payload,
      chatRoomId,
      userId: session.id!,
    },
    select: { id: true },
  });
}
