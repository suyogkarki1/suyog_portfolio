"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CERTS } from "@/lib/data";
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
        </div>
        <div className={styles.copy}>
          <p>
            I got into data science by being <b>wrong a lot</b> — my first
            models looked perfect until <b>data leakage</b> humbled me. Now I
            chase the questions most people skip: where did this data come from,
            and is this number lying to me? So I <b>test before I trust</b>:
            feature engineering, clean pipelines, statistical testing,
            cross-validation, model selection, and honest evaluation over raw
            accuracy.
          </p>
          <p>
            I like the <b>unglamorous 80%</b> — cleaning, EDA, doubting — as much
            as the modelling.
          </p>
          <div className={styles.edu}>
            <div className={styles.eduCard}>
              <div>
                <h4>BSc IT — Data Science · Kings College, Kathmandu</h4>
                <small>Affiliated with Westcliff University, California · 2023 – 2027 · 4th year</small>
              </div>
              <span className={styles.gpa}>GPA 3.54</span>
            </div>
            <div className={styles.eduCard}>
              <div>
                <h4>+2 Science · Kathmandu Model College</h4>
                <small>2020 – 2022</small>
              </div>
              <span className={styles.gpa}>GPA 3.35</span>
            </div>
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
