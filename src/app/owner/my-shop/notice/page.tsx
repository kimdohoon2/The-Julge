'use client';

import { useAuth } from '@/app/context/authContext';
import { useEffect } from 'react';

export default function NoticePage() {
  const { login, signup, user, userId, logout, getMe } = useAuth();

  const handleLogin = async () => {
    console.log(await login({ email: 'qwer1@asdf.com', password: 'asdfasdf1' }));
  };

  const handleSignup = async () => {
    console.log(
      await signup({
        email: 'qwer1@asdf.com',
        password: 'asdfasdf1',
        type: 'employer',
      })
    );
  };

  const handleLogout = async () => {
    logout();
    console.log(localStorage.getItem('token'));
  };

  const handleGetMe = async () => {
    await getMe();
  };

  const handleUser = () => {
    console.log(user);
  };

  const handleUserId = () => {
    console.log(userId);
  };

  const handleShopId = () => {
    console.log('');
  };

  useEffect(() => {
    console.log(user, userId);
  }, [user, userId]);

  return (
    <>
      <div className="flex flex-col">
        <button onClick={handleSignup}>회원가입</button>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={handleGetMe}>내 정보</button>
        <button onClick={handleUser}>user</button>
        <button onClick={handleUserId}>userId</button>
        <button onClick={handleShopId}>shopId</button>
      </div>
    </>
  );
}
