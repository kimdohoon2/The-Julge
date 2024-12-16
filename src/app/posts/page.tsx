import Pagination from '../components/Pagination';

export default function Posts() {
  const totalItems = 132; // 제가 임시로 지정해둔 전체 아이템 수 입니다
  const itemsPerPage = 6; // 제가 임시로 지정해둔 한 번에 보여줄 아이템 수 입니다
  return (
    <div className="m-4">
      <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} />
    </div>
  );
}
