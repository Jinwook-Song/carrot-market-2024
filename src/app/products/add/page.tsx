'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { uploadProduct } from './actions';
import { useFormState } from 'react-dom';

export default function AddProduct() {
  const [preview, setPreview] = useState('');

  const onImageChange = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    const file = files[0];

    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기가 2MB 이하인지 확인
    const maxFileSize = 2 * 1024 * 1024; // 최대 파일 크기를 바이트 단위로 설정 (2MB)
    if (file.size > maxFileSize) {
      alert('파일 크기는 2MB 이하만 가능합니다.');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const [state, action] = useFormState(uploadProduct, null);

  return (
    <div>
      <form action={action} className='flex flex-col gap-5 p-5'>
        <label
          style={{
            backgroundImage: `url(${preview})`,
          }}
          htmlFor='photo'
          className='border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover'
        >
          {preview === '' ? (
            <>
              <PhotoIcon className='w-20' />
              <div className='text-neutral-400 text-sm'>
                사진을 추가해주세요.
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type='file'
          id='photo'
          name='photo'
          accept='image/*'
          className='hidden'
        />
        <Input
          name='title'
          required
          placeholder='제목'
          type='text'
          errors={state?.fieldErrors.title}
        />
        <Input
          name='price'
          type='number'
          required
          placeholder='가격'
          errors={state?.fieldErrors.price}
        />
        <Input
          name='description'
          type='text'
          required
          placeholder='자세한 설명'
          errors={state?.fieldErrors.description}
        />
        <Button text='작성 완료' />
      </form>
    </div>
  );
}
