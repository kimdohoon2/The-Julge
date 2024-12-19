import Image from 'next/image';
import Button from '@/app/components/common/Button';
import { Shop } from '@/app/types/Auth';

export default function MyShop({ shop }: { shop: Shop }) {
  return (
    <>
      <div className="flex h-[22.25rem] w-full items-center gap-8 rounded-xl bg-red-10 p-6">
        <div className="relative h-[100%] w-[58%] overflow-hidden rounded-xl">
          <Image
            fill
            src={shop.imageUrl}
            alt="매장 이미지"
            sizes="(max-width: 640px) 540px 308px"
            unoptimized={true}
            className="object-cover"
          />
        </div>
        <div className="flex h-[100%] flex-col justify-between pt-4">
          <div>
            <span className="pb-2 text-lg font-semibold text-orange">{shop.category}</span>
            <h4 className="text-[28px] font-semibold text-black">{shop.name}</h4>
            <div className="flex items-center gap-1 py-3">
              <div className="relative h-5 w-4">
                <Image
                  fill
                  src="/my-shop/location.svg"
                  alt="위치"
                  sizes="(max-width: 640px) 16px 20px"
                />
              </div>
              <span className="text-gray-50">{shop.address1}</span>
            </div>
            <p className="max-h-[380px] w-[100%] text-black">{shop.description}</p>
          </div>
          <div className="flex gap-2">
            <Button className="h-12 w-[10.5rem]" variant="reverse">
              편집하기
            </Button>
            <Button className="h-12 w-[10.5rem]" variant="primary">
              공고 등록하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
