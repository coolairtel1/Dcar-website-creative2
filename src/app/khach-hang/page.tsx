import type { Metadata } from "next";
import InnerHero from "@/components/InnerHero";
import GridLines from "@/components/GridLines";
import RevealImage from "@/components/RevealImage";
import TextReveal from "@/components/TextReveal";
import FadeIn from "@/components/FadeIn";
import CtaTriple from "@/components/CtaTriple";
import { clientShowcase, media, partners } from "@/content/site";

export const metadata: Metadata = {
  title: "Khách hàng",
  description: "Các doanh nghiệp và tổ chức tin chọn giải pháp di chuyển DCAR.",
};

export default function ClientsPage() {
  return (
    <main>
      <InnerHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Khách hàng" }]}
        eyebrow="Khách hàng DCAR"
        title="Khách hàng tiêu biểu"
        text="DCAR tự hào đã tối ưu trải nghiệm vận hành cho hàng trăm doanh nghiệp và tổ chức trên khắp Việt Nam."
        image={media.vanHero}
        position="70% 50%"
      />

      <section className="relative mt-24">
        <GridLines />
        <div className="relative px-g pb-8">
          <p className="t-label mb-4">Đối tác doanh nghiệp</p>
          <TextReveal className="t-h1 max-w-2xl">Đồng hành cùng những thương hiệu dẫn đầu</TextReveal>
        </div>
        <FadeIn className="relative grid border-y border-line md:grid-cols-3">
          {partners.map((p) => (
            <div key={p} className="flex h-40 items-center justify-center border-b border-line text-[clamp(26px,2.4vw,36px)] font-light md:border-b-0">{p}</div>
          ))}
        </FadeIn>
      </section>

      <section className="relative">
        <GridLines />
        <div className="relative px-g pb-6 pt-24"><p className="t-label">Hình ảnh khách hàng</p></div>
        <div className="relative grid md:grid-cols-3">
          {clientShowcase.map((c, i) => (
            <figure key={i} className="border-t border-line p-g py-8">
              <RevealImage item={c.image} hoverZoom className="aspect-[4/3]" sizes="(min-width:768px) 33vw, 100vw" />
              <figcaption className="mt-4">
                <p className="text-[11px] text-muted">DCAR {c.model}</p>
                <p className="text-[22px] font-light">{c.client}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-24"><CtaTriple /></div>
    </main>
  );
}
