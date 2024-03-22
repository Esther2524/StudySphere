import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useStore = create()(
  immer((set) => ({
    isAuthed: false,
    setIsAuthed: (newState) =>
      set((state) => {
        state.isAuthed = newState;
      }),
  }))
);
