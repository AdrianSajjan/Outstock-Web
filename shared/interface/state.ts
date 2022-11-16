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

export interface ProductFilterState {
  page: number;
  limit: number;
  price: {
    $gt: number;
    $lt: number;
  };
}

export interface PriceState {
  id: string;
  value: PriceStateValue;
}
export interface PriceStateValue {
  $gt?: number;
  $lt?: number;
}

export interface FilterState {
  subcategory: string;
  price: PriceStateValue;
}
