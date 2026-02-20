import { Camper } from "@/types/Camper";


export const CamperByIdFeatures = ({ data }: { data: Camper }) => {
  return (
    <div>
     <h3>{data.name}</h3>
    </div>
  );
};
