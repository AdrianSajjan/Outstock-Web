import { Product, Products } from "./entity";

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

export interface LogoutState {
  refreshToken: string;
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
  sort: string;
  price: string | Array<PriceStateValue>;
}

export interface UpdateCartState {
  id: string;
  product: Product;
}

export interface RemoveItemFromCartState {
  id: string;
  item: string;
}

export interface FetchProductState extends Partial<FilterState> {
  category: string;
  subcategory: string;
  page: number;
}

export interface CreateOrderFormState {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  state: string;
  pinCode: string;
  addressLineOne: string;
  addressLineTwo: string;
  cityOrDistrict: string;
}

export interface CreateOrderState {
  state: string;
  pinCode: string;
  fullName: string;
  products: Products;
  emailAddress: string;
  phoneNumber: string;
  totalAmount: number;
  addressLineOne: string;
  addressLineTwo: string;
  cityOrDistrict: string;
}

export interface UpdateOrderState {
  id: string;
  status: string;
}

export interface CreateTransactionState {
  oid: string;
  order: string;
  amount: number;
  phoneNumber: string;
  emailAddress: string;
  razorpayPaymentID: string;
  razorpayOrderID: string;
  razorpaySignature: string;
}

export interface RazorpayPaymentSuccess {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayPaymentFailed {
  error: {
    code: string; //"BAD_REQUEST_ERROR";
    description: string; //"Payment failed";
    metadata: {
      payment_id: string;
      order_id: string;
    };
    reason: string; //"payment_failed";
    source: string; //"gateway";
    step: string; //"payment_authorization";
  };
}

export interface AddReviewState {
  product: string;
  rating: number;
  comment?: string;
}
