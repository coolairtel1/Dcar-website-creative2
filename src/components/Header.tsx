"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, scroller } from "@/lib/motion";
import { TLink } from "./Transition";
import Media from "./Media";
import Icon from "./Icon";
import { clientShowcase, company, products, solutions, tel } from "@/content/site";

type Panel = "products" | "clients" | "menu" | null;

const featuredClients = clientShowcase.slice(0, 3);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Panel>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation / Esc
  useEffect(() => {
    const close = () => setOpen(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("dcar:navigate", close);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("dcar:navigate", close);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Open / switch / close animation
  const prev = useRef<Panel>(null);
  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;
    const was = prev.current;
    prev.current = open;

    if (open) {
      scroller.lenis?.stop();
      const items = panel.querySelectorAll(`[data-panel="${open}"] [data-mi]`);
      const tl = gsap.timeline();
      if (!was) {
        gsap.set(panel, { display: "block" });
        tl.fromTo(panel, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power3.inOut" }, 0)
          .to(overlay, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0);
      }
      tl.fromTo(items, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.035, ease: "power3.out" }, was ? 0 : 0.25);
      return () => { tl.kill(); };
    }
    if (was) {
      scroller.lenis?.start();
      const tl = gsap.timeline({ onComplete: () => { gsap.set(panel, { display: "none" }); } })
        .to(panel, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: "power3.inOut" }, 0)
        .to(overlay, { autoAlpha: 0, duration: 0.5 }, 0);
      return () => { tl.progress(1); };
    }
  }, [open]);

  const toggle = (p: Exclude<Panel, null>) => setOpen((cur) => (cur === p ? null : p));

  const ink = overHero ? "text-surface" : "text-ink";

  return (
    <>
      <div
        ref={overlayRef}
        onClick={() => setOpen(null)}
        className="invisible fixed inset-0 z-40 bg-ink/25 opacity-0 backdrop-blur-[14px]"
        aria-hidden
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-dvo ${scrolled && !open ? "-translate-y-[var(--topbar-h)]" : ""}`}
      >
        {/* Utility bar */}
        <div className={`flex h-[var(--topbar-h)] items-center justify-between border-b px-g text-[11px] transition-colors duration-500 ${overHero ? "border-surface/30 text-surface/80" : "border-line bg-bg text-muted"}`}>
          <div className="flex h-full items-center">
            <span className="pr-4">Thiết kế & sản xuất tại Việt Nam</span>
            <span className={`hidden h-full items-center border-l px-4 font-medium md:flex ${overHero ? "border-surface/30 text-surface" : "border-line text-ink"}`}>17+ năm kinh nghiệm</span>
          </div>
          <div className="flex h-full items-center gap-5 font-medium">
            <TLink href="/lien-he" className="transition-opacity hover:opacity-60">Liên hệ</TLink>
            <a href={tel} className="transition-opacity hover:opacity-60">Hotline {company.hotline}</a>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`relative flex h-[var(--nav-h)] items-center justify-between border-b px-g transition-colors duration-500 ${ink} ${
            overHero ? "border-surface/20 bg-gradient-to-b from-ink/30 to-transparent backdrop-blur-[2px]" : "border-line bg-bg"
          }`}
        >
          <TLink href="/" className="text-[34px] font-normal leading-none tracking-tight" aria-label="DCAR — Trang chủ">
            dcar<span className="inline-block w-[0.5em] translate-y-[0.08em] border-b-[3px] border-current" />
          </TLink>

          <nav className="flex items-center gap-7 text-[17px] font-light">
            {(
              [
                ["products", "Sản phẩm"],
                ["clients", "Khách hàng"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                aria-expanded={open === key}
                className="hidden items-center gap-1.5 lg:flex"
              >
                {label}
                <Icon name="arrowDown" size={16} className={`transition-transform duration-500 ease-dvo ${open === key ? "rotate-180" : ""}`} />
              </button>
            ))}
            <TLink href="/lien-he" className="hidden lg:block">Liên hệ</TLink>
            <TLink href="/lien-he" className={`btn hidden lg:inline-flex ${overHero ? "btn-light" : ""}`}>Nhận tư vấn</TLink>
            <button onClick={() => toggle("menu")} aria-expanded={open === "menu"} className="flex items-center gap-3">
              <span className="t-label">{open === "menu" ? "Đóng" : "Menu"}</span>
              <span className="relative block h-3.5 w-6">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-dvo ${
                      open === "menu"
                        ? i === 1 ? "top-1/2 opacity-0" : `top-1/2 ${i === 0 ? "rotate-45" : "-rotate-45"}`
                        : ["top-0", "top-1/2", "top-full"][i]
                    }`}
                  />
                ))}
              </span>
            </button>
          </nav>
        </div>

        {/* Mega menu panels */}
        <div ref={panelRef} className="hidden max-h-[calc(100svh-var(--topbar-h)-var(--nav-h))] overflow-y-auto border-b border-line bg-bg" data-lenis-prevent>
          {/* Sản phẩm */}
          <div data-panel="products" className={open === "products" ? "relative grid md:grid-cols-3" : "hidden"}>
            <div data-mi className="relative hidden aspect-[4/3] md:block md:aspect-auto">
              {products.map((p, i) => (
                <div key={p.slug} className={`absolute inset-0 transition-opacity duration-700 ease-dvo ${hover === i ? "opacity-100" : "opacity-0"}`}>
                  <Media item={p.image} sizes="33vw" />
                </div>
              ))}
            </div>
            <div className="border-line p-g py-10 md:border-l">
              <p data-mi className="t-label mb-6">Dòng xe</p>
              <ul>
                {products.map((p, i) => (
                  <li key={p.slug} data-mi>
                    <TLink
                      href={`/san-pham/${p.slug}`}
                      onMouseEnter={() => setHover(i)}
                      className="t-menu group flex items-center gap-3 py-0.5 transition-opacity hover:opacity-100 [ul:hover_&]:opacity-40"
                    >
                      {p.name}
                      <Icon name="arrow" size={22} className="-translate-x-2 opacity-0 transition-all duration-500 ease-dvo group-hover:translate-x-0 group-hover:opacity-100" />
                    </TLink>
                  </li>
                ))}
              </ul>
              <p data-mi className="t-body mt-6 max-w-xs text-muted">{products[hover].tagline}</p>
            </div>
            <div className="flex flex-col justify-between border-line p-g py-10 md:border-l">
              <div>
                <p data-mi className="t-label mb-6">Giải pháp cho doanh nghiệp</p>
                <ul className="space-y-2">
                  {solutions.map((s) => (
                    <li key={s.title} data-mi className="t-body flex items-center gap-3">
                      <Icon name={s.icon} size={18} className="text-muted" />{s.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-mi className="mt-10">
                <TLink href="/san-pham" className="btn-link">Tất cả sản phẩm</TLink>
              </div>
            </div>
          </div>

          {/* Khách hàng */}
          <div data-panel="clients" className={open === "clients" ? "grid md:grid-cols-3" : "hidden"}>
            <div className="flex flex-col justify-between p-g py-10">
              <div>
                <p data-mi className="t-label mb-4">Khách hàng DCAR</p>
                <p data-mi className="t-h2 max-w-xs">Đồng hành cùng doanh nghiệp</p>
              </div>
              <div data-mi className="mt-10">
                <TLink href="/khach-hang" className="btn-link">Tất cả khách hàng</TLink>
              </div>
            </div>
            <div className="grid gap-4 border-line p-g py-10 sm:grid-cols-3 md:col-span-2 md:border-l">
              {featuredClients.map((c, i) => (
                <TLink key={i} href="/khach-hang" data-mi className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Media item={c.image} sizes="22vw" className="transition-transform duration-[800ms] ease-dvo group-hover:scale-[1.04]" />
                  </div>
                  <p className="mt-3 text-[11px] text-muted">{c.model}</p>
                  <p className="text-[19px] font-light">{c.client}</p>
                  <span className="btn-link mt-3">Xem</span>
                </TLink>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div data-panel="menu" className={open === "menu" ? "grid md:grid-cols-4" : "hidden"}>
            <div className="p-g py-10 md:col-span-2">
              <p data-mi className="t-label mb-6">Chào mừng đến DCAR</p>
              {[
                ["/", "Trang chủ"],
                ["/san-pham", "Sản phẩm"],
                ["/khach-hang", "Khách hàng"],
                ["/lien-he", "Liên hệ"],
              ].map(([href, label]) => (
                <div key={href} data-mi>
                  <TLink
                    href={href}
                    className={`group flex items-center gap-4 text-[clamp(40px,4vw,56px)] font-light leading-[1.1] ${pathname === href ? "" : "text-ink/80 hover:text-ink"}`}
                  >
                    {label}
                    <Icon name="arrow" size={26} className="opacity-0 transition-all duration-500 ease-dvo group-hover:translate-x-1 group-hover:opacity-40" />
                  </TLink>
                </div>
              ))}
            </div>
            <div className="border-line p-g py-10 md:border-l">
              <p data-mi className="t-label mb-6">Khám phá dòng xe</p>
              {products.map((p) => (
                <div key={p.slug} data-mi>
                  <TLink href={`/san-pham/${p.slug}`} className="t-menu block transition-opacity hover:opacity-50">{p.name.replace("DCAR ", "")}</TLink>
                </div>
              ))}
            </div>
            <div className="border-line p-g py-10 md:border-l">
              <p data-mi className="t-label mb-6">Hỗ trợ dự án</p>
              <div data-mi><TLink href="/lien-he" className="t-menu block transition-opacity hover:opacity-50">Nhận tư vấn</TLink></div>
              <div data-mi><TLink href="/lien-he" className="t-menu block transition-opacity hover:opacity-50">Showroom</TLink></div>
              <div data-mi><a href={tel} className="t-menu block transition-opacity hover:opacity-50">Hotline</a></div>
              <div data-mi><a href={`mailto:${company.email}`} className="t-menu block transition-opacity hover:opacity-50">Email</a></div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line p-g py-6 md:col-span-2 md:col-start-3 md:border-l">
              <p data-mi className="t-label">Theo dõi DCAR</p>
              <div data-mi className="flex gap-5 text-[19px] font-light text-muted">
                {["Facebook", "YouTube", "LinkedIn"].map((s) => (
                  <a key={s} href="#" className="transition-colors hover:text-ink">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
