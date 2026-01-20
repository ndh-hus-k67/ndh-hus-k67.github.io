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
      { name: "Về chúng tôi", url: "/about-us" },
    ],
  },
  {
    section: "Công ty",
    links: [
      { name: "Về chúng tôi", url: "#" },
      { name: "Blog", url: "/blog" },
      { name: "Liên hệ", url: "/contact" },
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
