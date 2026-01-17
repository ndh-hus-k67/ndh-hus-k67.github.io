const navBarLinks = [
  { name: "Trang chủ", url: "/" },
  { name: "Sản phẩm", url: "/products" },
  { name: "Về chúng tôi", url: "/about-us" },
  { name: "Bài viết", url: "/blog" },
  { name: "Liên hệ", url: "/contact" },
];

const footerLinks = [
  {
    section: "Hệ sinh thái",
    links: [
      { name: "Công cụ & Thiết bị", url: "/products" },
      { name: "Về chúng tôi", url: "/about-us" },
    ],
  },
  {
    section: "Công ty",
    links: [
      { name: "Về chúng tôi", url: "#" },
      { name: "Blog", url: "/blog" },
      { name: "Khách hàng", url: "/products/#customer" },
    ],
  },
];

const socialLinks = {
  facebook: "#",
  x: "#",
  github: "https://github.com/mearashadowfax/ScrewFast",
  google: "#",
  slack: "#",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
