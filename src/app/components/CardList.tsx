'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import Card from './Card';
import CardMockData from './cardMockData';

export default function CardList() {
  return (
    <Swiper modules={[FreeMode]} spaceBetween={24} slidesPerView={'auto'} freeMode={true}>
      {CardMockData.map((data, index) => (
        <SwiperSlide key={index} className="max-w-[200px] sm:max-w-[300px] lg:max-w-[330px]">
          <Card
            image={data.image}
            title={data.title}
            date={data.date}
            hours={data.hours}
            location={data.location}
            price={data.price}
            discount={data.discount}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
