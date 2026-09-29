"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, scroller, reducedMotion } from "@/lib/motion";

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });

// dvo/Barba-style page transition: three ink columns rise from the bottom, the page drifts up,
// route changes underneath, then the columns retract upward while the new page settles from below.
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const covered = useRef(false);
  const busy = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) {
        scroller.lenis?.scrollTo(url.hash || 0);
        return;
      }
      if (busy.current) return;
      if (reducedMotion() || !overlay.current) {
        router.push(href);
        return;
      }
      busy.current = true;
      document.dispatchEvent(new Event("dcar:navigate"));
      const cols = overlay.current.children;
      gsap
        .timeline({
          onComplete: () => {
            covered.current = true;
            router.push(href);
          },
        })
        .set(overlay.current, { autoAlpha: 1 })
        .fromTo(cols, { scaleY: 0 }, { scaleY: 1, duration: 0.8, stagger: 0.05, ease: "power2.in", transformOrigin: "center bottom" }, 0)
        .to("#main", { y: -50, duration: 0.8, ease: "power2.in" }, 0);
    },
    [router],
  );

  useEffect(() => {
    if (!covered.current || !overlay.current) return;
    covered.current = false;
    scroller.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const cols = overlay.current.children;
    const tl = gsap
      .timeline({
        delay: 0.1,
        onStart: () => ScrollTrigger.refresh(),
        onComplete: () => {
          busy.current = false;
          gsap.set(overlay.current, { autoAlpha: 0 });
        },
      })
      .to(cols, { scaleY: 0, duration: 0.8, stagger: 0.05, ease: "power2.out", transformOrigin: "center top" }, 0)
      .fromTo("#main", { y: 50 }, { y: 0, duration: 0.8, ease: "power2.out", clearProps: "transform" }, 0);
    return () => { tl.progress(1); };
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={overlay} aria-hidden className="pointer-events-none invisible fixed inset-0 z-[90] grid grid-cols-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-full scale-y-0 bg-ink" />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);

type TLinkProps = React.ComponentProps<typeof Link> & { href: string };

// Drop-in <Link> that plays the column transition for internal routes.
export function TLink({ href, onClick, ...rest }: TLinkProps) {
  const { navigate } = useTransition();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) return;
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
