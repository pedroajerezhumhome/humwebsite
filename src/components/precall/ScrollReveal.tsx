"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) el.target.classList.add("v");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
