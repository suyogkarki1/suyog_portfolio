"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project, StackItem, ValueItem, Social, Cert, SiteContent } from "@/lib/data";
import ProjectsEditor from "@/app/admin/editors/ProjectsEditor";
import StackEditor from "@/app/admin/editors/StackEditor";
import ValuesEditor from "@/app/admin/editors/ValuesEditor";
import SocialsEditor from "@/app/admin/editors/SocialsEditor";
import CertsEditor from "@/app/admin/editors/CertsEditor";
import SiteEditor from "@/app/admin/editors/SiteEditor";
import CvEditor from "@/app/admin/editors/CvEditor";
import styles from "@/styles/Admin.module.css";

const TABS = [
  "Projects",
  "Tech Stack",
  "Values",
  "Socials",
  "Certifications",
  "Hero & Site Text",
  "CV File",
] as const;
type Tab = (typeof TABS)[number];

export default function AdminDashboard({
  projects,
  stack,
  values,
  socials,
  certs,
  site,
}: {
  projects: Project[];
  stack: StackItem[];
  values: ValueItem[];
  socials: Social[];
  certs: Cert[];
  site: SiteContent;
}) {
  const [tab, setTab] = useState<Tab>("Projects");
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>SUY0G.99 admin</div>
        {TABS.map((t) => (
          <button key={t} className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
        <button className={styles.logout} onClick={logout}>Log out</button>
      </aside>
      <main className={styles.main}>
        {/* All editors stay mounted (hidden via CSS) so switching tabs never discards unsaved edits. */}
        <div style={{ display: tab === "Projects" ? "block" : "none" }}><ProjectsEditor initial={projects} /></div>
        <div style={{ display: tab === "Tech Stack" ? "block" : "none" }}><StackEditor initial={stack} /></div>
        <div style={{ display: tab === "Values" ? "block" : "none" }}><ValuesEditor initial={values} /></div>
        <div style={{ display: tab === "Socials" ? "block" : "none" }}><SocialsEditor initial={socials} /></div>
        <div style={{ display: tab === "Certifications" ? "block" : "none" }}><CertsEditor initial={certs} /></div>
        <div style={{ display: tab === "Hero & Site Text" ? "block" : "none" }}><SiteEditor initial={site} /></div>
        <div style={{ display: tab === "CV File" ? "block" : "none" }}><CvEditor /></div>
      </main>
    </div>
  );
}
