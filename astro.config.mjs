import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // 1. CẬP NHẬT TÊN MIỀN CỦA BẠN
  site: "https://hahutech.me",
  
  image: {
    domains: ["images.unsplash.com"],
  },

  prefetch: true,
  
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "vn", // Mặc định là tiếng Việt
        locales: {
          vn: "vn",
          en: "en",
        },
      },
    }),

    starlight({
      title: "HahuTech Docs", // Đổi tên trang web hiển thị trên thanh tiêu đề
      
      // Cấu hình ngôn ngữ: Tiếng Việt là mặc định (root)
      locales: {
        root: {
          label: "Tiếng Việt",
          lang: "vn",
        },
        en: { label: "English", lang: "en" },
        // Các ngôn ngữ dưới đây tạm thời comment lại nếu không dùng đến
        // de: { label: "Deutsch", lang: "de" },
        // es: { label: "Español", lang: "es" },
        // fa: { label: "Persian", lang: "fa", dir: "rtl" },
        // ja: { label: "日本語", lang: "ja" },
        // "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },

      // https://starlight.astro.build/guides/sidebar/
      sidebar: [
        {
          label: "Quick Start Guides",
          translations: {
            vn: "Hướng dẫn Bắt đầu Nhanh",
            // de: "Schnellstartanleitungen",
          },
          autogenerate: { directory: "guides" },
        },
        {
          label: "Tools & Equipment",
          items: [
            { label: "Tool Guides", link: "tools/tool-guides/" },
            { label: "Equipment Care", link: "tools/equipment-care/" },
          ],
        },
        {
          label: "Construction Services",
          autogenerate: { directory: "construction" },
        },
        {
          label: "Advanced Topics",
          autogenerate: { directory: "advanced" },
        },
      ],

      social: [
        {
          icon: "github",
          label: "GitHub",
          // 2. CẬP NHẬT LINK GITHUB CỦA BẠN
          href: "https://github.com/ndh-hus-k67/ndh-hus-k67.github.io",
        },
      ],

      disable404Route: true,
      customCss: ["./src/assets/styles/starlight.css"],
      favicon: "/favicon.ico",
      
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
        MobileMenuFooter: "./src/components/ui/starlight/MobileMenuFooter.astro",
        ThemeSelect: "./src/components/ui/starlight/ThemeSelect.astro",
      },

      // 3. CẬP NHẬT LINK ẢNH PREVIEW (OG IMAGE)
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://hahutech.me" + "/social.webp",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            content: "https://hahutech.me" + "/social.webp",
          },
        },
      ],
    }),

    compressor({
      gzip: false,
      brotli: true,
    }),
    
    mdx(),
  ],

  experimental: {
    clientPrerender: true,
  },
  
  vite: {
    plugins: [tailwindcss()],
  },
});