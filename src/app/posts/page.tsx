import CardList from '../components/CardList';
import DetailedFilter from '../components/DetailedFilter';
import PostDropdown from '../components/PostDropdown';

export default function Posts() {
  return (
    <div className="ml-4">
      <CardList />
      <div>
        <PostDropdown />
        <DetailedFilter />
      </div>
    </div>
  );
}
