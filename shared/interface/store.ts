export interface InitializeSession {
  user: any;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateSessionTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UpdateSessionUser {
  user: any;
}

export interface SessionStore {
  user: any;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  initializeSession: (data: InitializeSession) => void;
  deleteSession: () => void;
  updateSessionTokens: (data: UpdateSessionTokens) => void;
  updateSessionUser: (data: UpdateSessionUser) => void;
}
