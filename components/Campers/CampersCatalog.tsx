import { Camper } from "@/types/Camper";
import Image from "next/image";
import Link from "next/link";
import CamperEquipments from "./CampersEquipments/CampersEquipments";
import css from "./CampersCatalog.module.css";

export default function CampersCatalog({ campers }: { campers: Camper[] }) {
  const maxLength =60;
  return (
    <ul className={css.camperList}>
      {campers.map((camper, index) => {
        const truncatedDescription = camper.description.length > maxLength
          ? camper.description.substring(0, maxLength) + "..."
          : camper.description;

        return (
          <li className={css.camperItem} key={camper._id || index}>
            <Image
              className={css.camperImage}
              src={camper.gallery[0]?.thumb}
              alt="Camper truck"
              width={292}
              height={320}
            />
            <div className={css.camperDetails}>
              <h2 className={css.camperName}>{camper.name}</h2>
              <p className={css.camperPrice}>€{camper.price}</p>
              <p>{camper.rating}({camper.reviews.length} Reviews)</p>
              <p>{camper.location}</p>
              <p className={css.camperDescription}>{truncatedDescription}</p>
              <CamperEquipments camper={camper} />
              <Link className={css.showMoreLink} href={`/campers/${camper._id}`}>Show more</Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}