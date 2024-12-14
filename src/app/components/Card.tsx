'use client';

import React from 'react';
import Image from 'next/image';

interface CardProps {
  image: string;
  title: string;
  date: string;
  hours: string;
  location: string;
  price: string;
  discount: string;
}

const Card: React.FC<CardProps> = ({ image, title, date, hours, location, price, discount }) => {
  return (
    <div className="min-w-44 max-w-[312px] rounded-xl border border-gray-20 bg-white p-4">
      <div className="relative h-20 w-full sm:h-40">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>

      <div className="mt-4">
        <h3 className="text-base font-bold text-gray-black sm:text-xl">{title}</h3>

        <div className="mt-2 flex flex-wrap text-xs text-gray-50 sm:text-sm">
          <p className="mr-2">{date}</p>
          <p>{hours}</p>
        </div>
        <p className="text-xs text-gray-50 sm:text-sm">{location}</p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-lg font-bold text-gray-black sm:text-2xl">{price}</span>
          <span className="text-xs text-red-40 sm:text-sm">{discount}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
