import { mapSlugToRoute } from "./map-category";

export const acceptedCategoryRoutes = ["men", "women", "accessories", "clothing"];

export const mapCategoryToRoute = (subcategory: string, category?: string) => {
  if (subcategory) return mapSlugToRoute[subcategory];
  return category;
};
