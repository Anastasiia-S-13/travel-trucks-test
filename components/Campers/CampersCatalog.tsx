import { Camper } from "@/types/Camper";
import Link from "next/link";

export default function CampersCatalog({ campers }: { campers: Camper[] }) {
  return (
    <ul>
      {campers.map((camper) => (
        <li key={camper._id}>
          <h2>{camper.name}</h2>
          <p>{camper.description}</p>
          <Link href={`/campers/${camper._id}`}>View details</Link>
        </li>
      ))}
    </ul>
  );
}