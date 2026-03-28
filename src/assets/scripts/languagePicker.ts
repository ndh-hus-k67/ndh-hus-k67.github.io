type Language = "en" | "vn";

type PathMap = Record<string, Partial<Record<Language, string>>>;

type InitOptions = {
  productPathMap?: PathMap;
  blogPathMap?: PathMap;
};

declare global {
  interface Window {
    __LANG_PICKER_BOOTSTRAPPED__?: boolean;
  }
}

const LANGUAGES: Language[] = ["en", "vn"];

const localizedSlugMap: Record<Language, Record<string, string>> = {
  en: {
    "lien-he": "contact",
    "ve-chung-toi": "about-us",
    "bai-viet": "blog",
    "bu-long": "bolts",
    "oc-vit": "screws",
    "tan-tu-giu": "self-clinching-nuts",
    "tan-tru-tu-giu": "self-clinching-standoffs",
    "tru-ren-tu-giu": "self-clinching-studs",
    "sen-xich": "chains",
    "phu-kien-nhom-dinh-hinh": "aluminum-profile-accessories",
    "ban-le": "hinges",
    "khoa-gai": "toggle-latches",
  },
  vn: {
    contact: "lien-he",
    "about-us": "ve-chung-toi",
    blog: "bai-viet",
    bolts: "bu-long",
    screws: "oc-vit",
    "self-clinching-nuts": "tan-tu-giu",
    "self-clinching-standoffs": "tan-tru-tu-giu",
    "self-clinching-studs": "tru-ren-tu-giu",
    chains: "sen-xich",
    "aluminum-profile-accessories": "phu-kien-nhom-dinh-hinh",
    "hinges": "ban-le",
    "toggle-latches": "khoa-gai",
  },
};

function detectLangFromPath(pathname: string): Language {
  const first = pathname.split("/").filter(Boolean)[0];
  return first === "en" ? "en" : "vn";
}

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const normalized = pathname.replace(/\/+?/g, "/");
  if (normalized.length > 1 && normalized.endsWith("/")) return normalized.slice(0, -1);
  return normalized;
}

function translatePathParts(parts: string[], targetLang: Language): string[] {
  if (parts.length === 0) return parts;
  const mapped = localizedSlugMap[targetLang][parts[0]];
  if (!mapped) return parts;
  return [mapped, ...parts.slice(1)];
}

function handleLangLinkClick(link: HTMLAnchorElement, maps: Required<InitOptions>) {
  const href = link.getAttribute("href") ?? "/";
  const rawLang = (link.dataset && (link.dataset.lang as Language | undefined)) || (href.startsWith("/en") ? "en" : "vn");
  const lang: Language = rawLang === "en" ? "en" : "vn";

  const url = new URL(window.location.href);
  const currentLang = detectLangFromPath(url.pathname);
  const currentPathname = normalizePathname(url.pathname);

  const mapped = maps.productPathMap?.[currentPathname]?.[lang];
  if (mapped) {
    const nextPath = normalizePathname(mapped);
    window.location.href = `${url.origin}${nextPath}${url.search}`;
    return;
  }

  const blogMapped = maps.blogPathMap?.[currentPathname]?.[lang];
  if (blogMapped) {
    const nextPath = normalizePathname(blogMapped);
    window.location.href = `${url.origin}${nextPath}${url.search}`;
    return;
  }

  const pathParts = url.pathname
    .split("/")
    .filter((part) => part && !LANGUAGES.includes(part as Language));

  const translatedParts = lang === currentLang ? pathParts : translatePathParts(pathParts, lang);
  const currentPath = translatedParts.join("/");

  let newPath = "";
  if (lang !== "vn") newPath = `/${lang}/${currentPath}`;
  else newPath = `/${currentPath}`;

  newPath = newPath.replace(/\/+?/g, "/");
  if (newPath === "") newPath = "/";

  window.location.href = `${url.origin}${newPath}${url.search}`;
}

function initLanguagePickerRoot(root: Element, maps: Required<InitOptions>) {
  const el = root as HTMLElement;
  if (!el || el.dataset.langInit === "1") return;
  el.dataset.langInit = "1";

  // Event delegation for language links
  el.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.("a[data-lang-link]") as HTMLAnchorElement | null;
    if (!link) return;
    event.preventDefault();
    handleLangLinkClick(link, maps);
  });

  // Desktop dropdown
  const desktopToggle = el.querySelector("[data-lang-desktop-toggle]") as HTMLButtonElement | null;
  const desktopMenu = el.querySelector("[data-lang-desktop-menu]") as HTMLElement | null;
  const desktopArrow = el.querySelector("[data-lang-desktop-arrow]") as HTMLElement | null;

  const setDesktopOpen = (open: boolean) => {
    if (!desktopToggle || !desktopMenu) return;
    desktopToggle.setAttribute("aria-expanded", open ? "true" : "false");

    if (open) {
      desktopMenu.classList.remove("hidden");
      desktopMenu.classList.remove("opacity-0");
      desktopMenu.classList.add("opacity-100");
      if (desktopArrow) desktopArrow.classList.add("rotate-180");
    } else {
      desktopMenu.classList.add("hidden");
      desktopMenu.classList.remove("opacity-100");
      desktopMenu.classList.add("opacity-0");
      if (desktopArrow) desktopArrow.classList.remove("rotate-180");
    }
  };

  if (desktopToggle && desktopMenu) {
    desktopToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const expanded = desktopToggle.getAttribute("aria-expanded") === "true";
      setDesktopOpen(!expanded);
    });

    document.addEventListener("click", (event) => {
      const expanded = desktopToggle.getAttribute("aria-expanded") === "true";
      if (!expanded) return;
      if (el.contains(event.target as Node)) return;
      setDesktopOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const expanded = desktopToggle.getAttribute("aria-expanded") === "true";
      if (expanded) setDesktopOpen(false);
    });
  }

  // Mobile accordion
  const mobileToggle = el.querySelector("[data-lang-mobile-toggle]") as HTMLButtonElement | null;
  const mobileList = el.querySelector("[data-lang-mobile-list]") as HTMLElement | null;
  const mobileArrow = el.querySelector("[data-lang-mobile-arrow]") as HTMLElement | null;

  if (mobileToggle && mobileList) {
    mobileToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = !mobileList.classList.contains("hidden");
      if (isOpen) {
        mobileList.classList.add("hidden");
        mobileList.classList.remove("flex");
        if (mobileArrow) mobileArrow.style.transform = "";
      } else {
        mobileList.classList.remove("hidden");
        mobileList.classList.add("flex");
        if (mobileArrow) mobileArrow.style.transform = "rotate(180deg)";
      }
    });
  }
}

function initAllLanguagePickers(maps: Required<InitOptions>) {
  document.querySelectorAll("[data-language-picker]").forEach((root) => initLanguagePickerRoot(root, maps));
}

export function initLanguagePickers(options?: InitOptions) {
  const maps: Required<InitOptions> = {
    productPathMap: options?.productPathMap ?? {},
    blogPathMap: options?.blogPathMap ?? {},
  };

  // Prevent double-bootstrapping if the component appears multiple times.
  if (window.__LANG_PICKER_BOOTSTRAPPED__) {
    initAllLanguagePickers(maps);
    return;
  }
  window.__LANG_PICKER_BOOTSTRAPPED__ = true;

  const run = () => initAllLanguagePickers(maps);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  // Re-init after client-side navigations (View Transitions, etc.)
  document.addEventListener?.("astro:page-load", run as EventListener);
}

export function initLanguagePickersFromDom() {
  const run = () => {
    const el = document.querySelector("script[data-lang-picker-maps]") as HTMLScriptElement | null;
    if (!el) {
      initLanguagePickers({ productPathMap: {}, blogPathMap: {} });
      return;
    }

    try {
      const raw = el.textContent || "{}";
      const parsed = JSON.parse(raw) as InitOptions;
      initLanguagePickers(parsed);
    } catch {
      initLanguagePickers({ productPathMap: {}, blogPathMap: {} });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  document.addEventListener?.("astro:page-load", run as EventListener);
}
