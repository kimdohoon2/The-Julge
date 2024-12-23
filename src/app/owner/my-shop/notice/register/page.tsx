'use client';

import { useForm } from 'react-hook-form';
import { PostNotice } from '@/app/types/Shop';
import { postShopNotice } from '@/app/api/api';
import useAuthStore from '@/app/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NoticeRegisterPage() {
  const { token, user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostNotice>({ defaultValues: { description: '' } });

  const handleSubmitForm = async (data: PostNotice) => {
    if (!shopId || !token) return;

    const date = new Date(data.startsAt);
    data.startsAt = date.toISOString();

    await postShopNotice(token, shopId, data);
    alert('공고가 등록되었습니다.');
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      router.push('/owner/my-shop');
    }
  }, [isSubmitted, router]);

  if (!shopId || !token) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  if (errors.hourlyPay) {
    alert(errors.hourlyPay.message);
  }

  return (
    <>
      <div className="container">
        <h3 className="h3">공고 등록</h3>
        <form className="mt-8" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="flex flex-col gap-4">
            <label htmlFor="hourlyPay">시급*</label>
            <input
              id="hourlyPay"
              type="text"
              placeholder="시급을 입력해주세요."
              {...register('hourlyPay', { required: '시급을 입력해주세요.' })}
            />
            <label htmlFor="startsAt">시작일*</label>
            <input
              id="startsAt"
              type="datetime-local"
              placeholder="시작일"
              {...register('startsAt', { required: '시작일을 입력해주세요.' })}
            />
            <label htmlFor="workhour">업무 시간*</label>
            <input
              id="workhour"
              type="text"
              placeholder="업무 시간을 입력해주세요."
              {...register('workhour')}
            />
            <label htmlFor="description">공고 설명</label>
            <textarea
              id="description"
              placeholder="공고 설명을 입력해주세요."
              {...register('description')}
            />
            <button type="submit">등록하기</button>
          </div>
        </form>
      </div>
    </>
  );
}
