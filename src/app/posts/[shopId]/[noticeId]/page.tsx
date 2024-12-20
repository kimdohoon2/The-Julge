'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import getDiscountClass from '@/app/utils/getDiscountClass';

interface ShopItem {
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
  category: string;
  description: string;
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

  const increaseRate = (
    ((notice.hourlyPay - notice.shop.item.originalHourlyPay) / notice.shop.item.originalHourlyPay) *
    100
  ).toFixed(0);

  return (
    <div>
      <header className="mb-6">임시헤더입니다~~~~~~</header>
      <div className="mb-4">
        <h2 className="mb-1 text-sm font-bold text-orange sm:text-base">
          {notice.shop.item.category}
        </h2>
        <h1 className="text-xl font-bold text-gray-black sm:text-[28px]">
          {notice.shop.item.name}
        </h1>
      </div>
      <div className="h-[480px] w-[350px] rounded-xl border border-gray-20 p-5 sm:h-[720px] sm:w-[680px] lg:flex lg:h-[356px] lg:w-[963px]">
        <div className="relative h-44 w-[311px] sm:h-[360px] sm:w-[632px] lg:h-[308px] lg:w-[540px]">
          <Image
            src={notice.shop.item.imageUrl}
            alt={notice.shop.item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-xl object-cover"
          />
        </div>
        <div>
          <h2 className="text-sm font-bold text-orange sm:text-base">시급</h2>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-black sm:text-[28px]">
              {notice.hourlyPay.toLocaleString()}원
            </p>
            <span className={`ml-2 text-sm font-bold ${getDiscountClass(increaseRate)}`}>
              ({increaseRate}% 증가)
            </span>
          </div>
          <div>
            <p>{notice.startsAt.split('T')[0]}</p>
            <p>{notice.workhour}시간</p>
          </div>
          <p>{notice.shop.item.address1}</p>
          <p>{notice.description}</p>
        </div>
      </div>

      <p>{notice.shop.item.description}</p>
    </div>
  );
}
