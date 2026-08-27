import { create } from "zustand"
import { persist } from 'zustand/middleware';
import type { IAuth } from "../model";

export const useAuth = create<IAuth>()(
    persist(
        (set) => ({
            userName: null,
            isLoggedIn: false,
            login: (userName) => set({
                userName: userName,
                isLoggedIn: true
            }),
            logout: () => set({
                userName: null,
                isLoggedIn: false
            })
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                userName: state.userName,
                isLoggedIn: state.isLoggedIn
            })
        }
    )
);