'use client';

import { useForm } from 'react-hook-form';
import { postShopNotice } from '@/app/api/api';
import useAuthStore from '@/app/stores/authStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { PostNotice } from '@/app/types/Shop';

interface NoticeRegisterForm {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

export default function NoticeRegisterPage() {
  const { token, user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const router = useRouter();
  const [hourlyPay, setHourlyPay] = useState<string>('');
  const [workhour, setWorkhour] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoticeRegisterForm>({ defaultValues: { description: '' } });

  const formatHourlyPay = (value: string) => {
    setHourlyPay(value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  const formatWorkhour = (value: string) => {
    setWorkhour(value.replace(/\D/g, ''));
  };

  const handleSubmitForm = async (form: NoticeRegisterForm) => {
    if (!shopId || !token) return;

    const date = new Date(form.startsAt);
    form.startsAt = date.toISOString();

    form.hourlyPay = form.hourlyPay.replace(/\D/g, '');

    const data: PostNotice = {
      hourlyPay: parseInt(form.hourlyPay),
      startsAt: form.startsAt,
      workhour: parseInt(form.workhour),
      description: form.description,
    };

    await postShopNotice(token, shopId, data);
    alert('공고가 등록되었습니다.');
    router.push('/owner/my-shop');
  };

  if (!shopId || !token) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  return (
    <>
      <div className="container h-[calc(100vh-8rem-6.8rem)]">
        <div className="flex items-center justify-between">
          <h3 className="h3">공고 등록</h3>
          <div className="relative h-4 w-4">
            <Image fill src="/my-shop/x.svg" alt="notice" sizes="(max-width: 640px) 16px" />
          </div>
        </div>
        <form className="mt-8" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <label htmlFor="hourlyPay">시급*</label>
              <input
                className="input"
                value={hourlyPay}
                onInput={(e) => formatHourlyPay(e.currentTarget.value)}
                id="hourlyPay"
                type="text"
                placeholder="0"
                {...register('hourlyPay', {
                  required: '시급을 입력해주세요.',
                })}
              />
              <span className="absolute right-4 top-[3rem] text-black">원</span>
              {errors.hourlyPay && <span className="errorMessage">{errors.hourlyPay.message}</span>}
            </div>
            <div>
              <label htmlFor="startsAt">시작일*</label>
              <input
                className="input"
                id="startsAt"
                type="datetime-local"
                placeholder="시작일"
                {...register('startsAt', { required: '시작일을 입력해주세요.' })}
              />
              {errors.startsAt && <span className="errorMessage">{errors.startsAt.message}</span>}
            </div>
            <div className="relative">
              <label htmlFor="workhour">업무 시간*</label>
              <input
                className="input"
                value={workhour}
                onInput={(e) => formatWorkhour(e.currentTarget.value)}
                id="workhour"
                type="text"
                placeholder="0"
                {...register('workhour', {
                  required: '업무 시간을 입력해주세요.',
                })}
              />
              <span className="absolute right-4 top-[3rem]">시간</span>
              {errors.workhour && <span className="errorMessage">{errors.workhour.message}</span>}
            </div>
            <div className="col-span-3">
              <label htmlFor="description">공고 설명</label>
              <textarea
                className="input textarea resize-none"
                id="description"
                placeholder="공고 설명을 입력해주세요."
                {...register('description')}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="buttonVer1 w-full md:w-[21rem]" type="submit">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
