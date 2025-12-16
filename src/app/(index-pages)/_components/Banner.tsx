"use client";

import { getBannerSrc } from "@/lib/bannerMap";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname();
  const src = getBannerSrc(pathname);

  return (
    <div className="relative w-full h-80 overflow-hidden">
      <Image
        src={src}
        alt="Banner"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-contain"
      />
    </div>
  );
}
