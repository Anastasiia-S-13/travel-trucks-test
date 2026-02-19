import type { CampersQueryParams, Engine } from "@/types/Camper";
import css from "./EquipmentFilters.module.css";


export type VehicleTypeFiltersProps = {
    filters: CampersQueryParams;
    setFilters: (filters: CampersQueryParams) => void;
};

export default function Engine({ filters, setFilters }: VehicleTypeFiltersProps) {
    const options = [
        { value: "diesel", label: "Diesel", icon: "icon-diesel" },
        { value: "petrol", label: "Petrol", icon: "icon-petrol" },
        { value: "hybrid", label: "Hybrid", icon: "icon-hybrid" },
    ];

    return (
        <div className={css.filterContainer}>
            <h3 className={css.filterTitle}>Engine type</h3>
            <ul className={css.filterList}>
                {options.map(option => {
                    const isActive = filters?.engine === option.value;
                    return (
                        <li className={`${css.filterItem} ${isActive ? css.active : ""}`} key={option.value} onClick={() =>
                            setFilters({ ...filters, engine: option.value as Engine })
                        }><svg width={20} height={20}>
                                <use href={`/sprite/sprite.svg#${option.icon}`} />
                            </svg>{option.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}