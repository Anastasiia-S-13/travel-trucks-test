"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { fetchCamperById } from "@/lib/api/campers";
import css from "./CamperByIdClient.module.css";
import { CamperByIdFeatures } from "@/components/CamperByIdFeatures/CamperByIdFeatures";
import CamperByIdBooking from "@/components/CamperByIdBooking/CamperByIdBooking";
import CamperByIdReviews from "@/components/CamperByIdReviews/CamperByIdReviews";

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
    <section>
      <div>
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
      </div>
      <div className={css.camperByIdFeaturesBookingBox}>
        {tooglePage === "features" ? (
          <CamperByIdFeatures data={data} />
        ) : (
          <CamperByIdReviews/>
        )}
        <CamperByIdBooking />
      </div>
    </section>
  );
};

export default CamperByIdClient;