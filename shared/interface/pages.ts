import { FetchProductsSuccess } from "./api";
import { Product } from "./entity";

export type HomePageBlog = Array<{ _id: string; image: string; title: string; body: string }>;
export type HomePageBanner = Array<{ _id: string; image: string; title: string; caption: string }>;
export type HomePageHero = Record<"main" | "left" | "right" | "bottom", { image: string; title: string; caption?: string; url?: string }>;

export interface HomePageServerSideProps {
  site: HomePageSiteProps;
  men: FetchProductsSuccess;
  women: FetchProductsSuccess;
}

export interface HomePageSiteProps {
  blog: HomePageBlog;
  banner: HomePageBanner;
  hero: HomePageHero;
}

export interface HomePageProps extends HomePageServerSideProps {}

export interface ProductPageServerSideProps {
  data: FetchProductsSuccess;
}

export interface ProductPageProps extends ProductPageServerSideProps {}

export interface DetailsPageServerSideProps {
  data: Product;
}

export interface DetailsPageProps extends DetailsPageServerSideProps {}
