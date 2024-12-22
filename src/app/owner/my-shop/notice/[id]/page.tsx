'use client';

import useAuthStore from '@/app/stores/authStore';
import { getNoticeDetail } from '@/app/api/api';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeDetail } from '@/app/types/Shop';

export default function NoticePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [content, setContent] = useState<NoticeDetail | null>(null);

  const fetchNoticeDetail = useCallback(async () => {
    const response = await getNoticeDetail(shopId as string, id);
    setContent(response.item);
    console.log(response.item);
  }, [shopId, id]);

  useEffect(() => {
    fetchNoticeDetail();
  }, [fetchNoticeDetail]);

  return (
    <>
      <div className="container">
        <section className="mt-10 sm:mt-16">
          <h4>{content?.shop.item.name}</h4>
        </section>
        <section className="sm:my-30 my-20"></section>
      </div>
    </>
  );
}
