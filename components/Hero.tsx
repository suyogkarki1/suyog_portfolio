"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from "@/lib/gsapSetup";
import { Socials } from "./Socials";
import styles from "@/styles/Hero.module.css";

interface Tile {
  tx: number; ty: number;
  x: number; y: number;
  rot: number; trot?: number;
  color: string; s: number; loose?: boolean;
}

/**
 * The Rubik's mosaic hero. A canvas covers the whole section; ~12k tiles
 * sampled from the portrait scatter across the page and assemble into the
 * reserved slot on the right (~4s). Click scatters & rebuilds; returning to
 * the hero after scrolling away replays the assembly.
 */
export default function Hero({ goTo }: { goTo: (id: string) => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReduced();
      const home = heroRef.current!;
      const canvas = canvasRef.current!;
      const slot = slotRef.current!;
      const ctx = canvas.getContext("2d")!;
      const mouse = { x: -9999, y: -9999 };
      let alive = true;
      let tiles: Tile[] = [];
      let asmTl: gsap.core.Timeline | null = null;
      let ready = false;
      let W = 0, H = 0;
      let heroActive = true;  // section in viewport?
      let needsDraw = true;   // one more frame after motion settles

      const render = () => {
        if (!heroActive) return;
        const busy = (asmTl?.isActive() ?? false) || mouse.x > -9000;
        if (!busy && !needsDraw) return; // idle: skip work entirely
        needsDraw = busy;
        ctx.clearRect(0, 0, W, H);
        for (const t of tiles) {
          let ox = 0, oy = 0;
          if (ready) {
            const dx = t.tx - mouse.x, dy = t.ty - mouse.y, d = Math.hypot(dx, dy);
            if (d < 60) { const f = ((60 - d) / 60) * 12; ox = (dx / d) * f; oy = (dy / d) * f; }
          }
          ctx.save();
          ctx.translate(t.x + ox + t.s / 2, t.y + oy + t.s / 2);
          ctx.rotate(t.rot);
          ctx.fillStyle = t.color;
          const s = t.s - 0.4;
          if (s > 9) { ctx.beginPath(); ctx.roundRect(-s / 2, -s / 2, s, s, 1.2); ctx.fill(); }
          else ctx.fillRect(-s / 2, -s / 2, s, s);
          ctx.restore();
        }
      };

      const assemble = () => {
        ready = false;
        asmTl?.kill();
        asmTl = gsap.timeline({ onComplete: () => { ready = true; } });
        asmTl.to(tiles, {
          x: (_i: number, t: Tile) => t.tx,
          y: (_i: number, t: Tile) => t.ty,
          rot: (_i: number, t: Tile) => (t.loose ? t.trot || 0 : 0),
          duration: reduced ? 0.01 : 2.2,
          ease: "power3.inOut",
          stagger: { each: reduced ? 0 : 0.00016, from: "random" },
        });
      };
      const scatter = () => {
        ready = false;
        asmTl?.kill();
        asmTl = gsap.timeline({ onComplete: assemble });
        asmTl.to(tiles, {
          x: () => Math.random() * W,
          y: () => Math.random() * H,
          rot: () => (Math.random() - 0.5) * Math.PI * 3,
          duration: 0.85, ease: "power2.in",
          stagger: { each: 0.00012, from: "center" },
        });
      };
      const replay = () => {
        ready = false;
        asmTl?.kill();
        tiles.forEach((t) => {
          t.x = Math.random() * W; t.y = Math.random() * H;
          t.rot = (Math.random() - 0.5) * Math.PI * 4;
        });
        assemble();
      };

      const img = new Image();
      img.src = "/portrait.jpg";
      img.onload = () => {
        if (!alive) return; // stale effect from StrictMode double-mount
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const hr = home.getBoundingClientRect();
        W = hr.width; H = hr.height;
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.scale(dpr, dpr);

        const sr = slot.getBoundingClientRect();
        const ox = sr.left - hr.left, oy = sr.top - hr.top;
        const SW = sr.width;

        const cols = 100, rows = Math.round(cols * (img.height / img.width));
        const off = document.createElement("canvas");
        off.width = cols; off.height = rows;
        const octx = off.getContext("2d")!;
        octx.drawImage(img, 0, 0, cols, rows);
        const data = octx.getImageData(0, 0, cols, rows).data;

        const cell = SW / cols;
        const bg = [212, 202, 188]; // paper tone of the artwork
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const i = (r * cols + c) * 4;
            const R = data[i], G = data[i + 1], B = data[i + 2];
            if (Math.hypot(R - bg[0], G - bg[1], B - bg[2]) < 23) continue;
            tiles.push({
              tx: ox + c * cell, ty: oy + r * cell,
              x: Math.random() * W, y: Math.random() * H,
              rot: (Math.random() - 0.5) * Math.PI * 4,
              color: `rgb(${R},${G},${B})`, s: cell,
            });
          }
        }
        const accents = ["#E0F11F", "#ffffff", "#2b52ff", "#e23c1e"];
        for (let k = 0; k < 16; k++) {
          tiles.push({
            tx: ox + (Math.random() * 1.3 - 0.15) * SW,
            ty: oy + (Math.random() * 1.3 - 0.15) * sr.height,
            x: Math.random() * W, y: Math.random() * H,
            rot: (Math.random() - 0.5) * 8, trot: (Math.random() - 0.5) * 1.2,
            color: accents[k % accents.length], s: cell * (2 + Math.random() * 2), loose: true,
          });
        }

        gsap.ticker.add(render);
        assemble();

        // sleep the whole engine while the hero is off-screen
        ScrollTrigger.create({
          trigger: home, start: "top bottom", end: "bottom top",
          onToggle: (self) => {
            heroActive = self.isActive;
            if (self.isActive) needsDraw = true;
          },
        });

        let leftHero = false;
        ScrollTrigger.create({
          trigger: home, start: "top top", end: "bottom 35%",
          onLeave: () => { leftHero = true; },
          onEnterBack: () => { if (leftHero) { leftHero = false; replay(); } },
        });
      };

      const onMove = (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      };
      const onLeave = () => { mouse.x = -9999; needsDraw = true; };
      home.addEventListener("mousemove", onMove);
      home.addEventListener("mouseleave", onLeave);
      slot.addEventListener("click", scatter);

      return () => {
        alive = false;
        gsap.ticker.remove(render);
        home.removeEventListener("mousemove", onMove);
        home.removeEventListener("mouseleave", onLeave);
        slot.removeEventListener("click", scatter);
      };
    },
    { scope: heroRef }
  );

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.left}>
        <p className="eyebrow" data-reveal>Data Science · Machine Learning</p>
        <h1 data-reveal>
          <span>Suyog</span>
          <span className={styles.yellow}>Karki</span>
        </h1>
        <p className={styles.sub} data-reveal>
          I build <b>end-to-end ML pipelines</b> turning messy, imbalanced,
          real-world data into models. Currently hunting for a{" "}
          <b>data science / ML internship</b>.
        </p>
        <div className={styles.ctas} data-reveal>
          <button className="btn solid" onClick={() => goTo("projects")}>View Projects</button>
          <a className="btn" href="/Suyog_Karki_CV.pdf" target="_blank" rel="noopener">My Resume</a>
        </div>
        <div data-reveal><Socials /></div>
      </div>
      <div className={styles.right}>
        <div
          ref={slotRef}
          className={styles.slot}
          data-cursor
          role="img"
          aria-label="Rubik's cube mosaic portrait of Suyog Karki"
        />
        <p className={styles.hint}><b>Click the portrait</b> to scatter &amp; rebuild</p>
      </div>
      <div className={styles.cue}>
        <span>Scroll</span>
        <span className={styles.cueBar}><i /></span>
      </div>
    </section>
  );
}
