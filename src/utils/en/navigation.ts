// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/en" },
  { name: "Products", url: "/en/products" },
  { name: "About Us", url: "/en/about-us" },
  { name: "Blog", url: "/en/blog" },
  { name: "Contact", url: "/en/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Ecosystem",
    links: [
      { name: "Tools & Equipment", url: "/en/products" },
        { name: "About Us", url: "/en/about-us" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About us", url: "#" },
      { name: "Blog", url: "/en/blog" },
      { name: "Customers", url: "/en/products/#customer" },
    ],
  },
];
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
};
