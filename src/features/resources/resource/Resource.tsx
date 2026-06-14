import { useResourcesStore } from "#/features/resources/resources.store";
import type { ResourceType } from "#/shared/resourcesBus";
import css from "./resource.module.css";

const RESOURCE_GAIN_RANGES = {
  gold: { min: 400, max: 900 },
  wood: { min: 4, max: 6 },
  ore: { min: 4, max: 6 },
  crystals: { min: 2, max: 4 },
  gems: { min: 2, max: 4 },
  mercury: { min: 2, max: 4 },
  dust: { min: 8, max: 12 },
} satisfies Record<ResourceType, { min: number; max: number }>;

const RESOURCE_IMAGES: Record<ResourceType, string> = {
  gold: "img/resource/gold.webp",
  wood: "img/resource/wood.webp",
  ore: "img/resource/ore.webp",
  crystals: "img/resource/crystal.webp",
  gems: "img/resource/gems.webp",
  mercury: "img/resource/mercury.webp",
  dust: "img/resource/dust.webp",
};

const Resource = ({ type, onClick }: ResourceProps) => {
  const historyIDX = useResourcesStore((state) => state.historyIDX);
  const count = useResourcesStore((state) => {
    const list = state.history[historyIDX] ?? [];
    let total = 0;

    for (let i = 0; i < list.length; i++) {
      if (list[i] === type) {
        total++;
      }
    }

    return total;
  });

  const range = RESOURCE_GAIN_RANGES[type];

  return (
    <div
      onClick={onClick}
      className={css.container}
      data-testid={`resource-${type}`}
    >
      <img
        alt={type}
        src={`${import.meta.env.BASE_URL}${RESOURCE_IMAGES[type]}`}
        draggable={false}
        className={css.image}
      />
      {count > 0 && (
        <div className={css.text}>
          <div>{`+${count}`}</div>
          <div>{`+(${count * range.min}-${count * range.max})`}</div>
        </div>
      )}
    </div>
  );
};

export default Resource;

type ResourceProps = {
  type: ResourceType;
  onClick: () => void;
};
