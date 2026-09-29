import type { Metadata } from "next";
import InnerHero from "@/components/InnerHero";
import GridLines from "@/components/GridLines";
import TextReveal from "@/components/TextReveal";
import FadeIn from "@/components/FadeIn";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { contact, media } from "@/content/site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ DCAR để được tư vấn giải pháp di chuyển cao cấp cho doanh nghiệp.",
};

export default function ContactPage() {
  return (
    <main>
      <InnerHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
        eyebrow="Liên hệ"
        title="Liên hệ với DCAR"
        text="Cùng DCAR tạo ra giải pháp di chuyển đẳng cấp dành riêng cho doanh nghiệp của bạn. Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ."
        image={media.studioVanCompact}
        position="50% 55%"
      >
        <ul className="mt-8 border-t border-line">
          {contact.values.map((v) => (
            <li key={v.title} className="flex items-center gap-4 border-b border-line py-3">
              <Icon name={v.icon} size={20} className="shrink-0" />
              <span className="text-[15px]">{v.title}<span className="block text-[12px] text-muted">{v.text}</span></span>
            </li>
          ))}
        </ul>
      </InnerHero>

      <section className="relative border-t border-line">
        <GridLines />
        <div className="relative grid md:grid-cols-3">
          <div className="p-g py-12 md:py-16">
            <TextReveal className="t-h2 mb-10">Thông tin liên hệ</TextReveal>
            <FadeIn className="border-t border-line">
              {contact.blocks.map((b) => (
                <div key={b.title} className="flex gap-4 border-b border-line py-5">
                  <Icon name={b.icon} size={20} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[17px] font-normal">{b.title}</p>
                    {b.lines.map((l) => <p key={l} className="mt-1 text-[13px] text-muted">{l}</p>)}
                  </div>
                </div>
              ))}
            </FadeIn>
          </div>
          <div className="bg-surface p-g py-12 md:col-span-2 md:px-[max(var(--gutter),4vw)] md:py-16">
            <TextReveal className="t-h1 mb-10">Gửi yêu cầu tư vấn</TextReveal>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="relative border-t border-line">
        <div className="px-g pb-8 pt-24"><p className="t-label mb-4">Bản đồ</p><h2 className="t-h2">Showroom DCAR HCM</h2></div>
        <div className="relative aspect-[4/3] overflow-hidden border-t border-line md:aspect-[21/8]">
          <iframe
            title="Bản đồ Showroom DCAR HCM"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=16&output=embed`}
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(0.95)_brightness(1.02)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="relative bg-line-soft">
        <GridLines />
        <div className="relative px-g pb-8 pt-24"><TextReveal className="t-h1 max-w-3xl">DCAR – Đối tác tin cậy của doanh nghiệp</TextReveal></div>
        <FadeIn className="relative grid md:grid-cols-3">
          {contact.pillars.map((p) => (
            <div key={p.title} className="border-t border-line p-g py-10">
              <Icon name={p.icon} size={32} />
              <p className="t-label mt-12">{p.title}</p>
              <p className="t-body mt-3 max-w-xs text-muted">{p.text}</p>
            </div>
          ))}
        </FadeIn>
      </section>
    </main>
  );
}
