import { Box } from "@chakra-ui/react";
import { AppBar, Footer } from "@components/Layout";
import { CartSidebar, MobileSidebar, ProfileSidebar, SearchSidebar } from "@components/Sidebar";
import { useAppStore } from "@shared/store";
import type { NextPage } from "next";
import * as React from "react";

interface MainLayoutProps {
  isLoadingComplete: boolean;
}

const MainLayout: NextPage<MainLayoutProps> = ({ children, isLoadingComplete }) => {
  const {
    isProfileSidebarOpen,
    isCartSidebarOpen,
    isMobileSidebarOpen,
    isSearchSidebarOpen,
    setCartSidebarOpen,
    setProfileSidebarOpen,
    setSearchSidebarOpen,
    setMobileSidebarOpen,
  } = useAppStore();

  React.useEffect(() => {
    if (isProfileSidebarOpen || isCartSidebarOpen || isSearchSidebarOpen || isMobileSidebarOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isProfileSidebarOpen, isCartSidebarOpen, isSearchSidebarOpen, isMobileSidebarOpen]);

  const handleProfileSidebarClose = () => setProfileSidebarOpen(false);

  const handleSearchSidebarClose = () => setSearchSidebarOpen(false);

  const handleMobileSidebarClose = () => setMobileSidebarOpen(false);

  const handleCartSidebarClose = () => setCartSidebarOpen(false);

  const boxMargin = { base: "16", md: "32" };

  return (
    <>
      <AppBar />
      <CartSidebar isOpen={isCartSidebarOpen} handleClose={handleCartSidebarClose} />
      <ProfileSidebar isOpen={isProfileSidebarOpen} handleClose={handleProfileSidebarClose} isLoadingComplete={isLoadingComplete} />
      <SearchSidebar isOpen={isSearchSidebarOpen} handleClose={handleSearchSidebarClose} />
      <MobileSidebar isOpen={isMobileSidebarOpen} handleClose={handleMobileSidebarClose} />
      <Box as="main" mt={boxMargin} bg="white">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
