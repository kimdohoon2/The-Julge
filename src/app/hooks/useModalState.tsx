import { useState } from 'react';

// 모달 상태 관리
function useModalState() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 모달 열기/닫기
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return { isModalOpen, toggleModal };
}

export default useModalState;
