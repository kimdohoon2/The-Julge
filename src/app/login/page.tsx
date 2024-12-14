'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Form 데이터 타입 정의
interface LoginFormInputs {
  email: string;
  password: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function LoginPage() {
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const router = useRouter(); // useRouter 선언

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur', // 포커스 아웃 시 유효성 검사 실행
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const { email, password } = data;

    // Mock API 응답 처리
    const loginSuccess = email === 'test@test.com' && password === 'password123';

    if (loginSuccess) {
      localStorage.setItem('accessToken', 'mockAccessToken123'); // 엑세스 토큰 저장
      alert('로그인 성공!');
      router.push('/posts'); // 공고 리스트 페이지로 이동
    } else {
      setShowModal(true); // 비밀번호 불일치 시 모달 표시
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-white font-sans">
      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-black bg-opacity-60">
          <div className="mx-6 w-full max-w-[540px] rounded-lg bg-gray-white p-6 shadow-lg sm:mx-6 md:mx-8 lg:mx-10">
            <h2 className="mb-24 mt-24 text-center text-lg" style={{ color: '#333236' }}>
              비밀번호가 일치하지 않습니다.
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)} // 모달 닫기
                className="w-28 rounded-md py-2 text-gray-white"
                style={{ backgroundColor: '#ea3c12' }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-gray-white p-4">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={248}
          height={45}
          className="mx-auto mb-10 cursor-pointer"
          onClick={() => router.push('/posts')}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-left font-sans text-base font-normal leading-[26px] text-gray-black"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: '이메일을 입력해 주세요.',
                pattern: {
                  value: emailRegex,
                  message: '이메일 형식으로 작성해 주세요.',
                },
              })}
              onBlur={() => trigger('email')}
              className={`w-full rounded-md border px-5 py-4 text-sm`}
              placeholder="입력"
            />
            {errors.email && <p className="mt-1 text-sm text-red-40">{errors.email?.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-left font-sans text-base font-normal leading-[26px] text-gray-black"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: '비밀번호를 입력해 주세요.',
                minLength: {
                  value: 8,
                  message: '8자 이상 작성해 주세요.',
                },
              })}
              onBlur={() => trigger('password')}
              className={`w-full rounded-md border px-5 py-4 text-sm`}
              placeholder="입력"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-40">{errors.password?.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-red-40 px-32 py-3 font-semibold text-gray-white"
          >
            로그인 하기
          </button>
        </form>

        <p className="mt-6 text-center font-sans" style={{ color: '#333236' }}>
          회원이 아니신가요?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="cursor-pointer underline"
            style={{ color: '#5534da' }}
          >
            회원가입하기
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
