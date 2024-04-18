'use server';

import db from '@/libs/db';
import getSession from '@/libs/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const title = z.string();

export async function startStream(_: any, formData: FormData) {
  const results = title.safeParse(formData.get('title'));
  if (!results.success) {
    return results.error.flatten();
  }

  const baseUrl = 'https://api.cloudflare.com/client/v4/accounts/';
  const response = await fetch(
    `${baseUrl}${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
      body: JSON.stringify({
        meta: {
          name: results.data,
        },
        recording: {
          mode: 'automatic',
        },
      }),
    }
  );
  const data = await response.json();
  console.log(data);
  // const session = await getSession();

  // const stream = await db.liveStream.create({
  //   data: {
  //     title: results.data,
  //     streamId: data.result.uid,
  //     streamKey: data.result.rtmps.streamKey,
  //     userId: session.id!,
  //   },
  //   select: {
  //     id: true,
  //   },
  // });
  // redirect(`/streams/${stream.id}`);
}
