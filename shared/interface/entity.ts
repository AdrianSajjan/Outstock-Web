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

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  averageRating: number;
  images: Array<string>;
  description: string;
  price: number;
  currency: string;
  gender: Array<string>;
  category: Category;
  reviews?: Array<Review>;
  subcategory: Array<Category>;
}

export interface Review {
  user: Pick<User, "_id" | "firstName" | "lastName">;
  rating: number;
  comment?: string;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  code: number;
  parent?: Category;
}

export interface Cart {
  _id: string;
  user: User;
  status: string;
  isActive: boolean;
  totalPrice: number;
  totalQuantity: number;
  items: Array<CartItem>;
}

export interface CartItem {
  _id: any;
  size?: string;
  quantity: number;
  product: Product;
}

export interface Order {
  _id: string;
  user: User;
  transactions?: Array<Transaction>;
  products: Products;
  oid: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  state: string;
  pinCode: string;
  addressLineOne: string;
  addressLineTwo?: string;
  cityOrDistrict: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Products = Array<Omit<CartItem, "_id">>;

export interface Transaction {
  _id: string;
  user: User;
  order: Order;
  paymentID: string;
  oid: string;
  amount: number;
  invoice: string;
  card?: {
    lastFourDigits: number;
    network: string;
    type: string;
    subType?: string;
  };
  paymentStatus: string;
  emailAddress: string;
  refundStatus?: string;
  refundAmount?: number;
  error?: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
  };
  phoneNumber: string;
  method: string;
  createdAt: Date;
  updatedAt: Date;
}
