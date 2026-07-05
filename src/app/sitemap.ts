import type { MetadataRoute } from "next";

const baseUrl = "https://compressimageto20kb.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-05");

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4
    }
  ];
}
