import { UserIcon } from '@heroicons/react/24/solid';
import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarProps extends Pick<User, 'username' | 'avatar'> {}

export default function Avatar({ avatar, username }: AvatarProps) {
  return (
    <div className='size-10 rounded-full overflow-hidden'>
      {avatar === null ? (
        <UserIcon />
      ) : (
        <Image src={avatar} width={40} height={40} alt={username} />
      )}
    </div>
  );
}
