import { User } from "./entity";
import { HomePageServerSideProps } from "./pages";

export interface FetchHomePageDataSuccess {
  _id: string;
  name: string;
  slug: string;
  data: HomePageServerSideProps;
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
