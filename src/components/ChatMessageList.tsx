'use client';

import { InitialChatMessages } from '@/app/chats/[id]/page';
import { saveMessage } from '@/app/chats/actions';
import { cls, formatTimeAgo } from '@/libs/utils';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SUPABASE_PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bWtzc211aGRkem1ldmNmaHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTcyMjksImV4cCI6MjAyODkzMzIyOX0.Ul8I0TSMTVLSQtO3LUTr-FrLrznAoGnwfojgJsN2mEU';
const SUPABASE_URL = 'https://hymkssmuhddzmevcfhum.supabase.co';

interface ChatMessageListProps {
  chatRoomId: string;
  userId: number;
  initialChatMessages: InitialChatMessages;
  username: string;
  avatar: string;
}

export default function ChatMessageList({
  chatRoomId,
  userId,
  initialChatMessages,
  username,
  avatar,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initialChatMessages);
  const [message, setMessage] = useState('');
  const channel = useRef<RealtimeChannel>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: message,
        createdAt: new Date(),
        userId,
        user: {
          username: '',
          avatar: '',
        },
      },
    ]);
    channel.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: {
        id: Date.now(),
        payload: message,
        createdAt: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
    });
    setMessage('');
    await saveMessage({ chatRoomId, payload: message });
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on('broadcast', { event: 'message' }, (payload) => {
        setMessages((prevMsgs) => [...prevMsgs, payload.payload]);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  return (
    <div className='p-5 flex flex-col gap-5 min-h-screen justify-end'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cls(
            'flex gap-2 items-start',
            message.userId === userId ? 'justify-end' : ''
          )}
        >
          {message.userId === userId ? null : (
            <Image
              src={message.user.avatar!}
              alt={message.user.username}
              width={50}
              height={50}
              className='size-8 rounded-full'
            />
          )}
          <div
            className={cls(
              'flex flex-col gap-',
              message.userId === userId ? 'items-end' : ''
            )}
          >
            <span
              className={cls(
                'p-2.5 rounded-md',
                message.userId === userId ? 'bg-neutral-500' : 'bg-orange-500'
              )}
            >
              {message.payload}
            </span>
            <span className='text-xs'>{formatTimeAgo(message.createdAt)}</span>
          </div>
        </div>
      ))}
      <form className='flex relative' onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className='bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400'
          type='text'
          name='message'
          placeholder='Write a message...'
        />
        <button className='absolute right-0'>
          <ArrowUpCircleIcon className='size-10 text-orange-500 transition-colors hover:text-orange-300' />
        </button>
      </form>
    </div>
  );
}
