"use client";

import { useEffect, useState } from "react";

export default function HelloBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`hello-bar${visible ? " show" : ""}`}>
      <a href="/partner/for-him" className="hb-btn primary">
        Share with Your Partner
      </a>
      <a href="/booked" className="hb-btn secondary">
        Back to Your Call Details
      </a>
    </div>
  );
}
