"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/campers", label: "Catalog" },
  ];
  return (
    <header className={css.headerContainer}>
      <Image src="/logo.svg" alt="Travel Trucks Logo" width={136} height={16} />
      <nav className={css.navContainer}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${css.link} ${isActive ? css.active : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}