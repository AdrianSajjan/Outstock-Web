import { AxiosError } from "axios";
import { Cart, Product, User } from "./entity";
import { HomePageBanner, HomePageBlog, HomePageHero } from "./pages";

export interface FetchHomePageDataSuccess {
  _id: string;
  name: string;
  slug: string;
  data: HomePageSiteData;
}

export interface HomePageSiteData {
  blog: HomePageBlog;
  banner: HomePageBanner;
  hero: HomePageHero;
}

export type AuthenticateSessionSuccess = User;

export interface LoginSuccess {
  user: any;
  accessToken: string;
  refreshToken: string;
}

export interface RegistrationSuccess {
  user: any;
  accessToken: string;
  refreshToken: string;
}

export interface LogoutSuccess {
  message: string;
}

export interface OAuth2Success {
  accessToken: string;
  refreshToken: string;
}

export interface FetchProductsSuccess {
  total: number;
  nextPage: number;
  products: Array<Product>;
}

export type FetchProductSuccess = Product;

export type FetchCartSuccess = Cart;

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
}

export type AxiosErrorResponse = AxiosError<ErrorResponse>;
