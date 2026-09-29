"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";
import Media from "./Media";
import type { MediaItem } from "@/content/site";

type Props = { item: MediaItem; className?: string; sizes?: string; position?: string; priority?: boolean; hoverZoom?: boolean };

// dvo image reveal: clip-path polygon opens from a 2% inset while the image scales 1.15 → 1, scrubbed.
export default function RevealImage({ item, className = "", sizes, position, priority, hoverZoom }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const img = el.querySelector("img");
    const top = el.getBoundingClientRect().top + window.scrollY;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: top >= 100 ? "top bottom" : "top top", end: "bottom top", scrub: 0.4 },
    });
    tl.fromTo(el, { clipPath: "polygon(2% 2%, 98% 2%, 98% 98%, 2% 98%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none", duration: 0.5 }, 0)
      .fromTo(img, { scale: 1.15 }, { scale: 1, ease: "none", duration: 1 }, 0);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);
  return (
    <div ref={ref} className={`relative overflow-hidden bg-line-soft ${hoverZoom ? "group/img" : ""} ${className}`}>
      <div className={`absolute inset-0 ${hoverZoom ? "transition-transform duration-[800ms] ease-dvo group-hover/img:scale-[1.04]" : ""}`}>
        <Media item={item} sizes={sizes} position={position} priority={priority} />
      </div>
    </div>
  );
}
