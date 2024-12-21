'use client';

import DetailNotice from '@/app/components/notice/detail/DetailNotice';

const container = 'mx-auto px-4 sm:px-8 lg:px-0 pb-4 max-w-[964px] pt-10 sm:pb-4 lg:pb-14';

export default function NoticeDetailPage() {
  return (
    <div>
      <header className="mb-6">임시헤더입니다~~~~~~</header>
      <div className="bg-gray-5">
        <div className={`${container}`}>
          <DetailNotice />
        </div>
      </div>
    </div>
  );
}
