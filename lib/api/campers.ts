import { api } from "@/lib/api/api";
import { CampersResponse } from "@/types/Camper";

export const fetchCampers = async (page: number): Promise<CampersResponse> => {
    const response = await api.get("/campers", {
        params: { page, limit: 4 },
    });

    const campersArray =
        response.data?.campers?.items ||
        response.data?.items ||
        (Array.isArray(response.data) ? response.data : []);

    const totalPages = response.data?.campers?.totalPages || response.data?.totalPages || 1;

    return {
        campers: campersArray,
        totalPages: totalPages,
        page: page,
    };
};