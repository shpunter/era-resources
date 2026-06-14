import { useEffect } from "react";
import Resources from "#/features/resources/Resources";
import { emit, events$, state$ } from "#/shared/resourcesBus";
import { useObservable } from "#/shared/useObservable";
import { useResourcesStore } from "#/features/resources/resources.store";
import "./index.css";

export default function App() {
  const setHistoryIDX = useResourcesStore((state) => state.setHistoryIDX);
  const reset = useResourcesStore((state) => state.reset);
  const { down } = useObservable(state$, state$.getValue());

  useEffect(() => {
    setHistoryIDX(down.historyIDX);
  }, [down.historyIDX, setHistoryIDX]);

  useEffect(() => {
    emit({ type: "resources:ready" });
  }, []);

  useEffect(() => {
    const sub = events$.subscribe((e) => {
      if (e.type === "resources:reset-all") reset();
    });
    return () => sub.unsubscribe();
  }, [reset]);

  return <Resources />;
}
