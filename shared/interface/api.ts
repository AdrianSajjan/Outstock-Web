import { HomePageServerSideProps } from "./pages";

export interface FetchHomePageDataSuccess {
  _id: string;
  name: string;
  slug: string;
  data: HomePageServerSideProps;
}
