import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform } from "@/types";

/** Minimal profile data stored in the selected list. */
export interface SelectedProfile {
  user_id: string;
  username: string;
  fullname: string;
  picture: string;
  platform: Platform;
  followers: number;
}

interface ListState {
  /** Array of selected profiles */
  profiles: SelectedProfile[];
  /** Add a profile to the list. Returns false if duplicate. */
  addProfile: (profile: SelectedProfile) => boolean;
  /** Remove a profile from the list by user_id. */
  removeProfile: (userId: string) => void;
  /** Toggle a profile in/out of the list. Returns true if added, false if removed. */
  toggleProfile: (profile: SelectedProfile) => boolean;
  /** Check if a profile is already in the list. */
  isInList: (userId: string) => boolean;
  /** Clear all profiles from the list. */
  clearList: () => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      profiles: [],

      addProfile: (profile) => {
        const { profiles } = get();
        if (profiles.some((p) => p.user_id === profile.user_id)) {
          return false; // duplicate
        }
        set({ profiles: [...profiles, profile] });
        return true;
      },

      removeProfile: (userId) => {
        set((state) => ({
          profiles: state.profiles.filter((p) => p.user_id !== userId),
        }));
      },

      toggleProfile: (profile) => {
        const { profiles } = get();
        const exists = profiles.some((p) => p.user_id === profile.user_id);
        if (exists) {
          set({ profiles: profiles.filter((p) => p.user_id !== profile.user_id) });
          return false; // removed
        }
        set({ profiles: [...profiles, profile] });
        return true; // added
      },

      isInList: (userId) => {
        return get().profiles.some((p) => p.user_id === userId);
      },

      clearList: () => {
        set({ profiles: [] });
      },
    }),
    {
      name: "influencer-list-storage", // localStorage key
    }
  )
);
