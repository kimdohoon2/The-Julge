import { create } from 'zustand';
import { instance } from '@/app/api/api';
import { Auth, AuthResponse, AuthStore } from '@/app/types/Auth';
import { persist } from 'zustand/middleware';

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      userId: null,
      type: null,

      getMe: async () => {
        const token = localStorage.getItem('token');
        const userId = get().userId;

        if (!token || !userId) {
          return set({ user: null });
        }

        const response = await instance.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        set({ user: response.data.item });
        set({ type: response.data.item.type });

        return response.data;
      },

      signup: async (data: Auth): Promise<AuthResponse> => {
        const response = await instance.post('/users', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return response.data;
      },

      login: async (data: Auth): Promise<AuthResponse> => {
        const response = await instance.post('/token', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        localStorage.setItem('token', response.data.item.token);
        set({ userId: response.data.item.user.item.id });

        await get().getMe();

        return response.data;
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null });
        set({ userId: null });
        set({ type: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
