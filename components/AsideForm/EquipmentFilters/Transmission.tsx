import type { CampersQueryParams, Transmission } from "@/types/Camper";
import css from "./EquipmentFilters.module.css";


export type VehicleTypeFiltersProps = {
    filters: CampersQueryParams;
    setFilters: (filters: CampersQueryParams) => void;
};

export default function Transmission({ filters, setFilters }: VehicleTypeFiltersProps) {
    const options = [
        { value: "manual", label: "Manual", icon: "icon-manual-transmission" },
        { value: "automatic", label: "Automatic", icon: "icon-automatic" },
    ];

    return (
        <div className={css.filterContainer}>
            <h3 className={css.filterTitle}>Transmission type</h3>
            <ul className={css.filterList}>
                {options.map(option => {
                    const isActive = filters?.transmission === option.value;
                    return (
                        <li className={`${css.filterItem} ${isActive ? css.active : ""}`} key={option.value} onClick={() =>
                            setFilters({ ...filters, transmission: option.value as Transmission})
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