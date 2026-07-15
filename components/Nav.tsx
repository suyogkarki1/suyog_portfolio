"use client";

import { useState } from "react";
import styles from "@/styles/Nav.module.css";

const LINKS = [
  ["home", "Home"],
  ["about", "About"],
  ["stack", "Tech Stack"],
  ["projects", "Projects"],
  ["values", "10 Values"],
  ["contact", "Contact"],
] as const;

export default function Nav({
  active,
  goTo,
}: {
  active: string;
  goTo: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <a
        className={styles.logo}
        href="#home"
        onClick={(e) => { e.preventDefault(); goTo("home"); setOpen(false); }}
      >
        SUY0G<em>.99</em>
      </a>
      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>
      <div className={`${styles.links} ${open ? styles.open : ""}`}>
        {LINKS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? styles.active : undefined}
            onClick={(e) => { e.preventDefault(); goTo(id); setOpen(false); }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
