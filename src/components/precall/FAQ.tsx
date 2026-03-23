"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Can you find quality candidates in my area?",
    a: "If you\u2019re in or near a city, absolutely. Our sourcing process is national, and the AI screening layer means we\u2019re not limited by whoever happens to be on a local job board. The more remote the area, the harder it is to find someone, and we\u2019ll be transparent about that on the call. Phase 2 (placement) is contingency, so you only pay if we find someone you love. If we don\u2019t, you don\u2019t pay for that phase.",
  },
  {
    q: "What\u2019s the difference between this and an au pair?",
    a: "An au pair is primarily a childcare arrangement with a live-in cultural exchange component: limited hours, visa restrictions, annual turnover by design. A house manager is a professional running your entire household. No live-in requirement, no cultural exchange complications, no annual replacement cycle. They handle everything from meal prep and errands to maintenance coordination and family logistics. If you have a nanny or au pair already, the house manager handles everything they don\u2019t.",
  },
  {
    q: "What if our needs change over time?",
    a: "Flexibility is built into how we design the role. If you know you\u2019ll want more hours seasonally or your schedule shifts throughout the year, we factor that into the search so your house manager has the availability to grow with you. The Home OS adapts too \u2014 summer routines, school-year schedules, travel. Just tell us your intentions during the process and we\u2019ll plan for it.",
  },
];

function FAQGroup({ items, startIndex, openIndex, setOpenIndex }: {
  items: FAQItem[];
  startIndex: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  return (
    <>
      {items.map((item, i) => {
        const idx = startIndex + i;
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`faq-item${isOpen ? " open" : ""}`}>
            <button
              className="faq-q"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className="faq-icon">{isOpen ? "\u2212" : "+"}</span>
            </button>
            <div className="faq-a" style={{ display: isOpen ? "block" : "none" }}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="faq-list">
        <FAQGroup items={FAQ_ITEMS} startIndex={0} openIndex={openIndex} setOpenIndex={setOpenIndex} />
      </div>
    </div>
  );
}
