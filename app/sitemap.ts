import type { MetadataRoute } from "next";

// The beta site is a single page; www is the canonical host (useloquihq.com redirects to it).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.useloquihq.com/",
      lastModified: new Date("2026-11-27"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
