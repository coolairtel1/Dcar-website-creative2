"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, SplitText, ScrollTrigger, scroller } from "@/lib/motion";
import { TLink } from "./Transition";
import Media from "./Media";
import Icon from "./Icon";
import type { heroSlides as Slides } from "@/content/site";

const DURATION = 7000;

// dvo home hero: full-bleed crossfading slides, 120px light title, bottom bar with arrows, numbered tabs + progress, scroll-down button.
export default function HeroSlider({ slides }: { slides: typeof Slides }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const go = useCallback((i: number) => setActive((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const t = setTimeout(() => go(active + 1), DURATION);
    return () => clearTimeout(t);
  }, [active, go]);

  // Title lines + copy rise in for the active slide
  useEffect(() => {
    const slide = root.current?.querySelector<HTMLElement>(`[data-slide="${active}"]`);
    if (!slide) return;
    let split: SplitText | undefined;
    // context.revert() restores inline styles, so a re-run never starts from a half-hidden state
    const ctx = gsap.context(() => {
      split = SplitText.create(slide.querySelector("h1")!, { type: "lines", mask: "lines" });
      gsap.timeline({ delay: 0.15 })
        .from(split.lines, { yPercent: 105, duration: 1.1, stagger: 0.08, ease: "power3.out" })
        .from(slide.querySelectorAll("[data-fade]"), { y: 16, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.25);
    }, slide);
    return () => { ctx.revert(); split?.revert(); };
  }, [active]);

  // Parallax on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-media]", { yPercent: 18, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  const next = () => {
    const y = (root.current?.offsetHeight ?? 0) + (root.current?.offsetTop ?? 0);
    if (scroller.lenis) scroller.lenis.scrollTo(y - 76);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section ref={root} className="relative h-svh min-h-[640px] overflow-hidden bg-ink text-surface">
      <div data-hero-media className="absolute inset-0">
        {slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-dvo ${i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`} aria-hidden={i !== active}>
            <Media item={s.image} priority={i === 0} position="60% 50%" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />
      </div>

      {slides.map((s, i) => (
        <div
          key={i}
          data-slide={i}
          className={`absolute inset-x-g bottom-[112px] transition-opacity duration-500 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <p data-fade className="t-label mb-5">{s.eyebrow}</p>
          <h1 className="t-display max-w-[1100px]">{s.title}</h1>
          <div data-fade className="mt-6 flex flex-wrap items-center gap-5">
            <p className="t-lead max-w-2xl">{s.text}</p>
            <TLink href={i === 1 ? "/san-pham" : "/lien-he"} className="btn btn-light">{i === 1 ? "Khám phá sản phẩm" : "Nhận tư vấn"}</TLink>
          </div>
        </div>
      ))}

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 flex h-[66px] items-center border-t border-surface/60">
        <div className="flex h-full items-center gap-3 border-r border-surface/60 px-g">
          <button onClick={() => go(active - 1)} className="btn-square btn-square-light" aria-label="Slide trước"><Icon name="arrowLeft" size={14} /></button>
          <button onClick={() => go(active + 1)} className="btn-square btn-square-light" aria-label="Slide sau"><Icon name="arrow" size={14} /></button>
        </div>
        <div className="flex h-full flex-1 items-center gap-8 overflow-x-auto px-g [scrollbar-width:none]">
          {slides.map((s, i) => (
            <button key={i} onClick={() => go(i)} className={`t-label relative whitespace-nowrap py-2 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-50 hover:opacity-80"}`}>
              {i + 1}.&nbsp;&nbsp;{s.tab}
              <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                {i === active && <span key={active} className="block h-full origin-left bg-surface" style={{ animation: `progress ${DURATION}ms linear forwards` }} />}
              </span>
            </button>
          ))}
        </div>
        <div className="px-g">
          <button onClick={next} className="btn-square btn-square-light" aria-label="Cuộn xuống"><Icon name="arrowDown" size={14} /></button>
        </div>
      </div>
    </section>
  );
}
