import { api } from "@/lib/api/api";
import { CampersQueryParams, CampersResponse, Camper } from "@/types/Camper";

export const fetchCampers = async (
    pageParam: number = 1,
    filters: CampersQueryParams
): Promise<CampersResponse> => {
    const limit = 4;
    const response = await api.get("/campers", {
        params: { page: pageParam, limit: limit, ...filters },
    });

    const campers =
        response.data?.campers?.items ??
        response.data?.items ??
        (Array.isArray(response.data) ? response.data : []);

    const normalizedCampers: Camper[] = (campers as unknown[]).map((c) => {
        const obj = c as Record<string, unknown>;
        const rawId = ((): string | undefined => {
            const a = obj["_id"];
            const b = obj["id"];
            if (typeof a === "string") return a;
            if (typeof a === "number") return String(a);
            if (typeof b === "string") return b;
            if (typeof b === "number") return String(b);
            return undefined;
        })();
        const _id = rawId ?? String(Math.random());
        return ({ ...(obj as Record<string, unknown>), _id } as unknown) as Camper;
    });

    const totalCount = Number(response.headers["x-total-count"]) || 0;

    const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : (normalizedCampers.length === limit ? pageParam + 1 : pageParam);

    return {
        campers: normalizedCampers,
        page: pageParam,
        totalPages: totalPages,
    };
};

export const fetchCamperById = async (id: string) => {
    try {
        const response = await api.get(`/campers/${id}`);
        let data = response.data;

        if (data == null) return null;

        if (data.item) data = data.item;
        if (data.campers) data = data.campers;
        if (data.items) data = data.items;

        if (Array.isArray(data)) {
            type MaybeCamper = { _id?: string; id?: string | number } & Record<string, unknown>;
            const found = data.find((c: unknown) => {
                const m = c as MaybeCamper;
                return String(m._id ?? m.id) === String(id);
            }) ?? data[0];
            const m = found as MaybeCamper | undefined;
            if (!m) return null;
            return { ...(m as Record<string, unknown>), _id: String(m._id ?? m.id) } as unknown as Camper;
        }

        if (data && typeof data === "object") {
            const obj = data as Record<string, unknown>;
            const rawId = obj["_id"] ?? obj["id"];
            const _id = rawId != null ? String(rawId) : undefined;
            return { ...obj, _id } as unknown as Camper;
        }

        return null;
    } catch (err) {
        const status = (err as unknown as { response?: { status?: number } })?.response?.status;
        if (status === 404) return null;
        console.error("fetchCamperById error:", err);
        return null;
    }
};