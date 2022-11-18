import createVanillaStore from "zustand/vanilla";

interface ApiStore {
  pendingRequests: Array<Promise<any>>;
  isAuthRefreshing: boolean;
}

export const apiStore = createVanillaStore<ApiStore>(() => ({
  isAuthRefreshing: false,
  pendingRequests: [],
}));
