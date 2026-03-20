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
      { name: "Bolts", url: "/en/bolts" },
      { name: "Screws", url: "/en/screws" },
      { name: "Self-Clinching Nuts", url: "/en/self-clinching-nuts" },
      { name: "Self-Clinching Standoffs", url: "/en/self-clinching-standoffs" },
      { name: "Self-Clinching Studs", url: "/en/self-clinching-studs" },
      { name: "Roller Chain", url: "/en/chains" },
      { name: "Aluminum Profile Accessories", url: "/en/aluminum-profile-accessories" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About Us", url: "/en/about-us" },
      { name: "Blog", url: "/en/blog" },
      { name: "Contact", url: "/en/contact" },
    ],
  },
];
const productsNav = {
  label: "Products",
  categories: [
    { name: "Bolts", url: "/en/bolts" },
    { name: "Screws", url: "/en/screws" },
    { name: "Self-Clinching Nuts", url: "/en/self-clinching-nuts" },
    { name: "Self-Clinching Standoffs", url: "/en/self-clinching-standoffs" },
    { name: "Self-Clinching Studs", url: "/en/self-clinching-studs" },
    { name: "Roller Chain", url: "/en/chains" },
    { name: "Aluminum Profile Accessories", url: "/en/aluminum-profile-accessories" },
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
