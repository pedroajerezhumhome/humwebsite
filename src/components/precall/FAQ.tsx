"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Can you find quality candidates in my area?",
    a: "If you\u2019re in or near a city, absolutely. Our sourcing process is national, and the AI screening layer means we\u2019re not limited by whoever happens to be on a local job board. The more remote the area, the harder it is to find someone \u2014 we\u2019ll be transparent about that on the call. But we\u2019ll always give it a shot, and every placement is backed by our 90-day placement guarantee. If we can\u2019t find the right person in that window, you get a full refund.",
  },
  {
    q: "What\u2019s the difference between this and an au pair?",
    a: "An au pair is primarily a childcare arrangement with a live-in cultural exchange component \u2014 limited hours, visa restrictions, annual turnover by design. A house manager is a professional running your entire household. No live-in requirement, no cultural exchange complications, no annual replacement cycle. They handle everything from meal prep and errands to maintenance coordination and family logistics. If you have a nanny or au pair already, the house manager handles everything they don\u2019t.",
  },
  {
    q: "Is this a subscription? What are the ongoing costs?",
    a: "No subscription. No monthly platform fee. After the one-time setup investment, you simply pay for the hours your house manager works at a flat hourly rate. That rate is fully inclusive \u2014 payroll, insurance, compliance, everything. If your house manager works 20 hours one week and 30 the next, you pay for exactly those hours. That\u2019s it.",
  },
  {
    q: "Can we scale hours up or down once we start?",
    a: "Yes. The 20-hour weekly minimum stays, but above that you have full flexibility. Most families start at 20 and scale to 25\u201330 within a few months once they see how much more is possible. If you need 40 hours over summer and 20 during the school year, that works. The role flexes with your life.",
  },
  {
    q: "What if our needs change seasonally?",
    a: "Built for it. Summer schedules, school-year routines, holidays, travel \u2014 your house manager and Home OS adapt. If you spend summers at a lake house and need a different daily rhythm, we adjust the system. If the kids\u2019 activities shift every semester, the OS updates. The whole point is that the system flexes so you don\u2019t have to re-manage everything when life changes.",
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
