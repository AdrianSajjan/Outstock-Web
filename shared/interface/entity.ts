export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  emailAddress: string;
  phoneNumber: string;
}

export interface Product {}
