import create from "zustand";

interface AppStore {
  isCartSidebarOpen: boolean;
  isProfileSidebarOpen: boolean;
  isSearchSidebarOpen: boolean;
  setCartSidebarOpen: (state: boolean) => void;
  setProfileSidebarOpen: (state: boolean) => void;
  setSearchSidebarOpen: (state: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isProfileSidebarOpen: false,
  isCartSidebarOpen: false,
  isSearchSidebarOpen: false,
  setProfileSidebarOpen: (_state: boolean) => set((state) => ({ ...state, isProfileSidebarOpen: _state })),
  setCartSidebarOpen: (_state: boolean) => set((state) => ({ ...state, isCartSidebarOpen: _state })),
  setSearchSidebarOpen: (_state: boolean) => set((state) => ({ ...state, isSearchSidebarOpen: _state })),
}));
