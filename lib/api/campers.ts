import { api } from "@/lib/api/api";
import { CampersResponse } from "@/types/Camper";

export const fetchCampers = async (
    pageParam: number = 1
): Promise<CampersResponse> => {
    const limit = 4;
    const response = await api.get("/campers", {
        params: { page: pageParam, limit: limit },
    });

    const campers =
        response.data?.campers?.items ??
        response.data?.items ??
        (Array.isArray(response.data) ? response.data : []);

    const totalCount = Number(response.headers["x-total-count"]) || 0;

    const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : (campers.length === limit ? pageParam + 1 : pageParam);

    return {
        campers,
        page: pageParam,
        totalPages: totalPages,
    };
};