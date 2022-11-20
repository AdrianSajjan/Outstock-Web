import { AxiosError } from "axios";
import { Cart, Product, User } from "./entity";
import { HomePageBanner, HomePageBlog, HomePageHero } from "./pages";

export type AuthenticateSessionSuccess = User;

export type FetchProductSuccess = Product;

export type SearchProductsSuccess = Array<Product>;

export type FetchCartSuccess = Cart;

export type AxiosErrorResponse = AxiosError<ErrorResponse>;

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

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
}

export interface GenericErrorResponse {
  status: number;
  message: string;
}
