import * as React from "react";

export const AppContext = React.createContext({
  isCartSidebarOpen: false,
  isProfileSidebarOpen: false,
  isSearchSidebarOpen: false,
  setCartSidebarOpen: (_state: boolean) => {},
  setProfileSidebarOpen: (_state: boolean) => {},
  setSearchSidebarOpen: (_state: boolean) => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [isCartSidebarOpen, setCartSidebarOpen] = React.useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = React.useState(false);
  const [isSearchSidebarOpen, setSearchSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (isProfileSidebarOpen || isCartSidebarOpen || isSearchSidebarOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isProfileSidebarOpen, isCartSidebarOpen, isSearchSidebarOpen]);

  const values = {
    isProfileSidebarOpen,
    isCartSidebarOpen,
    isSearchSidebarOpen,
    setProfileSidebarOpen,
    setCartSidebarOpen,
    setSearchSidebarOpen,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
