'use client';
import DropDownBtn from '../components/common/drop-down';
import { useState } from 'react';
export default function TestComponents() {
  const seoulLocation = [
    '서울시 종로구',
    '서울시 중구',
    '서울시 용산구',
    '서울시 성동구',
    '서울시 광진구',
    '서울시 동대문구',
    '서울시 중랑구',
    '서울시 성북구',
    '서울시 강북구',
    '서울시 도봉구',
    '서울시 노원구',
    '서울시 은평구',
    '서울시 서대문구',
    '서울시 마포구',
    '서울시 양천구',
    '서울시 강서구',
    '서울시 구로구',
    '서울시 금천구',
    '서울시 영등포구',
    '서울시 동작구',
    '서울시 관악구',
    '서울시 서초구',
    '서울시 강남구',
    '서울시 송파구',
    '서울시 강동구',
  ];
  const [addressCategory, setAddressCategory] = useState<string>('');
  const handleAddressCategorySelect = (addressCategory: string) => {
    setAddressCategory(addressCategory);
  };
  return (
    <div className="flex flex-col gap-6 md:w-full md:flex-row md:gap-5">
      <div className="flex flex-col gap-2 md:w-1/2">
        <label className="text-base font-normal text-gray-black" htmlFor="Address">
          주소*
        </label>
        <DropDownBtn
          id={'Address'}
          categories={seoulLocation}
          selectedCategory={addressCategory}
          onSelectCategory={handleAddressCategorySelect}
        />
      </div>
    </div>
  );
}
