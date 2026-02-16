"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { fetchCampers } from "@/lib/api/campers";
import CampersCatalog from "@/components/Campers/CampersCatalog";
import { CampersQueryParams, CampersResponse } from "@/types/Camper";
import css from "./CampersPageClient.module.css";
import AsideForm from "@/components/AsideForm/AsideForm";
import { useState } from "react";

export default function CampersPageClient() {
    const [filters, setFilters] = useState<CampersQueryParams>({});

    const handleReset = () => {
        setFilters({});
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery<
        CampersResponse,
        Error,
        InfiniteData<CampersResponse, number>,
        ["campers", CampersQueryParams],
        number
    >({
        queryKey: ["campers", filters],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => fetchCampers(pageParam, filters),
        getNextPageParam: (lastPage) => {
            if (lastPage.campers.length < 4) return undefined;
            return lastPage.page + 1;
        },
    });
    const campers = data?.pages.flatMap((page) => page.campers) ?? [];

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading campers</p>;

    return (
        <div className="container">
            <Toaster />

            <AsideForm
                filters={filters}
                setFilters={setFilters}
                onReset={handleReset}
            />

            <div className={css.catalogWrapper}>
                {campers.length > 0 ? (
                    <CampersCatalog campers={campers} />
                ) : (
                    <p>No campers found.</p>
                )}

                {hasNextPage && (
                    <button
                        className={css.loadMoreButton}
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                )}
            </div>
        </div>
    );
}