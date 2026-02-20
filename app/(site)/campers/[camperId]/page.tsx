
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchCamperById } from "@/lib/api/campers";
import CamperByIdClient from "./CamperById.client";

interface CamperByIdProps {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({ params }: CamperByIdProps): Promise<Metadata> {
  const { camperId } = await params;
  const rv = await fetchCamperById(camperId);

  if (!rv) {
    return {
      title: `Camper`,
      description: `Camper details`,
    };
  }

  return {
    title: `${rv.name}`,
    description: `${rv.description}`,
    openGraph: {
      title: `${rv.name}`,
      description: `${rv.description}`,
      url: `https://travel-trucks-project-rho.vercel.app/catalog/${camperId}`,
      images: [
        {
          url: `${rv.gallery?.[0]?.thumb ?? ""}`,
          width: 1200,
          height: 630,
          alt: `${rv.name}`,
        },
      ],
    },
  };
}

const CamperById = async ({ params }: CamperByIdProps) => {
  const queryClient = new QueryClient();
  const { camperId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["camperById", `id:${camperId}`],
    queryFn: () => fetchCamperById(camperId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperByIdClient />
    </HydrationBoundary>
  );
};

export default CamperById;