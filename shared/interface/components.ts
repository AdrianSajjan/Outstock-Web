import { Product } from "./entity";

export interface BreadCrumbProp {
  name: string;
  url: string;
  isCurrentPage?: boolean;
}

export interface ProductCardProps extends Product {}

export interface ProfileSidebarProps {
  isOpen: boolean;
  handleClose: () => void;
  isLoadingComplete?: boolean;
}

export interface ProfileFormProps {
  handleFormChange: () => void;
}
