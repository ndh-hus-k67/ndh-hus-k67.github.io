import type { APIRoute } from "astro";
import { buildSitemapXml, getGroupedSitemapUrls } from "@/utils/sitemap";

export const GET: APIRoute = async () => {
  const grouped = await getGroupedSitemapUrls();

  return new Response(buildSitemapXml(grouped.products), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
