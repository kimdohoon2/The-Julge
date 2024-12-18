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

interface AllNoticesProps {
  currentPage: number;
  itemsPerPage: number;
  setTotalItems: (total: number) => void; // 부모에게 totalItems 값을 전달하는 함수
}

export default function AllNotices({ currentPage, itemsPerPage, setTotalItems }: AllNoticesProps) {
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          `https://bootcamp-api.codeit.kr/api/11-2/the-julge/notices?offset=${
            (currentPage - 1) * itemsPerPage
          }&limit=${itemsPerPage}`
        );
        const formattedData = response.data.items.map((data: { item: NoticeItem }) => data.item);
        setNotices(formattedData);
        setTotalItems(response.data.count);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, [currentPage, itemsPerPage, setTotalItems]);

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
