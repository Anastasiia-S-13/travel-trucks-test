import type { CampersQueryParams, Engine } from "@/types/Camper";


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
        <div>
            <h3>Engine type</h3>
            <ul>
                {options.map(option => (
                    <li key={option.value} onClick={() =>
                        setFilters({ ...filters, engine: option.value as Engine })
                    }><svg width={20} height={20}>
                            <use href={`/sprite/sprite.svg#${option.icon}`} />
                        </svg>{option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}