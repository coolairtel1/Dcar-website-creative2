import { TLink } from "./Transition";
import GridLines from "./GridLines";
import TextReveal from "./TextReveal";
import RevealImage from "./RevealImage";
import type { MediaItem } from "@/content/site";

type Props = {
  crumbs: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  text?: string;
  image?: MediaItem;
  position?: string;
  children?: React.ReactNode;
};

// Light inner-page hero on the 3-column grid: breadcrumb + large light title, copy in the third column, full-bleed image below.
export default function InnerHero({ crumbs, eyebrow, title, text, image, position, children }: Props) {
  return (
    <section className="relative pt-[calc(var(--topbar-h)+var(--nav-h))]">
      <GridLines />
      <div className="relative grid gap-8 px-g pb-12 pt-10 md:grid-cols-3 md:gap-0 md:pb-16 md:pt-16">
        <div className="md:col-span-2 md:pr-g">
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-2 text-[12px] text-muted">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex gap-2">
                {i > 0 && <span>/</span>}
                {c.href ? <TLink href={c.href} className="hover:text-ink">{c.label}</TLink> : <span className="text-ink">{c.label}</span>}
              </span>
            ))}
          </nav>
          {eyebrow && <p className="t-label mb-5">{eyebrow}</p>}
          <TextReveal as="h1" immediate delay={0.2} className="t-display">{title}</TextReveal>
        </div>
        <div className="flex flex-col justify-end md:pl-g">
          {text && <p className="t-lead">{text}</p>}
          {children}
        </div>
      </div>
      {image && <RevealImage item={image} priority position={position} className="relative aspect-[4/3] w-full md:aspect-[21/9]" />}
    </section>
  );
}
