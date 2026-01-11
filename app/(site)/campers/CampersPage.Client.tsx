"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { Toaster } from "react-hot-toast";
import { fetchCampers } from "@/lib/api/campers";
import CampersCatalog from "@/components/Campers/CampersCatalog";
import { CampersResponse } from "@/types/Camper";

export default function CampersPageClient() {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useQuery<CampersResponse>({
        queryKey: ["campers", page],
        queryFn: () => fetchCampers(page),
        placeholderData: keepPreviousData,
    });
    
   const campers = data?.campers || [];
    const totalPages = data?.totalPages || 0;
    const hasCampers = campers.length > 0;
    console.log("DATA:", data);
console.log("CAMPERS:", campers);
    
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading campers</p>;

    return (
        <div>
            <Toaster />

            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    page={page}
                    onPageChange={setPage}
                />
            )}

            {hasCampers ? (
                <CampersCatalog campers={campers} />

            ) : (
                !isLoading && <p>No campers found.</p>
            )}
        </div>
    );
}