import type { ImageMetadata } from "astro";

export type ImageLike = ImageMetadata | string | null | undefined;

const localImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/images/**/*.{avif,webp,png,jpg,jpeg,gif,svg}"
);

function toLocalImageGlobKey(src: string): string | null {
  if (src.startsWith("@/")) {
    // "@/images/foo.avif" -> "/src/images/foo.avif"
    return "/src/" + src.slice(2);
  }

  if (src.startsWith("/src/")) return src;

  return null;
}

export async function resolveLocalImage(src: ImageLike): Promise<ImageLike> {
  if (!src) return src;

  if (typeof src !== "string") return src;

  // Remote URL can't be resolved to ImageMetadata here.
  if (/^https?:\/\//i.test(src)) return src;

  const key = toLocalImageGlobKey(src);
  if (!key) return src;

  const loader = localImages[key];
  if (!loader) return src;

  const mod = await loader();
  return mod.default;
}

export async function resolveLocalImageOrFallback(
  src: ImageLike,
  fallback: string
): Promise<ImageMetadata> {
  const resolved = await resolveLocalImage(src);
  if (resolved && typeof resolved !== "string") return resolved;

  const fallbackResolved = await resolveLocalImage(fallback);
  if (fallbackResolved && typeof fallbackResolved !== "string") return fallbackResolved;

  throw new Error(
    `Unable to resolve local image. src=${String(src)} fallback=${fallback}`
  );
}
