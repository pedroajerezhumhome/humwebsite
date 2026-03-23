"use client";

import { useEffect, useState, useCallback } from "react";

const NAV_ITEMS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "The role", href: "#what-they-handle" },
  { label: "Safety", href: "#how-we-find-them" },
  { label: "Pricing", href: "#the-investment" },
  { label: "FAQ", href: "#more-questions" },
];

export default function StickyNav() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));

    const handleScroll = () => {
      const scrollY = window.scrollY + 80;
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 52;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <nav className="page-nav">
      <div className="page-nav-inner">
        <a href="/" className="page-nav-logo">
          <img src="/hum-logo.png" alt="HUM" />
        </a>
        <div className="page-nav-links">
          {NAV_ITEMS.flatMap((item, i) => {
            const elements = [];
            if (i > 0)
              elements.push(
                <span
                  key={`dot-${i}`}
                  className="page-nav-dot"
                  aria-hidden="true"
                />
              );
            elements.push(
              <a
                key={item.href}
                href={item.href}
                className={`page-nav-link${activeId === item.href.slice(1) ? " active" : ""}`}
                onClick={(e) => handleClick(e, item.href)}
              >
                {item.label}
              </a>
            );
            return elements;
          })}
        </div>
      </div>
    </nav>
  );
}
