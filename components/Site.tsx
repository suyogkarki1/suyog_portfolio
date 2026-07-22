"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollSmoother, useGSAP, prefersReduced } from "@/lib/gsapSetup";
// import Cursor from "./Cursor";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import TechStack from "./TechStack";
import Projects from "./Projects";
import Values from "./Values";
import Contact, { Footer } from "./Contact";

const SECTION_IDS = ["home", "about", "stack", "projects", "values", "contact"];

/**
 * Orchestrates the page: ScrollSmoother (replaces the HTML build's Lenis),
 * scroll reveals, nav active-section tracking, smooth anchor navigation,
 * and pausing the smoother while any modal is open.
 */
export default function Site() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const [active, setActive] = useState("home");

  useGSAP(
    () => {
      if (!prefersReduced()) {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.1,
          effects: false,
        });
      }

      // scroll reveals — onEnter-based so a trigger firing can never leave an
      // element half-faded, plus a safety sweep that force-reveals anything
      // visible but still hidden (guards against refresh-order edge cases)
      const reveal = (el: HTMLElement) =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", overwrite: "auto" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el, start: "top 92%", once: true,
          onEnter: () => reveal(el),
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
      const sweep = () => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const visible = r.top < window.innerHeight && r.bottom > 0;
          if (visible && !gsap.isTweening(el) && parseFloat(getComputedStyle(el).opacity) < 0.9) {
            reveal(el);
          }
        });
      };
      const sweepA = gsap.delayedCall(1.5, sweep);
      const sweepB = gsap.delayedCall(3.5, sweep);

      // nav active tracking
      SECTION_IDS.forEach((id) => {
        ScrollTrigger.create({
          trigger: "#" + id,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => { if (self.isActive) setActive(id); },
        });
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        sweepA.kill();
        sweepB.kill();
        window.removeEventListener("load", onLoad);
        smootherRef.current?.kill();
        smootherRef.current = null;
      };
    },
    { scope: scopeRef }
  );

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (smootherRef.current) smootherRef.current.scrollTo(el, true);
    else el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth" });
    history.replaceState(null, "", "#" + id);
  }, []);

  const onModalToggle = useCallback((open: boolean) => {
    smootherRef.current?.paused(open);
  }, []);

  return (
    <div ref={scopeRef}>
      <Nav active={active} goTo={goTo} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero goTo={goTo} />
            <About onModalToggle={onModalToggle} />
            <TechStack />
            <Projects onModalToggle={onModalToggle} />
            <Values goTo={goTo} />
            <Contact />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
