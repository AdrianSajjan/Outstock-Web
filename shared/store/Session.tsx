import { InitializeSession, SessionStore, UpdateSessionTokens, UpdateSessionUser } from "@shared/interface";
import create from "zustand";

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  initializeSession: (data: InitializeSession) => set((state) => ({ ...state, ...data, isAuthenticated: true })),
  deleteSession: () => set((state) => ({ ...state, accessToken: null, refreshToken: null, isAuthenticated: false, user: null })),
  updateSessionTokens: (data: UpdateSessionTokens) => set((state) => ({ ...state, ...data })),
  updateSessionUser: (data: UpdateSessionUser) => set((state) => ({ ...state, ...data })),
}));
