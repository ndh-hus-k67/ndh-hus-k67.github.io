import type { APIRoute } from "astro";
import { buildSitemapIndexXml } from "@/utils/sitemap";
import { SITE } from "@data/constants";

const groupedSitemaps = [
  "/sitemap-static.xml",
  "/sitemap-products.xml",
  "/sitemap-posts.xml",
  "/sitemap-en.xml",
].map((path) => new URL(path, SITE.url).href);

export const GET: APIRoute = () => {
  return new Response(buildSitemapIndexXml(groupedSitemaps), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
