"use client";

import { getAssetPath } from "@/utils/paths";

interface ParallaxSectionProps {
  backgroundImage: string;
}

export default function ParallaxSection({ backgroundImage }: ParallaxSectionProps) {
  return (
    <section className="relative h-[800px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${getAssetPath(backgroundImage)})` }}
      />
    </section>
  );
}
