import { HomePageServerSideProps } from "./pages";

export interface FetchHomePageDataSuccess {
  _id: string;
  name: string;
  slug: string;
  data: HomePageServerSideProps;
}

export interface AuthenticateSessionSuccess {
  user: any;
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
