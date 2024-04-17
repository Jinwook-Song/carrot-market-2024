import { DynamicParamas } from '@/interfaces/params';
import db from '@/libs/db';
import getSession from '@/libs/session';
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
  const authorized = room.users.find((user) => user.id === session.id);
  if (!authorized) return notFound();

  return room;
}

export default async function ChatRoom({ params: { id } }: DynamicParamas) {
  const room = await getRoom(id);
  return <div>ChatRoom {room.id}</div>;
}
