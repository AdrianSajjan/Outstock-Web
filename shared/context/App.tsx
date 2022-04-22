import * as React from "react";

export const AppContext = React.createContext({
  isCartSidebarOpen: false,
  isLoginSidebarOpen: false,
  isSearchSidebarOpen: false,
  setCartSidebarOpen: (_state: boolean) => {},
  setLoginSidebarOpen: (_state: boolean) => {},
  setSearchSidebarOpen: (_state: boolean) => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [isCartSidebarOpen, setCartSidebarOpen] = React.useState(false);
  const [isLoginSidebarOpen, setLoginSidebarOpen] = React.useState(false);
  const [isSearchSidebarOpen, setSearchSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (isLoginSidebarOpen || isCartSidebarOpen || isSearchSidebarOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isLoginSidebarOpen, isCartSidebarOpen, isSearchSidebarOpen]);

  const values = {
    isLoginSidebarOpen,
    isCartSidebarOpen,
    isSearchSidebarOpen,
    setLoginSidebarOpen,
    setCartSidebarOpen,
    setSearchSidebarOpen,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
