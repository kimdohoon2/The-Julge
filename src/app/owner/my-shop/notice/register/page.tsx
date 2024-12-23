'use client';

import { useForm } from 'react-hook-form';
import { PostNotice } from '@/app/types/Shop';
import { postShopNotice } from '@/app/api/api';
import useAuthStore from '@/app/stores/authStore';

export default function NoticeRegisterPage() {
  const { token, user } = useAuthStore();
  const shopId = user?.shop?.item.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostNotice>({ defaultValues: { description: '' } });

  const handleSubmitForm = async (data: PostNotice) => {
    if (!shopId || !token) return;

    const response = await postShopNotice(token, shopId, data);
    console.log(response);
  };

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
        <form className="mt-8">
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
            <button type="submit" onSubmit={handleSubmit(handleSubmitForm)}>
              등록하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
