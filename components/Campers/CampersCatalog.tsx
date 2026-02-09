import { Camper } from "@/types/Camper";
import Image from "next/image";
import Link from "next/link";
import CamperEquipments from "./CampersEquipments/CampersEquipments";

export default function CampersCatalog({ campers }: { campers: Camper[] }) {
  return (
    <ul>
      {campers.map((camper, index) => (
        <li key={camper._id || index}>
         <Image
            src={camper.gallery[0]?.thumb}
            alt="Camper truck"
            width={292}
            height={320}
          />
          <p>€{camper.price}</p>
          <p>{camper.rating}</p>
          <p>{camper.location}</p>
          <p>{camper.description}</p>
          <ul>
            <li>{camper.transmission}</li>
            <li>{camper.engine}</li>
            <CamperEquipments camper={camper} />
          </ul>
          <Link href={`/campers/${camper._id}`}>Show more</Link>
        </li>
      ))}
    </ul>
  );
}