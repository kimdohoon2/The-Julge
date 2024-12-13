'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// Form 데이터 타입 정의
interface LoginFormInputs {
  email: string;
  password: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function LoginPage() {
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
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* 로고 버튼 */}
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto mb-8 h-12 cursor-pointer"
          onClick={() => router.push('/posts')} // 공고 리스트 페이지로 이동
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 입력 */}
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            onBlur={() => trigger('email')} // 포커스 아웃 시 유효성 검사 실행
            className={`mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="이메일 입력"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>}

          {/* 비밀번호 입력 */}
          <label htmlFor="password" className="mt-4 block text-sm font-medium text-gray-700">
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
            onBlur={() => trigger('password')} // 포커스 아웃 시 유효성 검사 실행
            className={`mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
              errors.password ? 'border-red-500' : ''
            }`}
            placeholder="비밀번호 입력"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password?.message}</p>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-red-500 py-2 font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            로그인 하기
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          회원이 아니신가요?{' '}
          <span
            onClick={() => router.push('/signup')} // 회원가입 페이지로 이동
            className="cursor-pointer text-blue-500 hover:underline"
          >
            회원가입하기
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
