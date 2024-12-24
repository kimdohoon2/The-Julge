'use client';

import NoticeRegisterForm from '@/app/components/my-shop/register/NoticeRegisterForm';
import useAuthStore from '@/app/stores/authStore';
import { putShopNotice } from '@/app/api/api';
import { useParams } from 'next/navigation';

export default function NoticeRegisterEditPage() {
  const { token, user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const { id } = useParams<{ id: string }>();

  if (!shopId || !token) {
    return <div className="my-10 text-center">로그인이 필요합니다.</div>;
  }

  return (
    <>
      <NoticeRegisterForm
        mode="edit"
        token={token}
        shopId={shopId}
        noticeId={id as string}
        editApi={(token, shopId, noticeId, data) => putShopNotice(token, shopId, noticeId, data)}
      />
    </>
  );
}
