"use client";

import { useEffect } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * One scroll/pointer loop for the whole home page:
 * - [data-reveal] elements get .is-in the first time they enter the viewport
 * - [data-scroll] elements get --pass (0 → 1 while crossing the viewport)
 *   and --stick (0 → 1 while a tall element is pinned under a sticky child)
 * - the document gets --mx / --my (-1 → 1) from the pointer, for parallax
 */
export default function ScrollFX() {
  useEffect(() => {
    const root = document.documentElement;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => io.observe(el));

    const scrollEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll]")
    );

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of scrollEls) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const pass = clamp((vh - r.top) / (r.height + vh));
        const stick =
          r.height > vh ? clamp(-r.top / (r.height - vh)) : pass;
        el.style.setProperty("--pass", pass.toFixed(4));
        el.style.setProperty("--stick", stick.toFixed(4));
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      root.style.setProperty(
        "--mx",
        ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3)
      );
      root.style.setProperty(
        "--my",
        ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3)
      );
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return null;
}
