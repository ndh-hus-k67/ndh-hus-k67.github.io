const navBarLinks = [
  { name: "Trang chủ", url: "/" },
  { name: "Về chúng tôi", url: "/about-us" },
  { name: "Bài viết", url: "/blog" },
  { name: "Liên hệ", url: "/contact" },
];

const footerLinks = [
  {
    section: "Sản phẩm",
    links: [
      { name: "Bu lông", url: "/bu-long" },
      { name: "Ốc Vít", url: "/oc-vit" },
      { name: "Tán Tự Giữ", url: "/tan-tu-giu" },
      { name: "Trụ Ren Tự Giữ", url: "/tru-ren-tu-giu" },
      { name: "Tán Trụ Tự Giữ", url: "/tan-tru-tu-giu" },
    ],
  },
  {
    section: "Công ty",
    links: [
      { name: "Về chúng tôi", url: "/about-us" },
      { name: "Bài Viết", url: "/blog" },
      { name: "Liên hệ", url: "/contact" },
    ],
  },
];

const productsNav = {
  label: "Sản phẩm",
  categories: [
    { name: "Bu Lông", url: "/bu-long" },
    { name: "Ốc Vít", url: "/oc-vit" },
    { name: "Tán Tự Giữ", url: "/tan-tu-giu" },
    { name: "Tán Trụ Tự Giữ", url: "/tan-tru-tu-giu" },
    { name: "Trụ Ren Tự Giữ", url: "/tru-ren-tu-giu" },
    { name: "Sên Xích", url: "/sen-xich" },
    { name: "Phụ Kiện Nhôm Định Hình", url: "/phu-kien-nhom" },
  ],
};

const socialLinks = {
  facebook: "https://www.facebook.com/hahutech.vn",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
  productsNav,
};
