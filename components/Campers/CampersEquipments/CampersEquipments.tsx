import { Camper } from "@/types/Camper";
import css from "../CampersCatalog.module.css";

export interface CamperItemsProps {
  camper: Camper;
}

const CamperEquipments = ({ camper }: CamperItemsProps) => {
    const equipmentOptions: {
        key: keyof Camper;
        label: string;
        icon: string;
    }[] = [
            { key: "AC", label: "AC", icon: "icon-AC" },
            { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
            { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
            { key: "TV", label: "TV", icon: "icon-tv" },
            { key: "radio", label: "Radio", icon: "icon-radio" },
            { key: "refrigerator", label: "Refrigerator", icon: "icon-refrigerator" },
            { key: "microwave", label: "Microwave", icon: "icon-microwave" },
        ];

    return (
        <ul className={css.equipmentList}>
            <li className={css.equipmentItem}>{camper.transmission}</li>
            <li className={css.equipmentItem}>{camper.engine}</li>
            {equipmentOptions
                .filter((item) => camper[item.key])
                .map((item) => (
                    <li className={css.equipmentItem} key={item.key}>
                        <svg width={20} height={20}>
                            <use href={`/sprite/sprite.svg#${item.icon}`} />
                        </svg>
                        <span>{item.label}</span>
                    </li>
                ))}
        </ul>
    );
};

export default CamperEquipments;