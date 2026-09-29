"use client";

import { TLink } from "./Transition";
import Icon from "./Icon";
import { scroller } from "@/lib/motion";
import { company, products, tel } from "@/content/site";

const cols = [
  { title: "Khám phá DCAR", links: [["/", "Trang chủ"], ["/san-pham", "Sản phẩm"], ["/khach-hang", "Khách hàng"], ["/lien-he", "Liên hệ"]] },
  { title: "Dòng xe", links: products.map((p) => [`/san-pham/${p.slug}`, p.name]) },
  { title: "Liên hệ", links: [["/lien-he", "Nhận tư vấn"], ["/lien-he", "Showroom"], [tel, company.hotline], [`mailto:${company.email}`, company.email]] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg">
      <div className="flex items-center justify-between px-g py-8">
        <p className="text-[52px] font-normal leading-none tracking-tight">
          dcar<span className="inline-block w-[0.5em] translate-y-[0.08em] border-b-4 border-current" />
        </p>
        <button
          onClick={() => (scroller.lenis ? scroller.lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
          className="btn-square"
          aria-label="Lên đầu trang"
        >
          <Icon name="arrowUp" size={14} />
        </button>
      </div>
      <div className="grid border-t border-line md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="grid gap-6 p-g py-10 text-[13px] sm:grid-cols-2">
          <div className="space-y-1">
            <p className="font-medium">DCAR</p>
            <p>T. {company.hotline}</p>
            <p>E. {company.email}</p>
            <p>W. {company.web}</p>
          </div>
          {company.showrooms.map((s) => (
            <div key={s.name} className="space-y-1">
              <p className="text-muted">{s.name}</p>
              <p className="max-w-[240px]">{s.address}</p>
            </div>
          ))}
        </div>
        {cols.map((c) => (
          <div key={c.title} className="border-t border-line p-g py-10 md:border-l lg:border-t-0">
            <p className="t-label mb-5">{c.title}</p>
            <ul className="space-y-1.5">
              {c.links.map(([href, label]) => (
                <li key={label}>
                  {href.startsWith("/") ? (
                    <TLink href={href} className="text-[17px] font-light transition-opacity hover:opacity-50">{label}</TLink>
                  ) : (
                    <a href={href} className="text-[17px] font-light transition-opacity hover:opacity-50">{label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-line px-g py-5 text-[11px] text-muted md:flex-row">
        <span>© 2026 DCAR. All rights reserved.</span>
        <span className="flex gap-6"><a href="#" className="hover:text-ink">Chính sách bảo mật</a><a href="#" className="hover:text-ink">Điều khoản sử dụng</a></span>
      </div>
    </footer>
  );
}
