'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { getUploadUrl, uploadProduct } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductType, productSchema } from './schema';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const onImageChange = async ({
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
    setFile(file);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      const photoUrl = `https://imagedelivery.net/0yNBnB1j4b45loBWzdicYQ/${id}`;
      setValue('photo', photoUrl);
    }
  };

  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (!file) return;
    const { title, price, description, photo } = data;

    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudflareForm,
    });

    if (response.status !== 200) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price.toString());
    formData.append('description', description);
    formData.append('photo', photo);

    const errors = await uploadProduct(formData);
    if (errors) {
      setError('photo', { type: 'server', message: 'upload failed' });
    }
  });

  const onValid = async () => await onSubmit();

  return (
    <div>
      <form action={onValid} className='flex flex-col gap-5 p-5'>
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
                {errors.photo?.message ?? '사진을 추가해주세요.'}
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
          {...register('title')}
          required
          placeholder='제목'
          type='text'
          errors={[errors.title?.message ?? '']}
        />
        <Input
          {...register('price')}
          type='number'
          required
          placeholder='가격'
          errors={[errors.price?.message ?? '']}
        />
        <Input
          {...register('description')}
          type='text'
          required
          placeholder='자세한 설명'
          errors={[errors.description?.message ?? '']}
        />
        <Button text='작성 완료' />
      </form>
    </div>
  );
}
