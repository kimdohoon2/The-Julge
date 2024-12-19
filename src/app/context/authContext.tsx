'use client';

import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { instance } from '@/app/api/api';
import { Auth, User, AuthResponse, AuthContextType } from '@/app/types/Auth';

const AuthContext = createContext<AuthContextType>({
  user: null,
  userId: null,
  getMe: () => {},
  signup: () => Promise.resolve({} as AuthResponse),
  login: () => Promise.resolve({} as AuthResponse),
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // 내 정보
  const [userId, setUserId] = useState<string | null>(null); // 내 정보 조회 시 사용 할 userId

  // 내 정보 가져오기
  const getMe = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token || !userId) {
      return setUser(null);
    }

    const response = await instance.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(response.data.item);

    return response.data;
  }, [userId]);

  // 회원가입
  const signup = async (data: Auth): Promise<AuthResponse> => {
    const response = await instance.post('/users', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  };

  // 로그인
  const login = async (data: Auth): Promise<AuthResponse> => {
    const response = await instance.post('/token', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('token', response.data.item.token);
    setUserId(response.data.item.user.item.id);

    await getMe();

    return response.data;
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('token');

    setUser(null);
    setUserId(null);
  };

  // 컴포넌트가 마운트되면 내 정보 가져오기
  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <AuthContext.Provider value={{ user, userId, getMe, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  return context;
};

export { AuthProvider, useAuth };
