'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { FreeMode, Autoplay } from 'swiper/modules';
import Card from './Card';
import CardMockData from './CardMockData';

export default function CardList() {
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
      {CardMockData.map((data, index) => (
        <SwiperSlide key={index} className="max-w-[176px] sm:max-w-[312px]">
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
