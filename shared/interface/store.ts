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
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  startInitialization: () => void;
  initializeSession: (data: InitializeSession) => void;
  reauthenticateSession: () => void;
  updateSessionTokens: (data: UpdateSessionTokens) => void;
  updateSessionUser: (data: UpdateSessionUser) => void;
}
