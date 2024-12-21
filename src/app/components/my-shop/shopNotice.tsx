import Image from 'next/image';
import { Notice, Shop } from '@/app/types/Shop';
import converDate from '@/app/utils/converDate';
import formatTimeRange from '@/app/utils/formatTimeRange';
import { hourPayComparisom } from '@/app/utils/hourPayComparison';

export default function ShopNotice({
  not,
  shop,
  notice,
}: {
  not: Notice;
  shop: Shop;
  notice: Notice[];
}) {
  const { isHigherThanAverage, percentageDifference } = hourPayComparisom(notice, not);

  return (
    <div key={not.item.id} className="h-[22rem] rounded-xl border p-4">
      <div className="flex h-[10rem] items-center justify-center rounded-xl bg-gray-20">
        리스폰스에 이미지 없음
      </div>
      <div className="mt-5 flex h-[42%] flex-col justify-between">
        <div>
          <h5 className="text-xl font-medium text-black">{not.item.description}</h5>
          <div className="my-2 flex items-center gap-2">
            <div className="relative h-5 w-5">
              <Image
                fill
                src="/my-shop/clock.svg"
                alt="시간"
                sizes="(max-width: 640px) 20px 20px"
              />
            </div>
            <span className="text-sm text-gray-50">{`${converDate(not.item.startsAt)} ${formatTimeRange(not.item.startsAt, not.item.workhour)}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5">
              <Image
                fill
                src="/my-shop/location.svg"
                alt="위치"
                sizes="(max-width: 640px) 16px 20px"
              />
            </div>
            <span className="text-sm text-gray-50">{shop?.address1}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-black">
            {`${not.item.hourlyPay.toLocaleString()}원`}
          </span>
          {isHigherThanAverage && (
            <div className="flex items-center gap-2 rounded-full bg-orange px-3 py-2 text-white">
              <span className="text-sm">기존 시급보다 {percentageDifference.toFixed(0)}%</span>
              <div className="relative h-5 w-4">
                <Image
                  fill
                  src="/my-shop/arrow-up.svg"
                  alt="상승"
                  sizes="(max-width: 640px) 16px 20px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
