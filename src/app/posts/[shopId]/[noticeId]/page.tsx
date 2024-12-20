'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface ShopItem {
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface NoticeDetail {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: ShopItem;
  };
}

export default function NoticeDetailPage() {
  const [notice, setNotice] = useState<NoticeDetail | null>(null);

  const params = useParams();
  const shopId = params.shopId as string;
  const noticeId = params.noticeId as string;

  useEffect(() => {
    if (shopId && noticeId) {
      const fetchNoticeDetail = async () => {
        try {
          const response = await axios.get(
            `https://bootcamp-api.codeit.kr/api/11-2/the-julge/shops/${shopId}/notices/${noticeId}`
          );
          setNotice(response.data.item);
        } catch (error) {
          console.error('Error fetching notice details:', error);
        }
      };

      fetchNoticeDetail();
    }
  }, [shopId, noticeId]);

  if (!notice) return <div>Loading...</div>;

  return (
    <div>
      <header>임시헤더입니다~~~~~~</header>
      {/* 대충 요소 나열 */}
      <div className="relative mt-6 h-60 w-full max-w-sm">
        {/* 대충 임시 간격 */}
        <Image
          src={notice.shop.item.imageUrl}
          alt={notice.shop.item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </div>
      <h1>{notice.shop.item.name}</h1>
      <p>시급: {notice.hourlyPay.toLocaleString()}원</p>
      <p>위치: {notice.shop.item.address1}</p>
      <p>근무 시간: {notice.workhour}시간</p>
      <p>시작 날짜: {notice.startsAt.split('T')[0]}</p>
      <p>{notice.description}</p>
    </div>
  );
}
