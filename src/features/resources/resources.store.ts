import { createIdbStore } from "#/shared/createIdbStore";
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

export const useResourcesStore = createIdbStore<Store & Action>(
  "resources",
  (set) => ({
    history: [],
    historyIDX: 0,

    addResource: (resource) => {
      set((state) => {
        const history = structuredClone(state.history);
        history[state.historyIDX] ??= [];
        history[state.historyIDX].push(resource);
        return { history };
      });
    },

    setHistoryIDX: (historyIDX) => set({ historyIDX }),

    reset: () => set({ history: [] }),
  }),
);

useResourcesStore.subscribe((state, prev) => {
  if (state.history !== prev.history) patchUp({ history: state.history });
});

useResourcesStore.persist.onFinishHydration((state) => {
  patchUp({ history: state.history, hydrated: true });
});
