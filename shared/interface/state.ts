export interface LoginFormState {
  emailAddress: string;
  password: string;
}

export interface AuthenticationQueryState {
  user: any;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RegistrationFormState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}
