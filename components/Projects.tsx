"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PROJECTS } from "@/lib/data";
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from "@/lib/gsapSetup";
import styles from "@/styles/Projects.module.css";

/* ---- truncated-icosahedron face layout (edge-to-edge patches) ---- */
const D2R = Math.PI / 180;
const S = 82;                     // shared patch edge length
const RB = 205;                   // ball radius
const PENT_R = 0.8507 * S;
const D1 = (0.6882 + 0.866) * S;  // pentagon apothem + hexagon apothem
const D2 = 2.72 * S;              // outer filler hexagons
const D3 = 3.108 * S;             // rim pentagons

function poly(cx: number, cy: number, r: number, n: number, rotDeg: number) {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (rotDeg + (i * 360) / n) * D2R;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

export default function Projects({ onModalToggle }: { onModalToggle: (open: boolean) => void }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [hot, setHot] = useState<number | null>(null);
  const [tip, setTip] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    onModalToggle(open !== null);
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onModalToggle]);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.set("[data-ball]", { x: "-58vw", rotation: -520, transformOrigin: "50% 50%" });
      gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 70%", end: "top 12%", scrub: 0.7 },
      }).to("[data-ball]", { x: 0, rotation: 0, ease: "none" });
      const bob = gsap.to("[data-ball]", {
        y: -10, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true,
      });
      const spin = gsap.to("[data-spin]", {
        rotation: 360, duration: 46, ease: "none", repeat: -1, svgOrigin: "0 0", paused: true,
      });
      ScrollTrigger.create({
        trigger: ref.current, start: "top 75%", end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) { bob.play(); spin.play(); }
          else { bob.pause(); spin.pause(); }
        },
      });
    },
    { scope: ref }
  );

  const p = open !== null ? PROJECTS[open] : null;

  return (
    <section id="projects" className={styles.section} ref={ref}>
      <h2 className="h2" data-reveal>Projects on <span className="stroke">the Ball</span></h2>
      <div className={styles.wrap}>
        <div className={styles.ballArea} data-reveal>
          <svg className={styles.ball} data-ball viewBox="-230 -230 460 460" role="group" aria-label="Football with projects on each hexagon">
            <defs>
              <clipPath id="ballclip"><circle r={RB} /></clipPath>
            </defs>
            <g clipPath="url(#ballclip)">
              <circle r={RB} fill="#0d0d0a" />
              <g data-spin>
              {/* outer filler hexagons */}
              {[0, 1, 2, 3, 4].map((k) => {
                const phi = -90 + k * 72;
                return (
                  <polygon key={`f${k}`} points={poly(Math.cos(phi * D2R) * D2, Math.sin(phi * D2R) * D2, S, 6, phi + 30)}
                    fill="#0d0d0a" stroke="#E0F11F" strokeWidth="3" strokeLinejoin="round" />
                );
              })}
              {/* rim pentagons */}
              {[0, 1, 2, 3, 4].map((k) => {
                const th = -54 + k * 72;
                return (
                  <polygon key={`p${k}`} points={poly(Math.cos(th * D2R) * D3, Math.sin(th * D2R) * D3, PENT_R, 5, th + 144)}
                    fill="#E0F11F" stroke="#E0F11F" strokeWidth="3" strokeLinejoin="round" />
                );
              })}
              </g>
              {/* project hexagons */}
              {PROJECTS.map((proj, i) => {
                const th = -54 + i * 72;
                const cx = Math.cos(th * D2R) * D1, cy = Math.sin(th * D2R) * D1;
                return (
                  <g key={proj.short}
                    className={`${styles.patch} ${hot === i ? styles.patchHot : ""}`}
                    data-cursor
                    onClick={() => setOpen(i)}
                    onMouseEnter={() => setTip(proj.title)}
                    onMouseLeave={() => setTip("")}
                  >
                    <polygon points={poly(cx, cy, S, 6, th + 30)} />
                    <text x={cx} y={cy - 4} fontSize="30">{`0${i + 1}`}</text>
                    <text x={cx} y={cy + 20} fontSize="13" letterSpacing=".06em">{proj.short.toUpperCase()}</text>
                  </g>
                );
              })}
              {/* center pentagon */}
              <g className={styles.penta}>
                <polygon points={poly(0, 0, PENT_R, 5, -90)} />
                <text x="0" y="6" fontSize="15" fontWeight="800" letterSpacing=".08em">PROJECTS</text>
              </g>
            </g>
            <circle r={RB} fill="none" stroke="#E0F11F" strokeWidth="3.5" />
          </svg>
          <div className={`${styles.tip} ${tip ? styles.tipOn : ""}`}>{tip}</div>
        </div>
        <div>
          <div className={styles.list}>
            {PROJECTS.map((proj, i) => (
              <button key={proj.short} className={styles.item} data-reveal
                onClick={() => setOpen(i)}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
              >
                <span className={styles.num}>0{i + 1}</span>
                <span>
                  <h4>{proj.title}</h4>
                  <small>{proj.tags.slice(0, 3).join(" · ")}</small>
                </span>
              </button>
            ))}
          </div>
          <p className={styles.note}>
            Every hexagon on the ball holds one project — <b>click a patch</b> (or a card) to open it.
          </p>
        </div>
      </div>

      {mounted &&
        createPortal(
          <div className={`${styles.modal} ${p ? styles.modalOpen : ""}`} role="dialog" aria-modal="true">
            <div className={styles.backdrop} onClick={() => setOpen(null)} />
            {p && (
              <div className={styles.panel}>
                <button className={styles.close} aria-label="Close" onClick={() => setOpen(null)}>✕</button>
                <p className={styles.mEyebrow}>Project 0{(open ?? 0) + 1} / 05</p>
                <h3>{p.title}</h3>
                <div className={styles.tags}>{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <ul>{p.points.map((pt, i) => <li key={i}>{pt}</li>)}</ul>
                <a className="btn solid" href={p.link} target="_blank" rel="noopener">View on GitHub ↗</a>
              </div>
            )}
          </div>,
          document.body
        )}
    </section>
  );
}
