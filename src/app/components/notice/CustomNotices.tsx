'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { FreeMode, Autoplay } from 'swiper/modules';
import Card from '../common/Card';
import axios from 'axios';
import formatTimeRange from '../../utils/formatTimeRange';

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

interface ApiResponse {
  items: { item: NoticeItem }[];
}

export default function CustomNotices() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'https://bootcamp-api.codeit.kr/api/11-2/the-julge/notices?offset=0&limit=10'
        );
        const formattedData = response.data.items.map((data) => data.item);
        setNotices(formattedData);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <Swiper
      modules={[FreeMode, Autoplay]}
      spaceBetween={12}
      slidesPerView="auto"
      freeMode={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { spaceBetween: 14 },
      }}
    >
      {notices.map((notice) => {
        const increaseRate = (
          ((notice.hourlyPay - notice.shop.item.originalHourlyPay) /
            notice.shop.item.originalHourlyPay) *
          100
        ).toFixed(0);

        return (
          <SwiperSlide key={notice.id} className="max-w-[176px] sm:max-w-[312px]">
            <Card
              image={notice.shop.item.imageUrl}
              title={notice.shop.item.name}
              date={notice.startsAt.split('T')[0]}
              hours={formatTimeRange(notice.startsAt, notice.workhour)}
              location={notice.shop.item.address1}
              price={`${notice.hourlyPay.toLocaleString()}원`}
              discount={`기존 시급보다 ${increaseRate}%`}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
