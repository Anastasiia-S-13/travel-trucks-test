import { Camper } from "@/types/Camper";
import css from "./CamperByIdFeatures.module.css";

type EquipmentKey = keyof Pick<Camper, "AC" | "bathroom" | "kitchen" | "TV" | "radio" | "refrigerator" | "microwave" | "gas" | "water">;

const equipmentOptions: { key: EquipmentKey; label: string; icon: string }[] = [
  { key: "AC", label: "AC", icon: "icon-AC" },
  { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
  { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
  { key: "TV", label: "TV", icon: "icon-tv" },
  { key: "radio", label: "Radio", icon: "icon-radio" },
  { key: "refrigerator", label: "Refrigerator", icon: "icon-refrigerator" },
  { key: "microwave", label: "Microwave", icon: "icon-microwave" },
];

export default function CamperByIdFeatures({ data }: { data: Camper }) {
  return (
    <div>
      <ul className={css.equipmentList}>
        <li className={css.equipmentItem}>
          <svg width={20} height={20}>
            <use href={`/sprite/sprite.svg#${data.transmission === "automatic" ? "icon-automatic" : "icon-manual-transmission"}`} />
          </svg>
          {data.transmission}
        </li>
        <li className={css.equipmentItem}>
          <svg width={20} height={20}>
            <use href={`/sprite/sprite.svg#${data.engine === "diesel" ? "icon-diesel" : "icon-petrol"}`} />
          </svg>
          {data.engine}
        </li>
        {equipmentOptions
          .filter((opt) => Boolean(data[opt.key]))
          .map((opt) => (
            <li className={css.equipmentItem} key={opt.key}>
              <svg width={20} height={20}>
                <use href={`/sprite/sprite.svg#${opt.icon}`} />
              </svg>
              <span>{opt.label}</span>
            </li>
          ))}
      </ul>

    </div>
  );
}
