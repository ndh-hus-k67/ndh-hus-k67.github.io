// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/en" },
  { name: "About Us", url: "/en/about-us" },
  { name: "Blog", url: "/en/blog" },
  { name: "Contact", url: "/en/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Products",
    links: [
      { name: "About Us", url: "/en/about-us" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About us", url: "#" },
      { name: "Blog", url: "/en/blog" },
      { name: "Contact", url: "/en/contact" },
    ],
  },
];
const productsNav = {
  label: "Products",
  categories: [
    { name: "Bolts", url: "/en/bu-long" },
    { name: "Screws", url: "/en/oc-vit" },
    { name: "Self-Clinching Nuts", url: "/en/tan-tu-giu" },
    { name: "Self-Clinching Standoffs", url: "/en/tan-tru-tu-giu" },
    { name: "Self-Clinching Studs", url: "/en/tru-ren-tu-giu" },
    { name: "Roller Chain", url: "/en/sen-xich" },
    { name: "Aluminum Profile Accessories", url: "/en/phu-kien-nhom" },
  ],
};

// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/",
  x: "https://twitter.com/",
  github: "https://github.com/mearashadowfax/ScrewFast",
  google: "https://www.google.com/",
  slack: "https://slack.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
  productsNav,
};
