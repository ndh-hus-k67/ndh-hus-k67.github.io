import type { CollectionEntry } from "astro:content";

function splitFacetText(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[,/;|]+/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

function uniq(values: string[]): string[] {
  return Array.from(new Set(values.map((v) => v.trim()).filter(Boolean)));
}

function normalizeSizeToken(token: string): string {
  return token.trim().replace(/\s+/g, "").replace(/,/g, ".").toUpperCase();
}

function isSizeTag(tag: string): boolean {
  const t = normalizeSizeToken(tag);
  // M6, M10X130
  if (/^M\d+(?:X\d+)?$/.test(t)) return true;
  // 6.3X100, 10X100
  if (/^\d+(?:\.\d+)?X\d+$/.test(t)) return true;
  // M6–M12 or M6-M12
  if (/^M\d+(?:–|-|TO)M?\d+$/.test(t)) return true;
  return false;
}

export function getProductMaterialsFromTags(product: CollectionEntry<"products">): string[] {
  const explicit = uniq(product.data.tagMaterials ?? []);
  if (explicit.length) return explicit;

  // Back-compat: older `tags: string[]` where size/material were mixed.
  return uniq((product.data.tags ?? []).filter((t) => !isSizeTag(t)));
}

export function getProductSizesFromTags(product: CollectionEntry<"products">): string[] {
  const explicit = uniq((product.data.tagSizes ?? []).map(normalizeSizeToken));
  if (explicit.length) return explicit;

  // Back-compat: older `tags: string[]` where size/material were mixed.
  return uniq((product.data.tags ?? []).filter(isSizeTag).map(normalizeSizeToken));
}

function firstMatchingSpecification(
  product: CollectionEntry<"products">,
  titleRegex: RegExp
): string | undefined {
  const match = product.data.specificationsLeft?.find((spec) =>
    titleRegex.test(spec.title)
  );
  return match?.subTitle?.trim() || undefined;
}

function inferMaterialText(product: CollectionEntry<"products">): string | undefined {
  const fromSpecs = firstMatchingSpecification(product, /vật\s*liệu|material/i);
  if (fromSpecs) return fromSpecs;

  const fromDesc = splitFacetText(product.data.description).find((s) => /inox|thép|steel|sus/i.test(s));
  return fromDesc;
}

function inferSizeText(product: CollectionEntry<"products">): string | undefined {
  const fromSpecs = firstMatchingSpecification(
    product,
    /kích\s*thước|size|diameter|đường\s*kính/i
  );
  if (fromSpecs) return fromSpecs;

  const blob = `${product.data.title}\n${product.data.description}\n${product.data.main?.content ?? ""}`;
  const m = blob.match(/\bM\s?\d+(?:\s*(?:–|-|to)\s*M?\s?\d+)?\b/gi);
  if (m?.length) return Array.from(new Set(m.map((x) => x.replace(/\s+/g, "").toUpperCase()))).join(", ");

  return undefined;
}

export function getProductMaterials(product: CollectionEntry<"products">): string[] {
  // Preferred: tags (user-defined as material + size)
  const tagMaterials = getProductMaterialsFromTags(product);
  if (tagMaterials.length) return tagMaterials;

  const explicit = [
    ...splitFacetText(product.data.material),
    ...(product.data.materials ?? []).flatMap(splitFacetText),
  ];
  if (explicit.length) return uniq(explicit);

  return splitFacetText(inferMaterialText(product));
}

export function getProductSizes(product: CollectionEntry<"products">): string[] {
  // Preferred: tags (user-defined as material + size)
  const tagSizes = getProductSizesFromTags(product);
  if (tagSizes.length) return tagSizes;

  const explicit = [
    ...splitFacetText(product.data.size),
    ...(product.data.sizes ?? []).flatMap(splitFacetText),
  ];
  if (explicit.length) return uniq(explicit.map((x) => x));

  return splitFacetText(inferSizeText(product));
}

export function getProductTags(product: CollectionEntry<"products">): string[] {
  return uniq(product.data.tags ?? []);
}

export function buildFacetOptions(values: string[]): string[] {
  return Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );
}
