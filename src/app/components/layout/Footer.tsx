'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="flex h-32 bg-gray-10 text-gray-40 sm:h-[100px]">
      <div className="ml-5 mr-5 flex w-full justify-between gap-4 pt-7 text-sm sm:ml-8 sm:mr-8 sm:flex-row sm:items-center sm:gap-0 sm:p-0 lg:ml-56 lg:mr-56">
        <div className="flex w-7/12 flex-col gap-9 sm:flex-row sm:justify-between sm:gap-0">
          <div className="order-2 sm:order-1">
            <span>©codeit - 2023</span>
          </div>

          <div className="order-1 flex gap-[30px] sm:order-2">
            <a href="#" className="hover:text-gray-50">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-50">
              FAQ
            </a>
          </div>
        </div>

        <div className="order-3 flex gap-4">
          <a href="#">
            <Image
              src="/icons/email.svg"
              alt="Email"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </a>
          <a href="#">
            <Image
              src="/icons/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </a>
          <a href="#">
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
