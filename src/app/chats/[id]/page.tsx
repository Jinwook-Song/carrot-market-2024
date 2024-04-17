import ChatMessageList from '@/components/ChatMessageList';
import { DynamicParamas } from '@/interfaces/params';
import db from '@/libs/db';
import getSession from '@/libs/session';
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: { id },
    include: {
      users: { select: { id: true } },
    },
  });

  if (!room) return notFound();

  const session = await getSession();
  const authorized = Boolean(room.users.find((user) => user.id === session.id));
  if (!authorized) return notFound();

  return room;
}

async function getMessages(chatRoomId: string) {
  const messages = await db.chatMessage.findMany({
    where: { chatRoomId },
    select: {
      id: true,
      payload: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

async function getUserProfile() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id!,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  if (!user) notFound();
  return user;
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function ChatRoom({ params }: DynamicParamas) {
  await getRoom(params.id);
  const initialChatMessages = await getMessages(params.id);
  const session = await getSession();
  const user = await getUserProfile();

  return (
    <ChatMessageList
      chatRoomId={params.id}
      userId={session.id!}
      initialChatMessages={initialChatMessages}
      username={user.username}
      avatar={user.avatar!}
    />
  );
}
