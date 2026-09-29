import { TLink } from "./Transition";
import GridLines from "./GridLines";
import FadeIn from "./FadeIn";
import { company, cta, tel } from "@/content/site";

// dvo "Hai bisogno di più informazioni?" — three light cells separated by drawn lines.
export default function CtaTriple() {
  return (
    <section className="relative border-t border-line bg-line-soft">
      <GridLines />
      <FadeIn className="relative grid md:grid-cols-3">
        <div className="p-g py-12 md:py-16">
          <h2 className="t-h2 max-w-sm">{cta.title}</h2>
        </div>
        <div className="border-t border-line p-g py-12 md:border-t-0 md:py-16">
          <h3 className="t-h2">Nhận tư vấn</h3>
          <p className="t-body mt-4 max-w-sm">{cta.text}. Đội ngũ DCAR sẽ đề xuất dòng xe và cấu hình phù hợp với doanh nghiệp của bạn.</p>
          <TLink href="/lien-he" className="btn btn-ink mt-8">Nhận tư vấn ngay</TLink>
        </div>
        <div className="border-t border-line p-g py-12 md:border-t-0 md:py-16">
          <h3 className="t-h2">Hotline</h3>
          <p className="t-body mt-4 max-w-sm">Thời gian hoạt động 8:00 – 20:00, Thứ 2 – Chủ nhật.</p>
          <a href={tel} className="btn-link mt-8">{company.hotline}</a>
        </div>
      </FadeIn>
    </section>
  );
}
