import Link from 'next/link';

export default function MyShopPage() {
  return (
    <section className="h-[90vh] w-full px-3 pt-36 md:h-screen md:px-8 md:pt-32 xl:px-60">
      <h3 className="mb-4 text-lg font-bold md:mb-6 md:text-[1.75rem]">내 가게</h3>
      <div className="w-full rounded-lg border border-gray-20">
        <div className="flex flex-col items-center gap-4 px-6 py-16 md:gap-6">
          <p className="text-sm font-normal text-gray-black md:text-base">
            내 가게를 소개하고 공고도 등록해 보세요.
          </p>
          <Link
            className="flex h-[2.3125rem] w-full max-w-[6.75rem] items-center justify-center rounded-md bg-orange md:h-[2.9375rem] md:max-w-[21.625rem]"
            href="my-shop/register"
          >
            <span className="text-sm text-gray-white md:text-base">가게 등록하기</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
