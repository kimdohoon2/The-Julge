// src/app/components/notice/AllNotices.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import formatTimeRange from '@/app/utils/formatTimeRange';
import { fetchNotices } from '@/app/api/noticeApi';

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

interface AllNoticesProps {
  currentPage: number;
  itemsPerPage: number;
  setTotalItems: (total: number) => void;
  sortOption: string;
  filterOptions: { locations: string[]; startDate: string; amount: string };
}

export default function AllNotices({
  currentPage,
  itemsPerPage,
  setTotalItems,
  sortOption,
  filterOptions,
}: AllNoticesProps) {
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const response = await fetchNotices(currentPage, itemsPerPage, sortOption, filterOptions);
        const formattedData = response.items.map((data) => data.item);
        setNotices(formattedData);
        setTotalItems(response.count);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    getNotices();
  }, [currentPage, itemsPerPage, setTotalItems, sortOption, filterOptions]);

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
