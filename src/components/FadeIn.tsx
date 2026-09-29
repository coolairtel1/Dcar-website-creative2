"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";

// Children fade up in sequence when the group enters the viewport.
export default function FadeIn({ children, className = "", stagger = 0.08, y = 30 }: { children: React.ReactNode; className?: string; stagger?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(el.children, { y, opacity: 0, duration: 1, stagger, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    }, el);
    return () => ctx.revert();
  }, [stagger, y]);
  return <div ref={ref} className={className}>{children}</div>;
}
