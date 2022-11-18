import { InitializeSession, SessionStore, UpdateSessionTokens, UpdateSessionUser } from "@shared/interface";
import create from "zustand";

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  isLoading: true,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  startInitialization: () => set((state) => ({ ...state, isLoading: true })),
  initializeSession: (data: InitializeSession) => set((state) => ({ ...state, ...data, isAuthenticated: true, isLoading: false })),
  reauthenticateSession: () =>
    set((state) => ({ ...state, accessToken: null, refreshToken: null, isAuthenticated: false, user: null, isLoading: false })),
  updateSessionTokens: (data: UpdateSessionTokens) => set((state) => ({ ...state, ...data })),
  updateSessionUser: (data: UpdateSessionUser) => set((state) => ({ ...state, ...data })),
}));
