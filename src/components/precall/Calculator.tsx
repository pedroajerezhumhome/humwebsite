"use client";

import { useState, useCallback } from "react";

interface CalculatorProps {
  insightPrefix?: string;
  lowIncomeExtra?: string;
}

export default function Calculator({
  insightPrefix = "your family",
  lowIncomeExtra = "the time you get back with your family, your career, and yourself",
}: CalculatorProps) {
  const [value, setValue] = useState("");
  const [hrRate, setHrRate] = useState("...");
  const [bbRate, setBbRate] = useState("...");
  const [showResults, setShowResults] = useState(false);
  const [insight, setInsight] = useState("");
  const [showInsight, setShowInsight] = useState(false);

  const fmt = useCallback(
    (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 }),
    []
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      if (raw.length > 0) {
        const formatted = parseInt(raw).toLocaleString("en-US");
        setValue(formatted);
      } else {
        setValue("");
        setShowResults(false);
        setShowInsight(false);
        return;
      }
      const inc = parseInt(raw);
      if (inc < 50000) {
        setShowResults(false);
        setShowInsight(false);
        return;
      }
      const hr = inc / 2000;
      const bb = hr / 4.5;
      setHrRate("$" + fmt(Math.round(hr)) + "/hr");
      setBbRate("$" + fmt(Math.round(bb)) + "/hr");
      setShowResults(true);

      if (bb > 30) {
        setInsight(
          `Every hour spent on household tasks costs ${insightPrefix} <strong>$${fmt(Math.round(hr))}</strong> in lost opportunity. While delegating costs <strong>$30 to $35</strong>. The gap is significant.`
        );
      } else {
        setInsight(
          `At your income level, delegating is close to breakeven on math alone, before you factor in ${lowIncomeExtra}.`
        );
      }
      setShowInsight(true);
    },
    [fmt, insightPrefix, lowIncomeExtra]
  );

  return (
    <div className="calc-box">
      <div className="calc-label">Your household income</div>
      <div className="calc-input-wrap">
        <span>$</span>
        <input
          type="text"
          className="calc-input"
          placeholder="250,000"
          inputMode="numeric"
          value={value}
          onChange={handleInput}
        />
      </div>
      <div className={`calc-results${showResults ? " on" : ""}`}>
        <div className="calc-row">
          <span className="calc-row-l">Your hourly rate</span>
          <span className="calc-row-v">{hrRate}</span>
        </div>
        <div className="calc-row">
          <span className="calc-row-l">Your buyback rate</span>
          <span className="calc-row-v hl">{bbRate}</span>
        </div>
        <div className="calc-row">
          <span className="calc-row-l">House manager cost</span>
          <span className="calc-row-v">$30 to $35/hr</span>
        </div>
      </div>
      {showInsight && (
        <div
          className={`calc-insight${showInsight ? " on" : ""}`}
          dangerouslySetInnerHTML={{ __html: insight }}
        />
      )}
    </div>
  );
}
