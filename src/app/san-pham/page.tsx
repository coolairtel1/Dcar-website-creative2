import type { Metadata } from "next";
import InnerHero from "@/components/InnerHero";
import GridLines from "@/components/GridLines";
import RevealImage from "@/components/RevealImage";
import TextReveal from "@/components/TextReveal";
import CtaTriple from "@/components/CtaTriple";
import { TLink } from "@/components/Transition";
import { media, products } from "@/content/site";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Các dòng xe limousine cao cấp DCAR thiết kế riêng cho doanh nghiệp.",
};

export default function ProductsPage() {
  return (
    <main>
      <InnerHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm" }]}
        eyebrow="Bộ sưu tập"
        title="Sản phẩm"
        text="Khám phá các dòng xe limousine cao cấp của DCAR, được thiết kế dành riêng cho doanh nghiệp, mang đến trải nghiệm di chuyển đẳng cấp, an toàn và hiệu quả vượt trội."
        image={media.studioVan}
        position="50% 60%"
      />

      <section className="relative mt-24">
        <GridLines />
        {products.map((p, i) => (
          <article key={p.slug} className="relative grid border-t border-line md:grid-cols-3">
            <div className={`flex flex-col justify-between p-g py-10 md:py-14 ${i % 2 ? "md:order-2" : ""}`}>
              <div>
                <p className="t-label text-muted">{String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</p>
                <TextReveal className="t-h1 mt-6">{p.name}</TextReveal>
                <p className="t-label mt-4">{p.tagline}</p>
                <p className="t-body mt-6 max-w-sm text-muted">{p.text}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <TLink href={`/san-pham/${p.slug}`} className="btn btn-ink">Khám phá ngay</TLink>
                <TLink href="/lien-he" className="btn">Nhận tư vấn</TLink>
              </div>
            </div>
            <TLink href={`/san-pham/${p.slug}`} className={`block p-g md:col-span-2 md:py-14 ${i % 2 ? "md:order-1" : ""}`} aria-label={p.name}>
              <RevealImage item={p.image} hoverZoom className="aspect-[16/10]" sizes="(min-width:768px) 66vw, 100vw" />
            </TLink>
          </article>
        ))}
      </section>

      <div className="mt-24"><CtaTriple /></div>
    </main>
  );
}
