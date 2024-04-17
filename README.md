# [Deploy](https://carrot-market-2024.vercel.app/)

## Prisma 수정시 주의

현재 DB가 클라우드에서 동작하기 떄문에 바로 db를 migration 하지 않는다

1.  `npx prisma migrate dev --create-only`
2.  `npx primsa migrate deploy`
    1번에서 문제없이 잘 돌아간 경우에만 deploy하는 식으로 주의 하여야함.
