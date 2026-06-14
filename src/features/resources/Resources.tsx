import type { ResourceType } from "#/shared/resourcesBus";
import { useResourcesStore } from "./resources.store";
import Resource from "./resource/Resource";
import css from "./resources.module.css";

const RESOURCES: ResourceType[] = [
  "gold",
  "wood",
  "ore",
  "crystals",
  "gems",
  "mercury",
  "dust",
];

const Resources = () => {
  const addResource = useResourcesStore((state) => state.addResource);

  return (
    <div className={css.resources}>
      {RESOURCES.map((item) => (
        <Resource key={item} type={item} onClick={() => addResource(item)} />
      ))}
    </div>
  );
};

export default Resources;
