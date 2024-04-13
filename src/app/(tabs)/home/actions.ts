'use server';

import db from '@/libs/db';
import { Prisma } from '@prisma/client';

const ITEMS_PER_LOAD = 1;

interface FetchProducts {
  page: number;
}

export async function fetchProducts({ page = 0 }: FetchProducts) {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      createdAt: true,
      photo: true,
    },
    skip: page * ITEMS_PER_LOAD,
    take: ITEMS_PER_LOAD,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return products;
}

export type SimpleProducts = Prisma.PromiseReturnType<typeof fetchProducts>;
