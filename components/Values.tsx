"use client";

import { useRef } from "react";
import { VALUES } from "@/lib/data";
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from "@/lib/gsapSetup";
import { Glyph } from "./ValueGlyphs";
import styles from "@/styles/Values.module.css";

/**
 * 10 Values — pinned horizontal scroll on desktop, native vertical stack on
 * mobile. Each card's glyph animation is built as its own paused timeline and
 * only PLAYS while that card is near screen-centre, so at most one or two
 * glyphs animate at a time instead of all ten. That keeps the section smooth
 * even on mid-range phones while preserving the animations.
 */
export default function Values({ goTo }: { goTo: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current!;
      const isMobile = window.matchMedia("(max-width: 860px)").matches;
      const getScroll = () => track.scrollWidth - window.innerWidth;

      // Desktop: pin + drive the track horizontally. Mobile: cards stack and
      // scroll natively (media query in Values.module.css), no pin at all.
      if (!isMobile) {
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
      }

      if (prefersReduced()) return;

      /**
       * Build one paused timeline per card, scoped to that card only via `q`
       * (a scoped selector). Returns the timeline, or null if the card has no
       * animatable glyph.
       */
      const buildCardTimeline = (card: HTMLElement): gsap.core.Timeline | null => {
        const q = gsap.utils.selector(card);
        const tl = gsap.timeline({ repeat: -1, paused: true });
        let hasAny = false;
        const has = (sel: string) => card.querySelector(sel) !== null;

        // g1 — orbiting question marks
        if (has(".orbit")) { hasAny = true; tl.to(q(".orbit"), { rotation: 360, duration: 14, ease: "none" }, 0); }

        // g2 — context word swap (%, °C, YEARS…)
        if (has(".ctx-word")) {
          hasAny = true;
          const el = card.querySelector<SVGTextElement>(".ctx-word")!;
          const words = ["%", "°C", "YEARS", "RECORDS", "SAMPLES"];
          words.forEach((w, i) => {
            const at = i * 1.6;
            tl.to(el, { opacity: 0, y: -8, duration: 0.25 }, at)
              .add(() => { el.textContent = w; el.setAttribute("font-size", w.length > 2 ? "14" : "21"); })
              .to(el, { opacity: 1, y: 0, duration: 0.25 });
          });
        }

        // g3 — falling drops
        if (has(".drop")) {
          hasAny = true;
          q(".drop").forEach((d, i) => {
            const mut = d.classList.contains("g-mutf");
            tl.fromTo(d, { y: -10 }, { y: 150, duration: 1.6, ease: "power1.in", opacity: mut ? 0 : 1, repeat: -1, delay: i * 0.35 }, 0);
          });
        }

        // g4 — gearbox + lever
        if (has(".gearbox")) { hasAny = true; tl.to(q(".gearbox"), { opacity: 0.25, duration: 1.2, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0); }
        if (has(".lever-knob")) { hasAny = true; tl.to(q(".lever-knob"), { y: -14, duration: 1.2, yoyo: true, repeat: -1, ease: "back.inOut(2)" }, 0); }

        // g5 — evidence curve + points
        if (has(".ev-curve")) { hasAny = true; tl.to(q(".ev-curve"), { strokeDashoffset: 0, duration: 2.2, repeat: -1, repeatDelay: 1.2, ease: "power2.inOut" }, 0); }
        if (has(".pt")) { hasAny = true; tl.to(q(".pt"), { y: -6, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.12 }, 0); }

        // g6 — flip card
        if (has(".flipcard")) {
          hasAny = true;
          tl.to(q(".flipcard"), { scaleX: 0, duration: 0.4, ease: "power2.in", delay: 1.2 })
            .set(q(".flip-front"), { opacity: 0 }).set(q(".flip-back"), { opacity: 1 })
            .to(q(".flipcard"), { scaleX: 1, duration: 0.4, ease: "power2.out" })
            .to(q(".flipcard"), { scaleX: 0, duration: 0.4, ease: "power2.in", delay: 1.6 })
            .set(q(".flip-front"), { opacity: 1 }).set(q(".flip-back"), { opacity: 0 })
            .to(q(".flipcard"), { scaleX: 1, duration: 0.4, ease: "power2.out" });
        }

        // g7 — route
        if (has(".route")) { hasAny = true; tl.to(q(".route"), { strokeDashoffset: 0, duration: 2.4, repeat: -1, repeatDelay: 1, ease: "power1.inOut" }, 0); }

        // g8 — inner gear + doors
        if (has(".inner-gear")) { hasAny = true; tl.to(q(".inner-gear"), { rotation: 360, duration: 5, repeat: -1, ease: "none" }, 0); }
        if (has(".doorL")) {
          hasAny = true;
          tl.to(q(".doorL"), { x: -82, duration: 0.9, ease: "power3.inOut", delay: 0.8 })
            .to(q(".doorR"), { x: 82, duration: 0.9, ease: "power3.inOut" }, "<")
            .to(q(".doorL"), { x: 0, duration: 0.9, ease: "power3.inOut", delay: 1.6 })
            .to(q(".doorR"), { x: 0, duration: 0.9, ease: "power3.inOut" }, "<");
        }

        // g9 — rows fade to people
        if (has(".rows9")) {
          hasAny = true;
          tl.to(q(".rows9"), { opacity: 0.15, duration: 1.4, ease: "sine.inOut", delay: 1 })
            .to(q(".people9"), { opacity: 1, duration: 1.4, ease: "sine.inOut" }, "<.3")
            .to(q(".people9"), { opacity: 0, duration: 1.2, delay: 1.6 })
            .to(q(".rows9"), { opacity: 1, duration: 1.2 }, "<");
        }

        // g10 — orbiter on the infinity loop
        const loopPath = card.querySelector<SVGPathElement>(".loop10");
        const orb = card.querySelector<SVGCircleElement>(".orb10");
        if (loopPath && orb) {
          hasAny = true;
          const L = loopPath.getTotalLength();
          const prog = { t: 0 };
          tl.to(prog, {
            t: 1, duration: 6, repeat: -1, ease: "none",
            onUpdate: () => {
              const pt = loopPath.getPointAtLength(prog.t * L);
              orb.setAttribute("cx", String(pt.x));
              orb.setAttribute("cy", String(pt.y));
            },
          }, 0);
        }

        return hasAny ? tl : null;
      };

      // One timeline per card, each toggled by that card's own visibility.
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`, ref.current);
      cards.forEach((card) => {
        const tl = buildCardTimeline(card);
        if (!tl) return;
        ScrollTrigger.create({
          trigger: card,
          start: "left right",
          end: "right left",
          horizontal: !isMobile,
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause(0)),
        });
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