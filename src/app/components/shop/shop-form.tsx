'use client';
import Link from 'next/link';
import Image from 'next/image';
import DropDownBtn from '../common/drop-down';
import Button from '../common/Button';
import { useState } from 'react';

export default function ShopCommonForm() {
  const shopFromCategories = ['한식', '중식', '일식', '양식', '분식', '카페', '편의점', '기타'];
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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [addressCategory, setAddressCategory] = useState<string>('');
  const [file, setFile] = useState<File | null>(null); // 파일 상태
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL 상태
  const [wage, setWage] = useState('');

  const handleCategorySelect = (shopFromCategories: string) => {
    setSelectedCategory(shopFromCategories);
  };
  const handleAddressCategorySelect = (addressCategory: string) => {
    setAddressCategory(addressCategory);
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // 파일 URL을 생성하여 미리보기
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  // 이미지 삭제 처리
  const handleRemoveImage = () => {
    setFile(null); // 파일 상태 초기화
    setPreviewUrl(null); // 미리보기 상태 초기화
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/,/g, ''); // 콤마 제거
    if (!isNaN(Number(input))) {
      const formattedWage = Number(input).toLocaleString(); // 숫자 형식 변환
      setWage(formattedWage);
    }
  };
  return (
    <section className="md:pb-15 w-full bg-gray-5 px-3 pb-20 pt-36 md:px-8 md:pt-32 xl:px-60">
      <div className="mb-6 flex w-full items-center justify-between">
        <h3 className="md:text-custom-xl flex-1 text-lg font-bold">가게 정보</h3>
        <div className="h-auto w-full max-w-3.5 md:max-w-4">
          <Link href="/shop">
            <Image
              className="object-contain"
              src="/shop-icons/close-icon.png"
              alt="닫기아이콘"
              width={18}
              height={18}
            />
          </Link>
        </div>
      </div>
      <form className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-6 md:w-full md:flex-row md:gap-5">
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="ShopName">
              가게이름*
            </label>
            <input
              className="rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black"
              type="text"
              id="ShopName"
              name="ShopName"
              placeholder="입력"
            />
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="Category">
              분류*
            </label>
            <DropDownBtn
              id={'Category'}
              categories={shopFromCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        </div>
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
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="MoreAddress">
              상세 주소*
            </label>
            <input
              className="rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black"
              type="text"
              id="MoreAddress"
              name="MoreAddress"
              placeholder="입력"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:w-[49%]">
          <label className="text-base font-normal text-gray-black" htmlFor="Wage">
            기본 시급*
          </label>
          <div className="relative w-full">
            <input
              className="w-full rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black"
              type="text"
              value={wage}
              onChange={handleWageChange}
              id="Wage"
              name="Wage"
              placeholder="입력"
            />
            <span className="absolute right-5 top-1/2 z-10 -translate-y-1/2">원</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:max-w-[30.1875rem]">
          <div className="flex w-full items-center justify-between">
            <label className="text-base font-normal text-gray-black" htmlFor="Image">
              가게 이미지
            </label>
            <div className="h-auto w-full max-w-3.5 md:max-w-4" onClick={handleRemoveImage}>
              <Image
                className="object-contain"
                src="/shop-icons/close-icon.png"
                alt="닫기아이콘"
                width={18}
                height={18}
              />
            </div>
          </div>
          <div className="relative h-52 w-full rounded-md border border-gray-30 md:h-72">
            {/* 숨겨진 파일 입력 */}
            <input
              className="hidden"
              type="file"
              name="Image"
              id="Image"
              onChange={handleFileChange} // 파일 선택 시 처리
              accept="image/*" // 이미지 파일만 허용
            />

            {/* 커스텀 버튼 (이미지 추가하기) */}
            <label
              htmlFor="Image"
              className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3"
            >
              <div className="h-auto w-full max-w-8">
                <Image
                  className="object-contain"
                  src="/shop-icons/camera.png"
                  alt="카메라 아이콘"
                  width={33}
                  height={27}
                />
              </div>
              <span>이미지 추가하기</span>
            </label>

            {/* 선택된 이미지 미리보기 */}
            {previewUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="미리보기 이미지"
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base font-normal text-gray-black" htmlFor="Description">
            가게 설명
          </label>
          <textarea
            className="h-32 w-full rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black md:h-40"
            id="Description"
            name="Description"
            placeholder="입력"
          />
        </div>
        <Button
          className="h-12 w-full !text-base md:mx-auto md:max-w-[19.5rem]"
          onClick={() => alert('등록이 완료되었습니다!')}
          disabled
        >
          등록하기
        </Button>
      </form>
    </section>
  );
}
