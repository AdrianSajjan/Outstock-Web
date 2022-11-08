export interface BreadCrumbProp {
  name: string;
  url: string;
  isCurrentPage?: boolean;
}

export interface ProductCardProps {
  name: string;
  price: string;
  rating: number;
  image: string;
}

export interface ProfileSidebarProps {
  isOpen: boolean;
  handleClose: () => void;
  isLoadingComplete: boolean;
}

export interface LoginFormProps {
  handleFormChange: () => void;
}
