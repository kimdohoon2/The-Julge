'use client';

import useAuthStore from '@/app/stores/authStore';
import { getNoticeDetail } from '@/app/api/api';
import { useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function NoticePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const shopId = user?.shop?.item.id;

  const fetchNoticeDetail = useCallback(async () => {
    const response = await getNoticeDetail(shopId as string, id);
    console.log(response);
  }, [shopId, id]);

  useEffect(() => {
    fetchNoticeDetail();
  }, [fetchNoticeDetail]);

  return (
    <>
      <div>
        <h4></h4>
      </div>
    </>
  );
}
