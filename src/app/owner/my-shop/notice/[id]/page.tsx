'use client';

import useAuthStore from '@/app/stores/authStore';
import { getNoticeDetail, getNoticeApplications } from '@/app/api/api';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeApplication, NoticeDetail } from '@/app/types/Shop';
import MyNotice from '@/app/components/my-shop/detail/MyNotice';
import Pagination from 'react-js-pagination';
import Image from 'next/image';
import StatusIcon from '@/app/components/my-shop/detail/StatusIcon';

const LIMIT = 5;

interface NoticeApplicationItem {
  count: number;
  hasNext: boolean;
  items: NoticeApplication[];
  limit: number;
  links: [];
  offset: number;
}

export default function NoticePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [content, setContent] = useState<NoticeDetail | null>(null);
  const [applications, setApplications] = useState<NoticeApplicationItem | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchNoticeDetail = useCallback(async () => {
    const response = await getNoticeDetail(shopId as string, id);
    setContent(response.item);
  }, [shopId, id]);

  const fetchNoticeApplications = useCallback(async () => {
    const response = await getNoticeApplications(shopId as string, id, page, LIMIT);
    setApplications(response);
    console.log(response);
  }, [shopId, id, page]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // 리스폰스로 오는 hasNext가 다 true 라서 일단 count/limit <= pageNumber로 계산
  const handlePageIcon = (pageNumber: number, arrow: 'left' | 'right') => {
    const isDisabledLeft = pageNumber === 1;
    const isDisabledRight = applications?.count && applications.count / LIMIT <= pageNumber;

    const iconSrc =
      arrow === 'left'
        ? isDisabledLeft
          ? '/my-shop/chevron-left-disabled.svg'
          : '/my-shop/chevron-left.svg'
        : isDisabledRight
          ? '/my-shop/chevron-right-disabled.svg'
          : '/my-shop/chevron-right.svg';

    return (
      <div className="relative h-5 w-5">
        <Image fill src={iconSrc} alt="왼쪽" sizes="(max-width: 640px) 20px" />
      </div>
    );
  };

  useEffect(() => {
    fetchNoticeDetail();
    fetchNoticeApplications();
  }, [fetchNoticeDetail, fetchNoticeApplications]);

  if (!content) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <div className="container">
        <section className="mt-10 sm:mt-16">
          <span className="label">{content.shop.item.category}</span>
          <h3 className="h3">{content.shop.item.name}</h3>
          <MyNotice notice={content} />
        </section>
        <section className="sm:my-30 my-20">
          <h3 className="h3">신청자 목록</h3>
          {applications && (
            <div className="mt-8 w-full rounded-lg border">
              <table className="w-full text-left">
                <thead className="bg-red-10">
                  <tr>
                    <th className="th w-[24%] pl-3">신청자</th>
                    <th className="th w-[31%]">소개</th>
                    <th className="th W-[21%]">전화번호</th>
                    <th className="th w-[24%]">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.items.map((application) => (
                    <tr key={application.item.id} className="border-b py-5">
                      <td className="td pl-3">{application.item.user.item.name || '비공개'}</td>
                      <td className="td">{application.item.user.item.bio || '잘 부탁드립니다.'}</td>
                      <td className="td">{application.item.user.item.phone || '010-****-****'}</td>
                      <td className="td pr-7">
                        <StatusIcon status={application.item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                activePage={page}
                itemsCountPerPage={LIMIT}
                totalItemsCount={applications.count}
                onChange={handlePageChange}
                pageRangeDisplayed={7}
                prevPageText={handlePageIcon(page, 'left')}
                nextPageText={handlePageIcon(page, 'right')}
                firstPageText={''}
                lastPageText={''}
                innerClass="flex justify-center my-5 gap-1"
                itemClass="w-10 h-10 flex items-center justify-center font-normal text-sm"
                activeClass="bg-red-30 rounded-lg text-white"
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
