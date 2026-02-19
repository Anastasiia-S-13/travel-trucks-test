import { CamperForm, CampersQueryParams } from "@/types/Camper";
import css from "./EquipmentFilters.module.css";



export interface VehicleTypeFiltersProps {
  filters: CampersQueryParams;
  setFilters: (filters: CampersQueryParams) => void;
}

export default function CamperType({ filters, setFilters }: VehicleTypeFiltersProps) {
    const options = [
        { value: "panelTruck", label: "Van", icon: "icon-type-van" },
        {
            value: "fullyIntegrated",
            label: "Fully Integrated",
            icon: "icon-type-fully-integrated",
        },
        { value: "alcove", label: "Alcove", icon: "icon-type-alcove" },
    ];


    return <div className={css.filterContainer}>
        <h3 className={css.filterTitle}>Vehicle type</h3>
        <ul className={css.filterList}>
            {options.map(option => {
                const isActive = filters?.form === option.value;
                return (
                    <li className={`${css.filterItem} ${isActive ? css.active : ""}`} key={option.value} onClick={() =>
                        setFilters({ ...filters, form: option.value as CamperForm })
                    }><svg width={20} height={20}>
                            <use href={`/sprite/sprite.svg#${option.icon}`} />
                        </svg>{option.label}
                    </li>
                )
            })}
        </ul>
    </div>
}