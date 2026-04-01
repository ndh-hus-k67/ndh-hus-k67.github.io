import type { APIRoute, ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import icon from "@images/icon.png";
import maskableIcon from "@images/icon-maskable.png";

interface Favicon {
  purpose: 'any' | 'maskable' | 'monochrome';
  src: ImageMetadata;
  sizes: number[];
}

const sizes = [192, 512];
const favicons: Favicon[] = [
  {
    purpose: 'any',
    src: icon,
    sizes,
  },
  {
    purpose: 'maskable',
    src: maskableIcon,
    sizes,
   },
];

export const GET: APIRoute = async () => {
  const icons = await Promise.all(
    favicons.flatMap((favicon) =>
      favicon.sizes.map(async (size) => {
        const image = await getImage({
          src: favicon.src,
          width: size,
          height: size,
          format: "png",
        });
        return {
          src: image.src,
          sizes: `${image.options.width}x${image.options.height}`,
          type: `image/${image.options.format}`,
          purpose: favicon.purpose,
        };
      }),
    ),
  );

  const manifest = {
    short_name: "HAHUTECH",
    name: "HAHUTECH - Phụ kiện nhôm định hình công nghiệp",
    description: "Chuyên cung cấp phụ kiện nhôm định hình: trượt bi, trượt lẫy và chi tiết lắp ráp công nghiệp",
    icons,
    display: "minimal-ui",
    id: "/",
    start_url: "/",
    theme_color: "#facc15",
    background_color: "#262626",
  };

  return new Response(JSON.stringify(manifest));
};
