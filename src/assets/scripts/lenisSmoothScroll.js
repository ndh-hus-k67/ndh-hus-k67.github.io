import "@styles/lenis.css";

import Lenis from "lenis";

// Script to handle Lenis library settings for smooth scrolling
// https://github.com/darkroomengineering/lenis

const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

function initLenis() {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
        autoRaf: true,
    });

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) lenis.stop();
            else lenis.start();
        },
        { passive: true },
    );
}

if (!prefersReducedMotion) {
    if ("requestIdleCallback" in window) {
        // Give the browser room to paint before starting a RAF-driven library.
        window.requestIdleCallback(initLenis, { timeout: 2000 });
    } else {
        window.addEventListener("load", initLenis, { once: true });
    }
}