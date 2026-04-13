import { getCollection } from "astro:content";
import { SITE } from "@data/constants";

type SitemapGroup = {
  static: string[];
  products: string[];
  posts: string[];
  en: string[];
};

const viCategoryToPath: Record<string, string> = {
  "bu-long": "/bu-long/",
  "oc-vit": "/oc-vit/",
  "tan-tru-tu-giu": "/tan-tru-tu-giu/",
  "tan-tu-giu": "/tan-tu-giu/",
  "tru-ren-tu-giu": "/tru-ren-tu-giu/",
  "sen-xich": "/sen-xich/",
  "phu-kien-nhom-dinh-hinh": "/phu-kien-nhom-dinh-hinh/",
  "ban-le": "/ban-le/",
  "khoa-gai": "/khoa-gai/",
};

const enCategoryToPath: Record<string, string> = {
  "bu-long": "/en/bolts/",
  "oc-vit": "/en/screws/",
  "tan-tru-tu-giu": "/en/self-clinching-standoffs/",
  "tan-tu-giu": "/en/self-clinching-nuts/",
  "tru-ren-tu-giu": "/en/self-clinching-studs/",
  "sen-xich": "/en/chains/",
  "phu-kien-nhom-dinh-hinh": "/en/aluminum-profile-accessories/",
  "ban-le": "/en/hinges/",
  "khoa-gai": "/en/toggle-latches/",
};

const staticPaths = ["/", "/ve-chung-toi/", "/lien-he/"];
const enStaticPaths = ["/en/", "/en/about-us/", "/en/contact/"];

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.trim();
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function uniqueSortedPaths(paths: Iterable<string>): string[] {
  return [...new Set([...paths].map(normalizePath))].sort((a, b) => a.localeCompare(b));
}

function toUrl(pathname: string): string {
  return new URL(normalizePath(pathname), SITE.url).href;
}

export function buildSitemapXml(urls: string[]): string {
  const body = urls
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join("");

  return `<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">${body}</urlset>`;
}

export function buildSitemapIndexXml(sitemaps: string[]): string {
  const body = sitemaps
    .map((url) => `<sitemap><loc>${url}</loc></sitemap>`)
    .join("");

  return `<?xml version=\"1.0\" encoding=\"UTF-8\"?><sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">${body}</sitemapindex>`;
}

export async function getGroupedSitemapUrls(): Promise<SitemapGroup> {
  const products = await getCollection("products");
  const posts = await getCollection("blog");

  const viProductPaths = new Set<string>(Object.values(viCategoryToPath));
  const enProductPaths = new Set<string>(Object.values(enCategoryToPath));

  for (const product of products) {
    const normalizedId = product.id.replace(/\\/g, "/");
    const categorySlug =
      typeof product.data.category === "string"
        ? product.data.category
        : product.data.category?.slug;

    if (!categorySlug) continue;

    const slug =
      product.data.slug || normalizedId.split("/").pop()?.replace(/\.md$/i, "");

    if (!slug) continue;

    if (normalizedId.startsWith("vn/") && viCategoryToPath[categorySlug]) {
      viProductPaths.add(`${viCategoryToPath[categorySlug]}${slug}/`);
    }

    if (normalizedId.startsWith("en/") && enCategoryToPath[categorySlug]) {
      enProductPaths.add(`${enCategoryToPath[categorySlug]}${slug}/`);
    }
  }

  const viPostPaths = new Set<string>(["/bai-viet/"]);
  const enPostPaths = new Set<string>(["/en/blog/"]);

  for (const post of posts) {
    const normalizedId = post.id.replace(/\\/g, "/");
    const slug = normalizedId.split("/").pop()?.replace(/\.md$/i, "");

    if (!slug) continue;

    if (normalizedId.startsWith("vn/")) {
      viPostPaths.add(`/bai-viet/${slug}/`);
    }

    if (normalizedId.startsWith("en/")) {
      enPostPaths.add(`/en/blog/${slug}/`);
    }
  }

  return {
    static: uniqueSortedPaths(staticPaths).map(toUrl),
    products: uniqueSortedPaths(viProductPaths).map(toUrl),
    posts: uniqueSortedPaths(viPostPaths).map(toUrl),
    en: uniqueSortedPaths([...enStaticPaths, ...enProductPaths, ...enPostPaths]).map(toUrl),
  };
}
