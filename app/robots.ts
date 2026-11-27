import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.useloquihq.com/sitemap.xml",
    host: "https://www.useloquihq.com",
  };
}
