import Link from 'next/link';

export default function MyShopPage() {
  return (
    <section className="w-full px-3 pt-[8.875rem] md:px-8 md:pt-[8.125rem] xl:px-[14.8125rem]">
      <h3 className="mb-4 text-lg font-bold md:mb-6 md:text-xl">내 가게</h3>
      <div className="w-full rounded-lg border border-gray-20">
        <div className="flex flex-col items-center gap-4 px-6 py-[3.75rem] md:gap-6">
          <p className="text-sm font-normal text-gray-black md:text-base">
            내 가게를 소개하고 공고도 등록해 보세요.
          </p>
          <Link
            className="bg-orange flex h-[2.3125rem] w-full max-w-[6.75rem] items-center justify-center rounded-md md:h-[2.9375rem] md:max-w-[21.625rem]"
            href='/register'
          >
            <span className="text-sm text-gray-white md:text-base">가게 등록하기</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
