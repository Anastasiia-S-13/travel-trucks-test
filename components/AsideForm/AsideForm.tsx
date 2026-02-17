"use client"

import { CampersQueryParams } from "@/types/Camper";
import css from "./AsideForm.module.css";
import { useEffect, useState } from "react";
import LocationInput from "./LocationInput/LocationInput";
import Equipment from "./EquipmentFilters/Equipment";
import CamperType from "./EquipmentFilters/CamperType";
import Engine from "./EquipmentFilters/Engine";
import Transmission from "./EquipmentFilters/Transmission";

interface AsideFormProps {
    filters: CampersQueryParams;
  setFilters: (filters: CampersQueryParams) => void;
  onReset: () => void;
}

export default function AsideForm({ filters, setFilters, onReset }: AsideFormProps) {
    const [localFilters, setLocalFilters] = useState<CampersQueryParams>({});

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilters(localFilters);
    };

    const handleResetLocal = () => {
        setLocalFilters({});
        onReset();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <LocationInput
                filters={localFilters}
                setFilters={setLocalFilters}
            />
            <p className={css.filtersCaption}>Filters</p>
            <Equipment />
            <CamperType filters={localFilters} setFilters={setLocalFilters} />
            <Engine filters={localFilters} setFilters={setLocalFilters} />
            <Transmission filters={localFilters} setFilters={setLocalFilters} />
            <button type="submit">Search</button>
            <button type="button" onClick={handleResetLocal}>
                Reset
            </button>
        </form>
    );
}