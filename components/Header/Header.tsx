import Link from "next/link";

export default function Header() {
  return (
    <header>
      <p>Travel Trucks</p>
      <Link href="/campers">Campers</Link>
    </header>
  );
}
