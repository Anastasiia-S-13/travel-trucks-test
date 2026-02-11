import { Camper } from "@/types/Camper";
import Image from "next/image";
import Link from "next/link";
import CamperEquipments from "./CampersEquipments/CampersEquipments";
import css from "./CampersCatalog.module.css";

export default function CampersCatalog({ campers }: { campers: Camper[] }) {
  return (
    <ul className={css.camperList}>
      {campers.map((camper, index) => (
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
            <p>{camper.description}</p>
              <CamperEquipments camper={camper} />
            <Link className={css.showMoreLink} href={`/campers/${camper._id}`}>Show more</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}