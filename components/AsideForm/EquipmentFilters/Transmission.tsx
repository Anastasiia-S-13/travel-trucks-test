import type { CampersQueryParams, Transmission } from "@/types/Camper";


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
        <div>
            <h3>Transmission type</h3>
            <ul>
                {options.map(option => (
                    <li key={option.value} onClick={() =>
                        setFilters({ ...filters, transmission: option.value as Transmission})
                    }><svg width={20} height={20}>
                            <use href={`/sprite/sprite.svg#${option.icon}`} />
                        </svg>{option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}