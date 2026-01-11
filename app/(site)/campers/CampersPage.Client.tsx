"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { fetchCampers } from "@/lib/api/campers";
import CampersCatalog from "@/components/Campers/CampersCatalog";
import { CampersResponse } from "@/types/Camper";

export default function CampersPageClient() {
   const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
} = useInfiniteQuery<
    CampersResponse,                           // TQueryFnData
    Error,                                     // TError
    InfiniteData<CampersResponse, number>,     // ✅ TData
    ["campers"],                               // TQueryKey
    number                                     // TPageParam
>({
    queryKey: ["campers"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchCampers(pageParam),
    getNextPageParam: (lastPage) => {
        if (lastPage.campers.length < 4) {
            return undefined;
        }
        return lastPage.page + 1;
    },
});

    const campers = data?.pages.flatMap((page) => page.campers) ?? [];

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading campers</p>;

    return (
        <div>
            <Toaster />

            {campers.length > 0 ? (
                <CampersCatalog campers={campers} />
            ) : (
                <p>No campers found.</p>
            )}

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
            )}
        </div>
    );
}