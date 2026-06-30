import { create } from "zustand";
import type { Platform } from "@/types";

interface SearchState {
  /** Currently selected platform tab */
  platform: Platform;
  /** Raw search query (unprocessed) */
  searchQuery: string;
  /** Actions */
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  platform: "instagram",
  searchQuery: "",

  setPlatform: (platform) =>
    set({ platform, searchQuery: "" }),

  setSearchQuery: (searchQuery) =>
    set({ searchQuery }),

  resetSearch: () =>
    set({ searchQuery: "" }),
}));
