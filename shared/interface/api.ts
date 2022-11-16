import { AxiosError } from "axios";
import { Product, User } from "./entity";
import { HomePageBanner, HomePageBlog, HomePageHero } from "./pages";
import { FilterState } from "./state";

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

export interface AuthenticateSessionSuccess extends User {}

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

export interface OAuth2Success {
  accessToken: string;
  refreshToken: string;
}

export interface FetchProductState extends Partial<FilterState> {
  category: string;
  page: number;
}

export interface FetchProductsSuccess {
  total: number;
  nextPage: number;
  products: Array<Product>;
}

export type FetchProductSuccess = Product;

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
}

export type AxiosErrorResponse = AxiosError<ErrorResponse>;
