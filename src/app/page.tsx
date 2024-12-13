'use client';

import Button from './components/common/Button';

export default function Home() {
  return (
    <div className="bg-gray-black text-red-40">
      홈 예제
      <div className="m-4 flex max-w-[346px] flex-col items-center justify-center">
        <Button className="mb-2 w-full p-4" onClick={() => alert('신청버튼을 클릭하셨습니다.')}>
          신청하기
        </Button>
        <Button
          className="mb-2 w-full p-4"
          variant="reverse"
          onClick={() => alert('취소버튼을 클릭하셨습니다.')}
        >
          취소하기
        </Button>
        <Button className="mb-2 w-full p-4" disabled>
          신청불가
        </Button>
      </div>
    </div>
  );
}
