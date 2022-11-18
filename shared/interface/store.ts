import { User } from "./entity";

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
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setupInitialization: (value: boolean) => void;
  initializeSession: (data: InitializeSession) => void;
  reauthenticateSession: () => void;
  updateSessionTokens: (data: UpdateSessionTokens) => void;
  updateSessionUser: (data: UpdateSessionUser) => void;
}
