'use client';
import Link from 'next/link';
import Image from 'next/image';
import DropDownBtn from '../common/drop-down';
import Button from '../common/Button';
import { useState } from 'react';
import { shopFromCategories, seoulLocation } from '@/app/constants/shop-form-constants';

interface ShopFormData {
  shopName: string;
  selectedCategory: string;
  addressCategory: string;
  moreAddress: string;
  wage: string;
  image?: File | null;
  description: string;
}

export default function ShopCommonForm({
  mode = 'create',
  initialData,
  onSubmit,
}: {
  mode?: 'create' | 'edit';
  initialData?: {
    shopName?: string;
    selectedCategory?: string;
    addressCategory?: string;
    moreAddress?: string;
    wage?: string;
    description?: string;
    previewUrl?: string;
  };
  onSubmit: (formData: ShopFormData) => void;
}) {
  const [file, setFile] = useState<File | null>(null); // 파일 상태
  const [shopName, setShopName] = useState(initialData?.shopName || '');
  const [selectedCategory, setSelectedCategory] = useState(initialData?.selectedCategory || '');
  const [addressCategory, setAddressCategory] = useState(initialData?.addressCategory || '');
  const [moreAddress, setMoreAddress] = useState(initialData?.moreAddress || '');
  const [wage, setWage] = useState(initialData?.wage || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [previewUrl, setPreviewUrl] = useState(initialData?.previewUrl || null);
  const isFormValid =
    shopName.trim() !== '' &&
    selectedCategory.trim() !== '' &&
    addressCategory.trim() !== '' &&
    wage.trim() !== '';

  const renderDropDown = (
    id: string,
    categories: string[],
    selected: string,
    onSelect: (value: string) => void
  ) => (
    <DropDownBtn
      id={id}
      categories={categories}
      selectedCategory={selected}
      onSelectCategory={onSelect}
    />
  );

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
    const input = e.target.value.replace(/,/g, '');
    if (input === '' || /^\d*$/.test(input)) {
      setWage(input ? Number(input).toLocaleString() : '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('모든 필드를 올바르게 입력해 주세요!');
      return;
    }
    const formData = {
      shopName,
      selectedCategory,
      addressCategory,
      moreAddress,
      wage,
      image: file,
      description,
    };
    // Alert로 제출된 데이터 확인
    alert(`Form Data: ${JSON.stringify(formData, null, 2)}`);
    onSubmit(formData);
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
      <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 md:w-full md:flex-row md:gap-5">
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="ShopName">
              가게이름*
            </label>
            <input
              className="rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
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
            {renderDropDown('Category', shopFromCategories, selectedCategory, handleCategorySelect)}
          </div>
        </div>
        <div className="flex flex-col gap-6 md:w-full md:flex-row md:gap-5">
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="Address">
              주소*
            </label>
            {renderDropDown('Address', seoulLocation, addressCategory, handleAddressCategorySelect)}
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="text-base font-normal text-gray-black" htmlFor="MoreAddress">
              상세 주소*
            </label>
            <input
              className="rounded-md border border-gray-30 py-4 pl-5 text-base font-normal text-gray-black"
              value={moreAddress}
              onChange={(e) => setMoreAddress(e.target.value)}
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
            {previewUrl && (
              <div
                className="h-auto w-full max-w-3.5 cursor-pointer md:max-w-4"
                onClick={handleRemoveImage}
              >
                <Image
                  className="object-contain"
                  src="/shop-icons/close-icon.png"
                  alt="닫기아이콘"
                  width={18}
                  height={18}
                />
              </div>
            )}
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
              <span>{mode === 'create' ? '이미지 추가하기' : '이미지 변경하기'}</span>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="Description"
            name="Description"
            placeholder="입력"
          />
        </div>
        <Button
          className="h-12 w-full !text-base md:mx-auto md:max-w-[19.5rem]"
          type="submit"
          variant={isFormValid ? 'primary' : 'reverse'}
          disabled={!isFormValid}
        >
          {mode === 'create' ? '등록하기' : '완료하기'}
        </Button>
      </form>
    </section>
  );
}
