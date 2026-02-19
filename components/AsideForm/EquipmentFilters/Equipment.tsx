import React from "react";
import { CampersFilterItemProps, CampersQueryParams } from "@/types/Camper";
import css from "./EquipmentFilters.module.css";

export default function Equipment({ filters, setFilters }: CampersFilterItemProps) {
    type EquipmentKey = keyof Pick<CampersQueryParams, "AC" | "bathroom" | "kitchen" | "TV" | "radio" | "refrigerator" | "microwave">;

    const equipmentOptions: { key: EquipmentKey; label: string; icon: string }[] = [
        { key: "AC", label: "AC", icon: "icon-AC" },
        { key: "bathroom", label: "Bathroom", icon: "icon-bathroom" },
        { key: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
        { key: "TV", label: "TV", icon: "icon-tv" },
        { key: "radio", label: "Radio", icon: "icon-radio" },
        { key: "refrigerator", label: "Refrigerator", icon: "icon-refrigerator" },
        { key: "microwave", label: "Microwave", icon: "icon-microwave" },
    ];

    const toggle = (key: EquipmentKey) => {
        const next = { ...(filters || {}) } as CampersQueryParams;
        next[key] = !Boolean(next[key]);
        setFilters(next);
    };

    return (
        <div className={css.filterContainer}>
            <h3 className={css.filterTitle}>Vehicle equipment</h3>
            <ul className={css.filterList}>
                {equipmentOptions.map((option) => {
                    const key: EquipmentKey = option.key;
                    const isActive = Boolean((filters as CampersQueryParams | undefined)?.[key]);
                    return (
                        <li
                            key={option.key}
                            role="button"
                            tabIndex={0}
                            aria-pressed={isActive}
                            className={`${css.filterItem} ${isActive ? css.active : ""}`}
                            onClick={() => toggle(key)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
                                if (e.key === "Enter" || e.key === " ") toggle(key);
                            }}
                        >
                            <svg width={20} height={20}>
                                <use href={`/sprite/sprite.svg#${option.icon}`} />
                            </svg>
                            {option.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}