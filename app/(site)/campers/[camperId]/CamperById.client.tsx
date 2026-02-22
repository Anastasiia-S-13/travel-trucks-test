"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { fetchCamperById } from "@/lib/api/campers";
import css from "./CamperByIdClient.module.css";
import CamperByIdFeatures from "@/components/CamperByIdFeatures/CamperByIdFeatures";
import CamperByIdBooking from "@/components/CamperByIdBooking/CamperByIdBooking";
import CamperByIdReviews from "@/components/CamperByIdReviews/CamperByIdReviews";
import Image from "next/image";

const CamperByIdClient = () => {
  const [tooglePage, setTooglePage] = useState<"features" | "reviews">(
    "features"
  );

  const { camperId } = useParams<{ camperId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["camperById", `id:${camperId}`],
    queryFn: () => fetchCamperById(camperId as string),
    enabled: Boolean(camperId),
    refetchOnMount: false,
  });

  if (isLoading || !data) {
    return <p>Load</p>;
  }

  return (
    <section className="container" style={{ paddingBottom: "48px", paddingTop: "48px" }}>
      <div>
        <h3 className={css.camperName}>{data.name}</h3>
        <div className={css.camperInfo}>
          <p className={css.camperRating}>
            <svg width={16} height={16}>
              <use href={`/sprite/sprite.svg#icon-Rating`} />
            </svg>{data.rating}({data.reviews?.length ?? 0} Reviews)</p>
          <p className={css.camperLocation}><svg width={16} height={16}>
            <use href={`/sprite/sprite.svg#icon-map`} />
          </svg>{data.location}</p>
        </div>
        <p className={css.camperPrice}>€{data.price}</p>
        <div className={css.camperGallery}>
          {data.gallery?.slice(0, 4).map((img, idx) => {
            const getSrc = (item: unknown): string | undefined => {
              if (typeof item === "string") return item;
              if (item && typeof item === "object") {
                const obj = item as Record<string, unknown>;
                if (typeof obj.url === "string" && obj.url) return obj.url;
                if (typeof obj.src === "string" && obj.src) return obj.src;
                if (typeof obj.thumb === "string" && obj.thumb) return obj.thumb;
                if (typeof obj.original === "string" && obj.original) return obj.original;
              }
              return undefined;
            };

            const src = getSrc(img);
            if (!src) return null;
            return (
              <Image
                className={css.camperGalleryImage}
                key={idx}
                src={src}
                alt={data.name}
                width={312}
                height={292}
              />
            );
          })}
        </div>
        <p className={css.camperDescription}>{data.description}</p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setTooglePage("features")}
        >
          Features
        </button>
        <button
          type="button"
          onClick={() => setTooglePage("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className={css.camperByIdFeaturesBookingBox}>
        {tooglePage === "features" ? (
          <CamperByIdFeatures data={data} />
        ) : (
          <CamperByIdReviews />
        )}
        <CamperByIdBooking />
      </div>
    </section>
  );
}

export default CamperByIdClient;