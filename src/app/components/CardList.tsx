import Card from './Card';

const cardMockData = [
  {
    image: '/images/ex1.jpg',
    title: '물방개맛집식당',
    date: '2025-02-31',
    hours: '15:00-18:00 (3시간)',
    location: '서울시 강남구',
    price: '15,000원',
    discount: '기존 시급보다 50%',
  },
  {
    image: '/images/ex2.jpg',
    title: '맛집북카페',
    date: '2025-02-12',
    hours: '14:00-18:00 (4시간)',
    location: '서울시 성수구',
    price: '12,000원',
    discount: '기존 시급보다 20%',
  },
  {
    image: '/images/ex3.jpg',
    title: '도토리식당',
    date: '2025-01-02',
    hours: '15:00-18:00 (3시간)',
    location: '서울시 강남구',
    price: '10,000원',
    discount: '기존 시급보다 10%',
  },
];

export default function CardList() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {cardMockData.map((data, index) => (
        <Card
          key={index}
          image={data.image}
          title={data.title}
          date={data.date}
          hours={data.hours}
          location={data.location}
          price={data.price}
          discount={data.discount}
        />
      ))}
    </div>
  );
}
