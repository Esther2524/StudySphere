import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useStore = create()(
  immer((set) => ({
    userId: "",
    isAuthed: false,
    setIsAuthed: (newState) =>
      set((state) => {
        state.isAuthed = newState;
      }),
    setCurrentUser: (id) =>
      set((state) => {
        state.userId = id;
      }),
    logOut: () =>
      set((state) => {
        state.userId = "";
        state.isAuthed = false;
      }),
  }))
);
