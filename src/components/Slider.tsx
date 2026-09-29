"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import Icon from "./Icon";

type Props = { children: React.ReactNode; title?: React.ReactNode; label: string; dark?: boolean };

// Horizontal scroll-snap slider with square arrow buttons and dvo's drag cursor (circle + arrows following the mouse).
export default function Slider({ children, title, label, dark }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    update();
    const el = track.current;
    const c = cursor.current;
    if (!el || !c || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(c, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(c, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
    const enter = (e: PointerEvent) => {
      gsap.set(c, { x: e.clientX, y: e.clientY });
      gsap.to(c, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out" });
    };
    const leave = () => gsap.to(c, { scale: 0, autoAlpha: 0, duration: 0.4, ease: "power2.out" });

    // drag-to-scroll
    let down = false, startX = 0, startLeft = 0, moved = false;
    const pd = (e: PointerEvent) => { down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft; el.style.scrollSnapType = "none"; gsap.to(c, { scale: 0.8, duration: 0.3 }); };
    const pm = (e: PointerEvent) => { if (!down) return; const dx = e.clientX - startX; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = startLeft - dx; };
    const pu = () => { if (!down) return; down = false; el.style.scrollSnapType = ""; gsap.to(c, { scale: 1, duration: 0.3 }); };
    const click = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", pd);
    window.addEventListener("pointermove", pm);
    window.addEventListener("pointerup", pu);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointermove", pm);
      window.removeEventListener("pointerup", pu);
      el.removeEventListener("click", click, true);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 16 : el.clientWidth * 0.8), behavior: "smooth" });
  };

  const sq = dark ? "btn-square btn-square-light" : "btn-square";

  return (
    <div>
      <div className="flex items-end justify-between gap-6 px-g pb-6">
        {title}
        <div className="flex gap-2">
          <button className={`${sq} disabled:opacity-30`} disabled={edges.start} onClick={() => go(-1)} aria-label="Trước"><Icon name="arrowLeft" size={14} /></button>
          <button className={`${sq} disabled:opacity-30`} disabled={edges.end} onClick={() => go(1)} aria-label="Sau"><Icon name="arrow" size={14} /></button>
        </div>
      </div>
      <div
        ref={track}
        onScroll={update}
        role="region"
        aria-label={label}
        data-lenis-prevent-wheel
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-g pb-2 select-none [scrollbar-width:none] md:cursor-none [&::-webkit-scrollbar]:hidden [&_a]:md:cursor-none [&_img]:pointer-events-none"
      >
        {children}
      </div>
      <div
        ref={cursor}
        aria-hidden
        className={`pointer-events-none invisible fixed left-0 top-0 z-30 -ml-11 -mt-11 flex h-22 w-22 scale-0 items-center justify-center gap-5 rounded-full opacity-0 ${dark ? "bg-surface text-ink" : "bg-ink text-surface"}`}
      >
        <Icon name="arrowLeft" size={14} />
        <Icon name="arrow" size={14} />
      </div>
    </div>
  );
}
