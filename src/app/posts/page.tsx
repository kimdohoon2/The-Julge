import CardList from '../components/CardList';
import DetailedFilter from '../components/DetailedFilter';
import Pagination from '../components/Pagination';
import PostDropdown from '../components/PostDropdown';

const container = 'px-4 pb-4 pt-10 sm:px-6 sm:pb-4 lg:px-44 lg:pb-44';

export default function Posts() {
  const totalItems = 132; // 제가 임시로 지정해둔 전체 아이템 수 입니다
  const itemsPerPage = 6; // 제가 임시로 지정해둔 한 번에 보여줄 아이템 수 입니다
  return (
    <div>
      {/* 검색으로 변하는 페이지는 나중에 고려할게요
      맞춤은 지역으로 설정해야 하는데 이 부분은 사용자 프로필 등록 이후에 로직을 추가해보겠습니다. */}
      <header>임시헤더입니다~~~~~~</header>
      <div className="mt-6 bg-red-10">
        <div className={`sm:pt-14 ${container}`}>
          <h2 className="mb-5 text-xl font-bold text-gray-black sm:text-[28px]">맞춤 공고</h2>
          <CardList />
        </div>
      </div>
      <div className={`mb-5 ${container} sm:flex sm:items-center sm:justify-between`}>
        <h2 className="text-xl font-bold text-gray-black sm:text-[28px]">전체 공고</h2>
        <div className="mt-4 flex items-center gap-3">
          <PostDropdown />
          <DetailedFilter />
        </div>
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} className="mb-16" />
    </div>
  );
}
