"use client";

import { useEffect, useRef } from "react";
import { gsap, scroller } from "@/lib/motion";

// dvo preloader: ink columns with the wordmark rising in, then columns clip away upward.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (sessionStorage.getItem("dcar-dvo-intro")) {
      el.remove();
      return;
    }
    scroller.lenis?.stop();
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            sessionStorage.setItem("dcar-dvo-intro", "1");
            scroller.lenis?.start();
            el.style.display = "none";
          },
        })
        .from("[data-logo] span", { yPercent: 110, duration: 0.9, stagger: 0.06, ease: "power3.out" })
        .to("[data-logo]", { opacity: 0, duration: 0.4 }, "+=0.5")
        .to("[data-col]", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, stagger: 0.05, ease: "power2.inOut" }, "-=0.1");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[100] grid grid-cols-3" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} data-col className="block h-full bg-ink" style={{ clipPath: "inset(0% 0% 0% 0%)" }} />
      ))}
      <div data-logo className="absolute inset-0 flex items-center justify-center overflow-hidden text-surface">
        <p className="flex overflow-hidden text-6xl font-light tracking-tight">
          {"dcar_".split("").map((c, i) => <span key={i} className="inline-block">{c}</span>)}
        </p>
      </div>
    </div>
  );
}
