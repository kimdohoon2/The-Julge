import Image from 'next/image';

export default function HigherAverageBadge({
  isHigherThanAverage,
  percentageDifference,
  bgColor,
  textColor,
}: {
  isHigherThanAverage: boolean;
  percentageDifference: number;
  bgColor: string;
  textColor: string;
}) {
  return (
    <>
      {isHigherThanAverage && (
        <div className={`flex items-center gap-1 rounded-full ${bgColor} sm:gap-2 sm:px-3 sm:py-2`}>
          <span className={`${textColor} text-xs sm:text-sm sm:text-white`}>
            기존 시급의 {percentageDifference.toFixed(0)}%
          </span>
          <div className="relative hidden h-5 w-4 sm:block">
            <Image
              fill
              src="/my-shop/arrow-up.svg"
              alt="상승"
              sizes="(max-width: 640px) 16px 20px"
            />
          </div>
          <div className="relative block h-5 w-4 sm:hidden">
            <Image
              fill
              src="/my-shop/m-arrow-up.svg"
              alt="상승"
              sizes="(max-width: 640px) 16px 20px"
            />
          </div>
        </div>
      )}
    </>
  );
}
