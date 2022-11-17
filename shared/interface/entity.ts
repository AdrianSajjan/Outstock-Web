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
  subcategory: Category;
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
  _id?: any;
  size?: string;
  quantity: number;
  product: Product;
}
