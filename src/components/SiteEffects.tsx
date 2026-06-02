"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Progressive-enhancement behaviours shared across the public site:
 * scroll-reveal, light parallax, and the cursor-following card glow.
 * Re-runs on each route change so freshly rendered nodes are wired up.
 */
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let io: IntersectionObserver | null = null;
    let safety: ReturnType<typeof setTimeout> | undefined;

    if (reveals.length) {
      document.documentElement.classList.add("js-reveal");
      const show = (el: Element) => el.classList.add("in");
      const inView = (el: Element) => {
        const r = el.getBoundingClientRect();
        return r.top < (window.innerHeight || 0) * 0.94 && r.bottom > 0;
      };
      try {
        io = new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (e.isIntersecting) {
                show(e.target);
                io?.unobserve(e.target);
              }
            }),
          { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
        );
        reveals.forEach((el) => io!.observe(el));
      } catch {
        io = null;
      }
      requestAnimationFrame(() => reveals.forEach((el) => inView(el) && show(el)));
      // hard safety net — never leave content hidden
      safety = setTimeout(() => reveals.forEach(show), 2600);
    }

    // parallax
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const onScroll = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const s = parseFloat(el.dataset.parallax || "0.1") || 0.1;
        el.style.transform = `translate3d(0, ${y * s}px, 0)`;
      });
    };
    if (parallaxEls.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // card glow follow
    const glowCards = Array.from(document.querySelectorAll<HTMLElement>(".card-glow"));
    const movers: { el: HTMLElement; fn: (e: PointerEvent) => void }[] = [];
    glowCards.forEach((c) => {
      const fn = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        c.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      };
      c.addEventListener("pointermove", fn);
      movers.push({ el: c, fn });
    });

    return () => {
      io?.disconnect();
      if (safety) clearTimeout(safety);
      window.removeEventListener("scroll", onScroll);
      movers.forEach(({ el, fn }) => el.removeEventListener("pointermove", fn));
    };
  }, [pathname]);

  return null;
}
