import Image from "next/image";
import type { MediaItem } from "@/content/site";

// Fill-mode image; parent must be positioned and sized.
export default function Media({ item, sizes = "100vw", priority = false, className = "", position = "center" }: {
  item: MediaItem; sizes?: string; priority?: boolean; className?: string; position?: string;
}) {
  return (
    <Image src={item.src} alt={item.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} style={{ objectPosition: position }} />
  );
}
