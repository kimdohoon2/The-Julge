'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { editShop, getShopDetails } from '@/app/api/register-api';
import ShopCommonForm from '@/app/components/shop/shop-form';
import Modal from '@/app/components/modal/modal';

interface ShopFormData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: number;
  imageUrl?: string;
  description: string;
}

export default function ShopEditClient() {
  const router = useRouter();
  const { shopId } = useParams<{ shopId: string }>(); // URL에서 shopId를 가져옴
  const [isLoading, setIsLoading] = useState(true);
  const [shopDetails, setShopDetails] = useState<ShopFormData | null>(null); // 초기값을 null로 설정
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [redirectPath, setRedirectPath] = useState('');

  useEffect(() => {
    console.log('Extracted Shop ID:', shopId); // shopId 로그 추가
    if (!shopId) {
      alert('잘못된 경로입니다. 가게 ID를 확인해 주세요.');
      return;
    }

    setIsLoading(true);
    getShopDetails(shopId)
      .then((data) => {
        setShopDetails(data.item); // API에서 받아온 데이터의 item 속성을 사용
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error('가게 정보를 불러오는 데 실패했습니다.', error.message);
          alert(`가게 정보를 불러오는 데 실패했습니다: ${error.message}`);
        } else {
          console.error('알 수 없는 오류', error);
          alert('가게 정보를 불러오는 데 실패했습니다.');
        }
        setIsLoading(false);
      });
  }, [shopId]);

  const handleEditSubmit = async (formData: ShopFormData) => {
    if (!shopId || typeof shopId !== 'string') {
      alert('가게 ID가 유효하지 않습니다.');
      return;
    }

    try {
      const result = await editShop(shopId, formData);
      console.log('수정이 완료되었습니다.', result);
      setModalMessage('수정이 완료되었습니다!');
      setRedirectPath(`/owner/my-shop`); // 상세 페이지로 리다이렉트
      setModalOpen(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('수정 실패 되었습니다.', error);
        alert(error.message || '수정 실패 되었습니다.');
      } else {
        console.error('알 수 없는 오류', error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };
  const handleConfirm = () => {
    setModalOpen(false);
    if (redirectPath) {
      router.push(redirectPath);
    }
  };
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!shopDetails) {
    return <div>가게 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <>
      <ShopCommonForm mode="edit" onSubmit={handleEditSubmit} initialData={shopDetails} />
      <Modal isOpen={modalOpen} onClose={handleConfirm}>
        {modalMessage}
      </Modal>
    </>
  );
}
