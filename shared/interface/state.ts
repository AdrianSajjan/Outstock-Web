export interface LoginFormState {
  emailAddress: string;
  password: string;
}

export interface LoginQueryState {
  user: any;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}
