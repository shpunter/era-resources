import { create } from "zustand";
import { patchUp } from "#/shared/resourcesBus";
import type { ResourceType } from "#/shared/resourcesBus";

type Store = {
  history: ResourceType[][];
  historyIDX: number;
};

type Action = {
  addResource: (resource: ResourceType) => void;
  setHistoryIDX: (idx: number) => void;
  reset: () => void;
};

export const useResourcesStore = create<Store & Action>((set) => ({
  history: [],
  historyIDX: 0,

  addResource: (resource) => {
    set((state) => {
      const history = structuredClone(state.history);
      history[state.historyIDX] ??= [];
      history[state.historyIDX].push(resource);
      patchUp({ history });
      return { history };
    });
  },

  setHistoryIDX: (historyIDX) => set({ historyIDX }),

  reset: () => {
    set({ history: [] });
    patchUp({ history: [] });
  },
}));
