'use client';

import AddPost from '@/app/components/my-shop/AddPost';
import useAuthStore from '@/app/stores/authStore';
import { getMyShop, getShopNotices, postShopNotice } from '@/app/api/api';
import { useEffect, useCallback, useState } from 'react';
import { Shop, Notice } from '@/app/types/Shop';
import MyShop from '@/app/components/my-shop/myShop';
import ShopNotice from '@/app/components/my-shop/shopNotice';

export default function MyShopPage() {
  const { user, type, token } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [shop, setShop] = useState<Shop | null>(null);
  const [notice, setNotice] = useState<Notice[] | null>(null);

  const fetchShop = useCallback(async () => {
    const response = await getMyShop(shopId as string);
    setShop(response.item);
  }, [shopId]);

  const fetchNotice = useCallback(async () => {
    const response = await getShopNotices(shopId as string);
    setNotice(response.items);
    console.log(response.items);
  }, [shopId]);

  const postNotice = async () => {
    await postShopNotice(token as string, shopId as string, {
      hourlyPay: 15000,
      startsAt: '2024-12-23T09:00:00.000Z',
      workhour: 8,
      description: '테스트 공고',
    });
  };

  useEffect(() => {
    if (!shopId) return;

    fetchShop();
    fetchNotice();
  }, [fetchShop, fetchNotice, shopId]);

  return (
    <div className="container">
      <button onClick={postNotice}>가게 등록</button>
      {type === 'employer' && (
        <div>
          <section className="mt-16">
            <h3 className="h3">내 가게</h3>
            {!shop && (
              <AddPost
                content="가게를 등록해 보세요."
                buttonLink="/owner/my-shop/register"
                buttonText="가게 등록하기"
              />
            )}
            {shop && <MyShop shop={shop} />}
          </section>
          <section className="my-32">
            <h3 className="h3">등록한 공고</h3>
            {!notice && (
              <AddPost
                content="공고를 등록해 보세요."
                buttonLink="/owner/my-shop/notice/register"
                buttonText="공고 등록하기"
              />
            )}
            {notice && shop && (
              <div className="grid grid-cols-3 gap-4">
                {notice.map((not) => (
                  <div key={not.item.id}>
                    <ShopNotice not={not} shop={shop} notice={notice} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
      <div className="my-20 flex items-center justify-center">
        {type === 'employee' && <div>접근 권한이 없습니다.</div>}
        {!user && <div>로그인이 필요합니다.</div>}
      </div>
    </div>
  );
}
