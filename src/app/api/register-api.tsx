import axios from 'axios';

// axios 인스턴스 생성
const API = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api/13-2/the-julge', // 엔드포인트 설정
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type 설정
  },
});

// 가게 등록 API
export const registerShop = async (shopData: {
  name: string;
  category: string;
  address1: string;
  address2: string;
  originalHourlyPay: string;
  imageUrl?: string;
  description: string;
}) => {
  try {
    const response = await API.post('/shops', shopData); // /shops 경로로 POST 요청
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('일반 오류:', error.message);
    } else {
      console.error('알 수 없는 오류:', error);
    }
    throw new Error('가게 등록에 실패했습니다.');
  }
};

// Presigned URL을 얻기 위한 API
export const presignedImg = async (fileName: string): Promise<{ presignedUrl: string }> => {
  try {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옴
    if (!token) {
      throw new Error('로그인 후 다시 시도해 주세요.');
    }

    // Presigned URL 생성 요청
    const response = await API.post(
      '/images',
      { name: fileName },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 Authorization 헤더에 추가
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('이미지 URL 생성 실패:', error);
    throw new Error('이미지 URL 생성에 실패했습니다.');
  }
};

// S3에 이미지 업로드
export const uploadToS3 = async (presignedUrl: string, file: File) => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type, // 파일 타입을 Content-Type 헤더로 설정
      },
    });
    return response.data.url; // 업로드된 이미지 URL 반환
  } catch (error) {
    console.error('S3 업로드 실패:', error);
    throw new Error('이미지 업로드 실패');
  }
};
