"use client";

import { useEffect, useState } from "react";

/** Eased count-up of a number, formatted FR. Shows the final value immediately
 *  when reduced motion is requested. */
export default function CountUp({
  value,
  durationMs = 1200,
  suffix = "",
  className,
}: {
  value: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const k = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * k));
      if (p < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  return (
    <span className={className}>
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}
