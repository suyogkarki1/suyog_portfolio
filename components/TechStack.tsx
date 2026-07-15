"use client";

import { useRef } from "react";
import { STACK, type StackIcon } from "@/lib/data";
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from "@/lib/gsapSetup";
import { SqlIcon, PbiIcon, XlsIcon } from "./Icons";
import styles from "@/styles/Stack.module.css";

function Icon({ icon }: { icon: StackIcon }) {
  switch (icon.kind) {
    case "img": return <img src={icon.src} alt="" loading="lazy" />;
    case "sql": return <SqlIcon />;
    case "pbi": return <PbiIcon />;
    case "xls": return <XlsIcon />;
    case "cv": return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="https://cdn.simpleicons.org/opencv" alt="" loading="lazy" />
    );
  }
}

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((row) => {
        const fill = row.querySelector<HTMLElement>("[data-fill]")!;
        const pct = row.querySelector<HTMLElement>("[data-pct]")!;
        const n = +row.dataset.bar!;
        ScrollTrigger.create({
          trigger: row, start: "top 85%", once: true,
          onEnter: () => {
            gsap.to(fill, { width: n + "%", duration: 1.4, ease: "power3.out" });
            const counter = { v: 0 };
            gsap.to(counter, {
              v: n, duration: 1.4, ease: "power3.out",
              onUpdate: () => { pct.textContent = Math.round(counter.v) + "%"; },
            });
          },
        });
        row.addEventListener("mouseenter", () => {
          if (prefersReduced()) return;
          gsap.fromTo(fill, { width: n - 12 + "%" }, { width: n + "%", duration: 0.7, ease: "elastic.out(1,0.5)" });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="stack" ref={ref}>
      <h2 className="h2" data-reveal>Tech <span className="stroke">Stack</span></h2>
      <div className={styles.bars}>
        {STACK.map((s) => (
          <div key={s.name} className={styles.row} data-bar={s.pct}>
            <div className={styles.top}>
              <span className={styles.name}>
                <i className={styles.ico}><Icon icon={s.icon} /></i>
                {s.name}
              </span>
              <span className={styles.pct} data-pct>0%</span>
            </div>
            <div className={styles.track}><div className={styles.fill} data-fill /></div>
          </div>
        ))}
      </div>
      <p className={styles.note} data-reveal>
        Currently learning: <b>Object Detection — OpenCV · YOLO · OCR</b>
      </p>
    </section>
  );
}
