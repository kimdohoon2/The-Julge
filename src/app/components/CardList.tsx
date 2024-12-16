import Card from './Card';

const cardMockData = [
  // 임시 목 데이터
  {
    image: '/images/mock/ex1.png',
    title: '물방개맛집식당',
    date: '2025-02-31',
    hours: '15:00-18:00 (3시간)',
    location: '서울시 강남구',
    price: '15,000원',
    discount: '기존 시급보다 50%',
  },
  {
    image: '/images/mock/ex2.png',
    title: '맛집북카페',
    date: '2025-02-12',
    hours: '14:00-18:00 (4시간)',
    location: '서울시 성수구',
    price: '12,000원',
    discount: '기존 시급보다 30%',
  },
  {
    image: '/images/mock/ex3.png',
    title: '도토리식당',
    date: '2025-01-02',
    hours: '15:00-18:00 (3시간)',
    location: '서울시 강남구',
    price: '10,000원',
    discount: '기존 시급보다 10%',
  },
];

export default function CardList() {
  {
    /* 임시로 카드를 배치해봤습니다. 레이아웃은 api를 적용해서 카드 수가 많아지면 변경하도록 하겠습니다.
    현재는 구현해둔 카드가 3개밖에 없어서 슬라이드나 간격, 배치와 관련된 다른 속성을 지정하기엔 애매하네요.
    카드 자체의 레이아웃만 검토해주시면 될 것 같습니다! */
  }
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
