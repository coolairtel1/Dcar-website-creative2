import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GridLines from "@/components/GridLines";
import RevealImage from "@/components/RevealImage";
import TextReveal from "@/components/TextReveal";
import FadeIn from "@/components/FadeIn";
import Slider from "@/components/Slider";
import Media from "@/components/Media";
import Icon from "@/components/Icon";
import CtaTriple from "@/components/CtaTriple";
import { TLink } from "@/components/Transition";
import { media, productUsps, products, type MediaItem } from "@/content/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.overview } : {};
}

// Label/title cell | body cell | media cell on the 3-column grid.
function Row({ label, title, children, side, wide }: { label: string; title: string; children?: React.ReactNode; side: React.ReactNode; wide?: boolean }) {
  return (
    <section className="relative grid border-t border-line md:grid-cols-3">
      <div className="p-g py-10 md:py-14">
        <p className="t-label mb-4 text-muted">{label}</p>
        <TextReveal className="t-h1">{title}</TextReveal>
        {wide && <div className="t-body mt-6 max-w-sm">{children}</div>}
      </div>
      {!wide && <div className="t-body p-g pb-10 md:py-14">{children}</div>}
      <div className={`p-g pb-10 md:py-14 ${wide ? "md:col-span-2" : ""}`}>{side}</div>
    </section>
  );
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const gallery: [MediaItem, string][] = [
    [p.image, "50% 50%"], [media.cabin, "40% 50%"], [media.material, "50% 50%"],
    [media.vanHero, "70% 50%"], [media.studioVanCompact, "50% 50%"], [media.studioVan, "50% 50%"],
  ];
  const others = products.filter((x) => x.slug !== p.slug);

  return (
    <main>
      {/* Split hero */}
      <section className="relative pt-[calc(var(--topbar-h)+var(--nav-h))]">
        <GridLines />
        <div className="relative grid md:grid-cols-3">
          <div className="flex flex-col justify-between p-g py-10 md:py-16">
            <div>
              <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-2 text-[12px] text-muted">
                <TLink href="/" className="hover:text-ink">Trang chủ</TLink><span>/</span>
                <TLink href="/san-pham" className="hover:text-ink">Sản phẩm</TLink><span>/</span>
                <span className="text-ink">{p.name}</span>
              </nav>
              <TextReveal as="h1" immediate delay={0.2} className="t-h1">{p.name}</TextReveal>
              <p className="t-label mt-5">{p.tagline}</p>
              <p className="t-lead mt-6 max-w-sm">{p.text}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <TLink href="/lien-he" className="btn btn-ink">Nhận tư vấn</TLink>
              <a href="#" className="btn"><Icon name="download" size={14} />Tải catalogue</a>
            </div>
          </div>
          <div className="p-g pb-10 md:col-span-2 md:py-16">
            <RevealImage item={p.image} priority className="aspect-[16/10]" sizes="(min-width:768px) 66vw, 100vw" position="60% 50%" />
          </div>
        </div>
      </section>

      {/* USP strip */}
      <FadeIn stagger={0.05} y={16} className="grid grid-cols-2 border-y border-line bg-surface md:grid-cols-3 lg:grid-cols-6">
        {productUsps.map((u) => (
          <div key={u.title} className="flex items-center gap-4 border-line p-g py-6 [&:not(:last-child)]:border-r">
            <Icon name={u.icon} size={24} className="shrink-0" />
            <span className="text-[13px] leading-snug">{u.title}</span>
          </div>
        ))}
      </FadeIn>

      <div className="relative mt-24">
        <GridLines />
        <Row label="01" title="Tổng quan" side={<RevealImage item={media.cabin} className="aspect-[4/3]" sizes="33vw" />}>
          <p className="t-lead">{p.overview}</p>
        </Row>
        <Row label="02" title="Ngoại thất" side={<RevealImage item={media.vanHero} position="75% 50%" className="aspect-[4/3]" sizes="33vw" />}>
          <p>{p.exterior}</p>
        </Row>
        <Row
          label="03"
          title="Nội thất"
          wide
          side={
            <div className="grid grid-cols-3 gap-3">
              <RevealImage item={media.cabin} className="col-span-3 aspect-[16/9]" sizes="66vw" />
              <RevealImage item={media.material} position="20% 50%" className="aspect-square" sizes="22vw" />
              <RevealImage item={media.cabin} position="85% 50%" className="aspect-square" sizes="22vw" />
              <RevealImage item={media.material} position="90% 40%" className="aspect-square" sizes="22vw" />
            </div>
          }
        >
          <p>{p.interior}</p>
        </Row>
        <Row label="04" title="Tính năng nổi bật" side={<RevealImage item={media.material} className="aspect-[4/3]" sizes="33vw" />}>
          <ul className="border-t border-line">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 border-b border-line py-3"><Icon name="check" size={18} className="mt-0.5 shrink-0" />{f}</li>
            ))}
          </ul>
        </Row>
        <Row label="05" title="Thông số kỹ thuật" side={<RevealImage item={media.studioVanCompact} className="aspect-[4/3]" sizes="33vw" />}>
          <table className="w-full border-t border-line text-[14px]">
            <tbody>
              {p.specs.map(([k, v]) => (
                <tr key={k} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 text-left font-light text-muted">{k}</th>
                  <td className="py-3">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
        <Row label="06" title="Ứng dụng" side={<RevealImage item={media.vanHero} position="55% 50%" className="aspect-[4/3]" sizes="33vw" />}>
          <ul className="border-t border-line">
            {p.uses.map((u) => (
              <li key={u} className="flex gap-3 border-b border-line py-3"><Icon name="check" size={18} className="mt-0.5 shrink-0" />{u}</li>
            ))}
          </ul>
        </Row>
      </div>

      {/* Gallery */}
      <section className="border-y border-line py-10">
        <Slider label={`Gallery ${p.name}`} title={<h2 className="t-h2">Gallery</h2>}>
          {gallery.map(([m, pos], i) => (
            <div key={i} className="relative aspect-[4/3] w-[80vw] shrink-0 snap-start overflow-hidden bg-line-soft md:w-[42vw] lg:w-[32vw]">
              <Media item={m} position={pos} sizes="(min-width:1024px) 32vw, 80vw" />
            </div>
          ))}
        </Slider>
      </section>

      {/* Other models */}
      <section className="relative">
        <GridLines />
        <div className="relative px-g pb-6 pt-24"><p className="t-label">Dòng xe khác</p></div>
        <div className="relative grid md:grid-cols-3">
          {others.map((o) => (
            <TLink key={o.slug} href={`/san-pham/${o.slug}`} className="group block border-t border-line p-g py-8">
              <div className="relative aspect-[4/3] overflow-hidden bg-line-soft">
                <Media item={o.image} sizes="33vw" className="transition-transform duration-[900ms] ease-dvo group-hover:scale-[1.05]" />
              </div>
              <p className="mt-4 text-[22px] font-light">{o.name}</p>
              <p className="t-body text-muted">{o.short}</p>
              <span className="btn-link mt-4">Xem chi tiết</span>
            </TLink>
          ))}
        </div>
      </section>

      <div className="mt-24"><CtaTriple /></div>
    </main>
  );
}
