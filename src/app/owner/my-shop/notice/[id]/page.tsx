'use client';

import useAuthStore from '@/app/stores/authStore';
import { getNoticeDetail, getNoticeApplications } from '@/app/api/api';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NoticeApplication, NoticeDetail } from '@/app/types/Shop';
import MyNotice from '@/app/components/my-shop/detail/MyNotice';

export default function NoticePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [content, setContent] = useState<NoticeDetail | null>(null);
  const [applications, setApplications] = useState<NoticeApplication[]>([]);

  const fetchNoticeDetail = useCallback(async () => {
    const response = await getNoticeDetail(shopId as string, id);
    setContent(response.item);
  }, [shopId, id]);

  const fetchNoticeApplications = useCallback(async () => {
    const response = await getNoticeApplications(shopId as string, id);
    setApplications(response.items);
    console.log(response.items);
  }, [shopId, id]);

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
          <table>
            <thead>
              <tr>
                <th>신청자</th>
                <th>소개</th>
                <th>전화번호</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.item.id}>
                  <td>{application.item.user.item.name || '비공개'}</td>
                  <td>{application.item.user.item.bio || '잘 부탁드립니다.'}</td>
                  <td>{application.item.user.item.phone || '010-****-****'}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
