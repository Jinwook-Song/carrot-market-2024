'use server';

import db from '@/libs/db';
import getSession from '@/libs/session';
import { File } from 'buffer';
import { appendFileSync } from 'fs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const productSchema = z.object({
  photo: z.string({ required_error: 'Photo is required' }),
  title: z.string({ required_error: 'Title is required' }),
  price: z.coerce.number({ required_error: 'Price is required' }),
  description: z.string({ required_error: 'Description is required' }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };

  /* 서버 공간에 이미지 파일 업로드
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    const photoPath = `./public/images/${data.photo.name}`;
    appendFileSync(photoPath, Buffer.from(photoData));
    data.photo = photoPath.substring(8);
  } */

  const result = productSchema.safeParse(data);
  if (!result.success) return result.error.flatten();

  const session = await getSession();
  if (session.id === null) return;

  const product = await db.product.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      price: result.data.price,
      photo: result.data.photo,
      user: {
        connect: { id: session.id },
      },
    },
    select: {
      id: true,
    },
  });
  redirect(`/products/${product.id}`);
}

export async function getUploadUrl() {
  const baseUrl = 'https://api.cloudflare.com/client/v4/accounts/';
  const response = await fetch(
    `${baseUrl}${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
