'use client';

import React, { useState } from 'react';

const DetailedFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const locationList = [
    '서울시 종로구',
    '서울시 중구',
    '서울시 용산구',
    '서울시 성동구',
    '서울시 광진구',
    '서울시 동대문구',
    '서울시 중랑구',
    '서울시 성북구',
    '서울시 강북구',
    '서울시 도봉구',
    '서울시 노원구',
    '서울시 은평구',
    '서울시 서대문구',
    '서울시 마포구',
    '서울시 양천구',
    '서울시 강서구',
    '서울시 구로구',
    '서울시 금천구',
    '서울시 영등포구',
    '서울시 동작구',
    '서울시 관악구',
    '서울시 서초구',
    '서울시 강남구',
    '서울시 송파구',
    '서울시 강동구',
  ];

  const resetFilters = () => {
    setSelectedLocations([]);
    setStartDate('');
    setAmount('');
  };

  const filterCount = selectedLocations.length + (startDate ? 1 : 0) + (amount ? 1 : 0);

  return (
    <div className="relative w-full p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[30px] min-w-20 items-center justify-center rounded-md bg-red-30 px-4 py-2 font-bold text-white"
      >
        상세 필터 {filterCount > 0 && `(${filterCount})`}
      </button>

      {isOpen && (
        <div className="mt-4 w-96 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between text-gray-black">
            <h2 className="text-xl font-bold">상세 필터</h2>
            <button onClick={() => setIsOpen(false)} className="text-2xl">
              ✕
            </button>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-base">위치</h3>
            <div className="custom-scrollbar grid max-h-48 grid-cols-2 gap-2 overflow-auto rounded-md border p-3">
              {locationList.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    if (selectedLocations.includes(location)) {
                      setSelectedLocations(selectedLocations.filter((item) => item !== location));
                    } else {
                      setSelectedLocations([...selectedLocations, location]);
                    }
                  }}
                  className={'rounded-md px-2 py-1 text-left text-sm text-gray-black'}
                >
                  {location}
                </button>
              ))}
            </div>

            {selectedLocations.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedLocations.map((location) => (
                  <span
                    key={location}
                    className="text-orange flex items-center rounded-full bg-red-10 px-2 py-1 text-sm font-bold"
                  >
                    {location}
                    <button
                      onClick={() =>
                        setSelectedLocations(selectedLocations.filter((item) => item !== location))
                      }
                      className="text-orange ml-2 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-bold">시작일</h3>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-md border px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring"
            />
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-bold">금액</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-md border px-2 py-1 text-sm text-gray-black focus:outline-none focus:ring"
                placeholder="입력"
              />
              <span className="text-sm">이상부터</span>
            </div>
          </div>

          <div className="text-orange flex justify-between text-base font-bold">
            <button
              onClick={resetFilters}
              className="border-orange w-[25%] rounded-md border px-4 py-2"
            >
              초기화
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-orange w-[72%] rounded-md px-4 py-2 text-white"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedFilter;
