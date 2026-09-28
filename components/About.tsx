"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CERTS, SITE } from "@/lib/data";
import { renderBold } from "@/lib/richText";
import styles from "@/styles/About.module.css";

export default function About({ onModalToggle }: { onModalToggle: (open: boolean) => void }) {
  const [cert, setCert] = useState<(typeof CERTS)[number] | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // preload certificate images so the lightbox opens instantly
  useEffect(() => {
    CERTS.forEach((c) => { const img = new Image(); img.src = c.src; });
  }, []);

  useEffect(() => {
    onModalToggle(!!cert);
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setCert(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cert, onModalToggle]);

  return (
    <section id="about" className={styles.section}>
      <h2 className={`h2 ${styles.title}`}>About <span className="stroke">Me</span></h2>
      <div className={styles.grid}>
        <div className={styles.frame}>
          <img src="/portrait.jpg" alt="Portrait of Suyog Karki built from Rubik's cube tiles" />
          <span className={`${styles.corner} ${styles.tl}`} />
          <span className={`${styles.corner} ${styles.tr}`} />
          <span className={`${styles.corner} ${styles.bl}`} />
          <span className={`${styles.corner} ${styles.br}`} />
          <span className={styles.tag}>SUY0G<em>.99</em></span>
        </div>
        <div className={styles.copy}>
          {SITE.about.bio.map((p, i) => (
            <p key={i}>{renderBold(p)}</p>
          ))}
          <div className={styles.edu}>
            {SITE.about.education.map((ed, i) => (
              <div className={styles.eduCard} key={i}>
                <div>
                  <h4>{ed.degree}</h4>
                  <small>{ed.affiliation}</small>
                </div>
                <span className={styles.gpa}>{ed.gpa}</span>
              </div>
            ))}
          </div>
          <p className={styles.certLabel}>
            Certifications <b>— click to view</b>
          </p>
          <div className={styles.certs}>
            {CERTS.map((c) => (
              <button key={c.id} className={styles.chip} onClick={() => setCert(c)}>
                🏅 {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <div
            className={`${styles.modal} ${cert ? styles.modalOpen : ""}`}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.backdrop} onClick={() => setCert(null)} />
            {cert && (
              <figure className={styles.figure}>
                <button className={styles.close} aria-label="Close" onClick={() => setCert(null)}>✕</button>
                <img src={cert.src} alt={cert.cap} />
                <figcaption>{cert.cap}</figcaption>
              </figure>
            )}
          </div>,
          document.body
        )}
    </section>
  );
}
