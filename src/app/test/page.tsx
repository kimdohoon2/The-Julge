'use client';
import { registerShop } from '../api/register-api';
import ShopCommonForm from '../components/shop/shop-form';

export default function Test() {
  const handleCreateSubmit = async (formData: {
    name: string;
    category: string;
    address1: string;
    address2: string;
    originalHourlyPay: string;
    imageUrl?: string;
    description: string;
  }) => {
    console.log('폼 데이터 확인:', formData); // 디버깅용 로그
    try {
      const result = await registerShop(formData);
      console.log('가게 등록 성공:', result);
      alert('가게 등록이 완료되었습니다!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('가게 등록 실패:', error);
        alert(error.message || '오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return <ShopCommonForm mode="create" onSubmit={handleCreateSubmit} />;
}
