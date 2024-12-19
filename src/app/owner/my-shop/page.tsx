'use client';

import AddPost from '@/app/components/my-shop/AddPost';
import useAuthStore from '@/app/stores/authStore';
import { instance } from '@/app/api/api';
import { useEffect, useCallback, useState } from 'react';
import { Shop } from '@/app/types/Auth';
import MyShop from '@/app/components/my-shop/myShop';

export default function MyShopPage() {
  const { user, type } = useAuthStore();
  const shopId = user?.shop?.item.id;
  const [shop, setShop] = useState<Shop | null>(null);

  const fetchShop = useCallback(async () => {
    const response = await instance.get(`/shops/${shopId}`);
    setShop(response.data.item);
  }, [shopId]);

  useEffect(() => {
    if (!shopId) return;

    fetchShop();
  }, [fetchShop, shopId]);

  return (
    <>
      <div className="container">
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
              <AddPost
                content="공고를 등록해 보세요."
                buttonLink="/owner/my-shop/notice/register"
                buttonText="공고 등록하기"
              />
            </section>
          </div>
        )}
        <div className="my-20 flex items-center justify-center">
          {type === 'employee' && <div>접근 권한이 없습니다.</div>}
          {!user && <div>로그인이 필요합니다.</div>}
        </div>
      </div>
    </>
  );
}
