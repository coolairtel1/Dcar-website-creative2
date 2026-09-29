"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";

// dvo ".lines": 1px column dividers at 1/3 and 2/3 that draw downward as the section scrolls through 60% of the viewport.
export default function GridLines({ cols = [33.3333, 66.6667], className = "" }: { cols?: number[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const tween = gsap.fromTo(el, { "--progress": 0 }, {
      "--progress": 1, ease: "none",
      scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 60%", scrub: 0.1 },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <div ref={ref} aria-hidden className={`grid-lines hidden md:block ${className}`}>
      {cols.map((c) => <i key={c} style={{ left: `${c}%` }} />)}
    </div>
  );
}
