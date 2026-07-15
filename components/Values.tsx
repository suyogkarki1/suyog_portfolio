"use client";

import { useRef } from "react";
import { VALUES } from "@/lib/data";
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from "@/lib/gsapSetup";
import { Glyph } from "./ValueGlyphs";
import styles from "@/styles/Values.module.css";

/**
 * 10 Values — pinned section where vertical scroll drives the track
 * horizontally. Each panel carries a looping animated glyph.
 */
export default function Values({ goTo }: { goTo: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current!;
      const getScroll = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: "[data-pin]",
          start: "top top",
          end: () => "+=" + getScroll(),
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fillRef.current) fillRef.current.style.width = self.progress * 100 + "%";
          },
        },
      });

      if (prefersReduced()) return;

      /* ---- glyph loops: collected so they pause when the section is off-screen ---- */
      const loops: (gsap.core.Tween | gsap.core.Timeline)[] = [];
      let valuesActive = true;

      loops.push(gsap.to(".orbit", { rotation: 360, duration: 14, repeat: -1, ease: "none" }));

      const words = ["%", "°C", "YEARS", "RECORDS", "SAMPLES"];
      let wi = 0;
      const cycle = () => {
        if (!valuesActive) { gsap.delayedCall(1, cycle); return; }
        const el = ref.current?.querySelector<SVGTextElement>(".ctx-word");
        if (!el) return;
        wi = (wi + 1) % words.length;
        gsap.timeline({ onComplete: () => gsap.delayedCall(1.1, cycle) })
          .to(el, { opacity: 0, y: -8, duration: 0.25 })
          .add(() => {
            el.textContent = words[wi];
            el.setAttribute("font-size", words[wi].length > 2 ? "14" : "21");
          })
          .to(el, { opacity: 1, y: 0, duration: 0.25 });
      };
      gsap.delayedCall(1.4, cycle);

      gsap.utils.toArray<SVGElement>(".drop").forEach((d, i) => {
        loops.push(gsap.fromTo(d, { y: -10 }, {
          y: 150, duration: 1.6, repeat: -1, delay: i * 0.35, ease: "power1.in",
          opacity: d.classList.contains("g-mutf") ? 0 : 1,
        }));
      });
      loops.push(gsap.to(".gearbox", { opacity: 0.25, duration: 1.2, yoyo: true, repeat: -1, ease: "sine.inOut" }));
      loops.push(gsap.to(".lever-knob", { y: -14, duration: 1.2, yoyo: true, repeat: -1, ease: "back.inOut(2)" }));
      loops.push(gsap.to(".ev-curve", { strokeDashoffset: 0, duration: 2.2, repeat: -1, repeatDelay: 1.2, ease: "power2.inOut" }));
      loops.push(gsap.to(".pt", { y: -6, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.12 }));
      loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.4 })
        .to(".flipcard", { scaleX: 0, duration: 0.4, ease: "power2.in", delay: 1.2 })
        .set(".flip-front", { opacity: 0 }).set(".flip-back", { opacity: 1 })
        .to(".flipcard", { scaleX: 1, duration: 0.4, ease: "power2.out" })
        .to(".flipcard", { scaleX: 0, duration: 0.4, ease: "power2.in", delay: 1.6 })
        .set(".flip-front", { opacity: 1 }).set(".flip-back", { opacity: 0 })
        .to(".flipcard", { scaleX: 1, duration: 0.4, ease: "power2.out" }));
      loops.push(gsap.to(".route", { strokeDashoffset: 0, duration: 2.4, repeat: -1, repeatDelay: 1, ease: "power1.inOut" }));
      loops.push(gsap.to(".inner-gear", { rotation: 360, duration: 5, repeat: -1, ease: "none" }));
      loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
        .to(".doorL", { x: -82, duration: 0.9, ease: "power3.inOut", delay: 0.8 })
        .to(".doorR", { x: 82, duration: 0.9, ease: "power3.inOut" }, "<")
        .to(".doorL", { x: 0, duration: 0.9, ease: "power3.inOut", delay: 1.6 })
        .to(".doorR", { x: 0, duration: 0.9, ease: "power3.inOut" }, "<"));
      loops.push(gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
        .to(".rows9", { opacity: 0.15, duration: 1.4, ease: "sine.inOut", delay: 1 })
        .to(".people9", { opacity: 1, duration: 1.4, ease: "sine.inOut" }, "<.3")
        .to(".people9", { opacity: 0, duration: 1.2, delay: 1.6 })
        .to(".rows9", { opacity: 1, duration: 1.2 }, "<"));

      // orbiter along the infinity loop
      const loopPath = ref.current?.querySelector<SVGPathElement>(".loop10");
      const orb = ref.current?.querySelector<SVGCircleElement>(".orb10");
      if (loopPath && orb) {
        const L = loopPath.getTotalLength();
        const prog = { t: 0 };
        loops.push(gsap.to(prog, {
          t: 1, duration: 6, repeat: -1, ease: "none",
          onUpdate: () => {
            const pt = loopPath.getPointAtLength(prog.t * L);
            orb.setAttribute("cx", String(pt.x));
            orb.setAttribute("cy", String(pt.y));
          },
        }));
      }

      // pause every loop while the section is off-screen
      ScrollTrigger.create({
        trigger: ref.current, start: "top bottom", end: "bottom top",
        onToggle: (self) => {
          valuesActive = self.isActive;
          loops.forEach((l) => (self.isActive ? l.play() : l.pause()));
        },
      });
    },
    { scope: ref }
  );

  return (
    <section id="values" className={styles.section} ref={ref}>
      <div className={styles.pin} data-pin>
        <div className={styles.head}>
          <h2 className={`h2 ${styles.title}`}>
            10 Values I Follow in <span className="stroke">Data Science &amp; ML</span>
          </h2>
        </div>
        <div className={styles.track} ref={trackRef}>
          {VALUES.map((v, i) => (
            <article key={v.glyph} className={styles.panel}>
              <div className={styles.num}>{String(i + 1).padStart(2, "0")}</div>
              <h3>{v.t}</h3>
              <div className={styles.glyph}><Glyph id={v.glyph} /></div>
              <p className={styles.line}>{v.line[0]}<b>{v.line[1]}</b>{v.line[2]}</p>
            </article>
          ))}
        </div>
        <div className={styles.progress}><i ref={fillRef} /></div>
        <button className={styles.skip} onClick={() => goTo("contact")}>
          Skip values — get in touch →
        </button>
      </div>
    </section>
  );
}
