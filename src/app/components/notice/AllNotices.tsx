'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../common/Card';
import formatTimeRange from '@/app/utils/formatTimeRange';

interface ShopItem {
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface NoticeItem {
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

export default function AllNotices() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          'https://bootcamp-api.codeit.kr/api/11-2/the-julge/notices?offset=0&limit=10'
        );
        const formattedData = response.data.items.map((data: { item: NoticeItem }) => data.item);
        setNotices(formattedData);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {notices.map((notice) => {
        const increaseRate = (
          ((notice.hourlyPay - notice.shop.item.originalHourlyPay) /
            notice.shop.item.originalHourlyPay) *
          100
        ).toFixed(0);

        return (
          <div key={notice.id} className="w-44 sm:w-[312px]">
            <Card
              image={notice.shop.item.imageUrl}
              title={notice.shop.item.name}
              date={notice.startsAt.split('T')[0]}
              hours={formatTimeRange(notice.startsAt, notice.workhour)}
              location={notice.shop.item.address1}
              price={`${notice.hourlyPay.toLocaleString()}원`}
              discount={`기존 시급보다 ${increaseRate}%`}
            />
          </div>
        );
      })}
    </div>
  );
}
