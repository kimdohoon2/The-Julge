import DetailedFilter from '../components/DetailedFilter';
import PostDropdown from '../components/PostDropdown';

const container = 'px-4 pb-4 pt-10 sm:px-6 sm:pb-4 lg:px-44 lg:pb-44';

export default function Posts() {
  return (
    <div>
      {/* 검색으로 변하는 페이지는 나중에 고려할게요 */}
      <header>임시헤더입니다~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</header>
      <div className="mt-6 bg-red-10">
        <div className={`sm:pt-14 ${container}`}>
          <h2 className="text-xl font-bold text-gray-black sm:text-[28px]">맞춤 공고</h2>
        </div>
      </div>
      <div className={`mb-5 ${container} sm:flex sm:items-center sm:justify-between`}>
        <h2 className="text-xl font-bold text-gray-black sm:text-[28px]">전체 공고</h2>
        <div className="mt-4 flex items-center gap-3">
          <PostDropdown />
          <DetailedFilter />
        </div>
      </div>
      <footer className="h-[100px] bg-gray-10 text-center">
        임시푸터입니다~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      </footer>
    </div>
  );
}
