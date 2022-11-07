// Home Page

export type HomePageBlog = Array<{ _id: string; image: string; title: string; body: string }>;
export type HomePageBanner = Array<{ _id: string; image: string; title: string; caption: string }>;
export type HomePageHero = Record<"main" | "left" | "right" | "bottom", { image: string; title: string; caption?: string; url?: string }>;

export interface HomePageServerSideProps {
  blog: HomePageBlog;
  banner: HomePageBanner;
  hero: HomePageHero;
}

export type HomePageProps = HomePageServerSideProps;

// End of Home Page