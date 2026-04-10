import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      rol: null,

      setAuth: ({ token, user }) =>
        set({ token, user, rol: user?.rol ?? null }),

      clearAuth: () => set({ token: null, user: null, rol: null }),

      isAuthenticated: () => {
        const state = useAuthStore.getState();
        return !!state.token;
      },
    }),
    {
      name: 'auth',
      partialize: (state) => ({ token: state.token, user: state.user, rol: state.rol }),
    },
  ),
);
