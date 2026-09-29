import HeroSlider from "@/components/HeroSlider";
import GridLines from "@/components/GridLines";
import TextReveal from "@/components/TextReveal";
import RevealImage from "@/components/RevealImage";
import FadeIn from "@/components/FadeIn";
import Slider from "@/components/Slider";
import Media from "@/components/Media";
import Icon from "@/components/Icon";
import CtaTriple from "@/components/CtaTriple";
import { TLink } from "@/components/Transition";
import { about, heroSlides, media, partners, products, reasons, solutions } from "@/content/site";

export default function Home() {
  return (
    <main>
      <HeroSlider slides={heroSlides} />

      {/* Mission — dvo "La nostra missione" */}
      <section className="relative">
        <GridLines />
        <div className="relative grid px-g py-24 md:grid-cols-3 md:py-40">
          <div className="md:col-span-2 md:col-start-2 md:pl-g">
            <p className="t-label mb-4">{about.title}</p>
            <TextReveal as="p" className="t-lead max-w-3xl !text-[clamp(20px,1.9vw,28px)]">{about.text}</TextReveal>
            <FadeIn className="mt-10 grid gap-4 sm:grid-cols-3">
              {about.points.map((p) => (
                <p key={p} className="t-body flex gap-3 border-t border-line pt-4"><Icon name="check" size={18} className="shrink-0" />{p}</p>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What we do — three cells */}
      <section className="relative grid px-g md:grid-cols-3">
        <div className="flex flex-col justify-between bg-line-soft p-g py-10 md:min-h-[600px]">
          <div>
            <p className="t-label mb-4">Chúng tôi làm gì</p>
            <h2 className="t-h2">Thiết kế và sản xuất tại Việt Nam</h2>
            <p className="t-body mt-6 max-w-xs">Xe limousine cao cấp thiết kế riêng cho doanh nghiệp: từ dòng xe tiêu chuẩn đến cấu hình cá nhân hóa theo thương hiệu.</p>
          </div>
          <TLink href="/lien-he" className="btn-link mt-10 self-start">Nhận tư vấn</TLink>
        </div>
        {[
          { href: "/san-pham", title: "Sản phẩm", text: "4 dòng xe limousine cao cấp", image: media.studioVan, dark: true },
          { href: "/khach-hang", title: "Khách hàng", text: "Được tin chọn bởi doanh nghiệp hàng đầu", image: media.cabin, dark: false },
        ].map((c) => (
          <TLink
            key={c.href}
            href={c.href}
            className={`group flex flex-col justify-between p-g py-10 md:min-h-[600px] ${c.dark ? "bg-ink text-surface" : "bg-surface"}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="t-h2">{c.title}</h2>
              <span className={`btn-square ${c.dark ? "btn-square-light" : ""}`}><Icon name="plus" size={14} /></span>
            </div>
            <div>
              <div className="relative ml-auto mt-10 aspect-[4/3] w-4/5 overflow-hidden">
                <Media item={c.image} sizes="(min-width:768px) 27vw, 80vw" className="transition-transform duration-[900ms] ease-dvo group-hover:scale-[1.05]" />
              </div>
              <p className="t-body mt-5 text-right opacity-70">{c.text}</p>
            </div>
          </TLink>
        ))}
      </section>

      {/* Featured products slider — dvo "Progetta il tuo spazio" */}
      <section className="relative border-y border-line py-10 mt-24">
        <Slider label="Sản phẩm nổi bật" title={<h2 className="t-h2">Sản phẩm nổi bật</h2>}>
          {products.map((p) => (
            <TLink key={p.slug} href={`/san-pham/${p.slug}`} className="group block w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[calc((100vw-60px-48px)/4)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-line-soft">
                <Media item={p.image} sizes="(min-width:1024px) 25vw, 78vw" className="transition-transform duration-[900ms] ease-dvo group-hover:scale-[1.05]" />
              </div>
              <p className="mt-3 text-[19px] font-light">{p.name}</p>
              <p className="t-body text-[13px] text-muted">{p.short}</p>
              <span className="btn mt-4 !h-7 !px-2.5 !text-[11px]">Xem chi tiết</span>
            </TLink>
          ))}
        </Slider>
      </section>

      {/* Solutions grid */}
      <section className="relative">
        <GridLines />
        <div className="relative px-g pb-6 pt-24 md:pt-32">
          <p className="t-label mb-4">Giải pháp</p>
          <TextReveal className="t-h1 max-w-2xl">Giải pháp cho doanh nghiệp</TextReveal>
        </div>
        <FadeIn className="relative grid md:grid-cols-3">
          {solutions.map((s, i) => (
            <article key={s.title} className="group border-t border-line p-g py-10 transition-colors duration-500 ease-dvo hover:bg-surface">
              <div className="flex items-start justify-between">
                <span className="t-label text-muted">{String(i + 1).padStart(2, "0")}.</span>
                <Icon name={s.icon} size={34} className="transition-transform duration-700 ease-dvo group-hover:-translate-y-1" />
              </div>
              <h3 className="t-h2 mt-16">{s.title}</h3>
              <p className="t-body mt-2 text-muted">{s.text}</p>
            </article>
          ))}
        </FadeIn>
      </section>

      {/* Dark block — dvo "L'azienda" */}
      <section className="relative mt-24 bg-ink text-surface">
        <GridLines className="[&>i]:!bg-surface/15" />
        <div className="relative grid md:grid-cols-3">
          <div className="flex flex-col justify-between p-g py-12 md:py-16">
            <div>
              <p className="t-label mb-4 opacity-70">Vì sao doanh nghiệp chọn DCAR</p>
              <TextReveal className="t-h2 max-w-xs">Cam kết chất lượng, dịch vụ chuyên nghiệp</TextReveal>
            </div>
            <TLink href="/san-pham" className="btn-link mt-10 self-start">Khám phá sản phẩm</TLink>
          </div>
          <div className="p-g py-12 md:col-span-2 md:py-16">
            <RevealImage item={media.vanHero} position="65% 50%" className="aspect-[16/9]" sizes="(min-width:768px) 66vw, 100vw" />
          </div>
        </div>
        <FadeIn className="relative grid border-t border-surface/15 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((r) => (
            <div key={r.title} className="border-b border-surface/15 p-g py-8 lg:border-b-0 lg:[&:not(:last-child)]:border-r">
              <Icon name={r.icon} size={30} className="opacity-80" />
              <p className="mt-8 max-w-[220px] text-[17px] font-light">{r.title}</p>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* Clients — dvo "Metodo" three cells */}
      <section className="relative grid px-g py-24 md:grid-cols-3">
        <div className="bg-line-soft p-g py-10">
          <p className="t-label mb-4">Khách hàng tiêu biểu</p>
          <TextReveal className="t-h2 max-w-xs">Được tin chọn bởi các doanh nghiệp hàng đầu</TextReveal>
        </div>
        <div className="flex flex-col justify-between bg-line-soft p-g py-10">
          <div>
            <p className="t-body max-w-sm">DCAR tự hào đã tối ưu trải nghiệm vận hành cho hàng trăm doanh nghiệp và tổ chức trên khắp Việt Nam.</p>
            <ul className="mt-8 border-t border-line">
              {partners.map((p) => (
                <li key={p} className="flex items-center justify-between border-b border-line py-3 text-[19px] font-light">{p}<Icon name="arrow" size={16} className="text-muted" /></li>
              ))}
            </ul>
          </div>
          <TLink href="/khach-hang" className="btn-link mt-10 self-start">Xem thêm khách hàng</TLink>
        </div>
        <RevealImage item={media.material} className="aspect-[4/3] md:aspect-auto" sizes="(min-width:768px) 33vw, 100vw" />
      </section>

      <CtaTriple />
    </main>
  );
}
