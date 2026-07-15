"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";

/** Yellow dot cursor that grows over interactive elements. Hidden on touch. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const move = (e: MouseEvent) => {
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power2.out" });
    };
    const over = (e: MouseEvent) => {
      const hot = (e.target as Element).closest?.("a,button,[data-cursor]");
      el.style.width = hot ? "40px" : "14px";
      el.style.height = hot ? "40px" : "14px";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}
