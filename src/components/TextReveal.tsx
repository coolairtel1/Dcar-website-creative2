"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, reducedMotion } from "@/lib/motion";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  children: React.ReactNode;
  delay?: number;
  /** play immediately (above the fold) instead of on scroll */
  immediate?: boolean;
};

// Lines slide up from a clip mask (SplitText lines + mask), dvo-style.
export default function TextReveal({ as: Tag = "h2", className, children, delay = 0, immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line" });
      gsap.from(split.lines, {
        yPercent: 105, duration: 1, stagger: 0.08, ease: "power3.out", delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 90%", once: true },
      });
    }, el);
    return () => { ctx.revert(); split?.revert(); };
  }, [delay, immediate]);
  return <Tag ref={ref as never} className={className}>{children}</Tag>;
}
