import getSession from '@/libs/session';

interface DeleteButtonProps {
  ownerId: number;
  deleteProduct: () => Promise<never>;
}

async function getIsOwner(userId: number) {
  const session = await getSession();
  return session.id === userId;
}

export default async function DeleteButton({
  ownerId,
  deleteProduct,
}: DeleteButtonProps) {
  const isOwner = await getIsOwner(ownerId);
  if (isOwner)
    return (
      <form action={deleteProduct}>
        <button className='bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold'>
          Delete
        </button>
      </form>
    );

  return null;
}
