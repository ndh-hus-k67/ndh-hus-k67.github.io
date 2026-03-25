// Script to handle Lenis library settings for smooth scrolling
// https://github.com/darkroomengineering/lenis

const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

let __lenisStarted = false;

async function startLenis() {
    if (__lenisStarted) return;
    __lenisStarted = true;
    if (prefersReducedMotion) return;

    // Load code + CSS only when we actually enable smooth scrolling.
    const [{ default: Lenis }] = await Promise.all([
        import("lenis"),
        import("@styles/lenis.css"),
    ]);

    // Ensure CSS selectors apply.
    document.documentElement.classList.add("lenis", "lenis-smooth");

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

// If this module is imported, start immediately (caller is responsible for scheduling/idle).
startLenis();

export {};