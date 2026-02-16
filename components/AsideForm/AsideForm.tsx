"use client"

import { CampersQueryParams } from "@/types/Camper";
import css from "./AsideForm.module.css";
import { useEffect, useState } from "react";
import LocationInput from "./LocationInput/LocationInput";

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
            <button type="submit">Search</button>
            <button type="button" onClick={handleResetLocal}>
                Reset
            </button>
        </form>
    );
}