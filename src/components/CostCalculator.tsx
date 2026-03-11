"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  EMPLOYER_BURDEN,
  DEFAULT_BURDEN,
  STATE_NAMES,
} from "@/data/employerBurden";

interface CostCalculatorProps {
  embedded?: boolean;
}

export default function CostCalculator({
  embedded = false,
}: CostCalculatorProps) {
  // Step management
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Buyback rate inputs
  const [userIncome, setUserIncome] = useState("");

  // Step 2: Cost calculator inputs
  const [selectedState, setSelectedState] = useState("California");
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState<number | "">(30);

  const [isDetectingState, setIsDetectingState] = useState(true);

  // Auto-detect state on mount
  useEffect(() => {
    const detectState = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.region && STATE_NAMES.includes(data.region)) {
          setSelectedState(data.region);
        }
      } catch {
        console.log("Could not detect state, using default");
      } finally {
        setIsDetectingState(false);
      }
    };
    detectState();
  }, []);

  // Format currency
  const fmt = useCallback(
    (n: number, decimals = 2) =>
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    []
  );

  // Calculate buyback rate (Step 1)
  const buybackCalc = useMemo(() => {
    const rawIncome = parseInt(userIncome.replace(/[^0-9]/g, "")) || 0;
    const userHourlyValue = rawIncome / 2000;
    const buybackRate = userHourlyValue / 4;
    return {
      rawIncome,
      userHourlyValue,
      buybackRate,
      isValid: rawIncome >= 50000,
    };
  }, [userIncome]);

  // Calculate costs (Step 2)
  const costCalc = useMemo(() => {
    const rate = hourlyRate || 0;

    const weeklyCost = rate * hoursPerWeek;
    const monthlyCost = weeklyCost * 4.33;

    const isWithinBudget = rate < buybackCalc.buybackRate;
    const savings = buybackCalc.buybackRate - rate;

    // ROI calculation
    const weeklyTimeValue = buybackCalc.userHourlyValue * hoursPerWeek;
    const weeklyNetGain = weeklyTimeValue - weeklyCost;
    const monthlyNetGain = weeklyNetGain * 4.33;
    const roiMultiplier = rate > 0 ? buybackCalc.userHourlyValue / rate : 0;

    return {
      hourlyRate: rate,
      weeklyCost,
      monthlyCost,
      isWithinBudget,
      savings,
      weeklyTimeValue,
      weeklyNetGain,
      monthlyNetGain,
      roiMultiplier,
      isValid: rate > 0,
    };
  }, [hourlyRate, hoursPerWeek, buybackCalc.buybackRate, buybackCalc.userHourlyValue]);

  // Handle income input
  const handleIncomeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      if (raw.length > 0) {
        const formatted = parseInt(raw).toLocaleString("en-US");
        setUserIncome(formatted);
      } else {
        setUserIncome("");
      }
    },
    []
  );

  const handleContinue = () => {
    if (buybackCalc.isValid) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className={`cost-calc-container${embedded ? " embedded" : ""}`}>
      {/* Step 1: Discover Your Buyback Rate */}
      {step === 1 && (
        <>
          <div className="cost-calc-header">
            <h2>What&apos;s your time really worth?</h2>
            <p>
              Your buyback rate is the maximum you should pay someone to handle
              tasks you&apos;re currently doing yourself.
            </p>
          </div>

          <div className="cost-calc-inputs">
            <div className="cost-calc-field">
              <label htmlFor="income-input">Your household income</label>
              <div className="income-input-wrap">
                <span className="currency-symbol">$</span>
                <input
                  id="income-input"
                  type="text"
                  className="cost-calc-input"
                  placeholder="250,000"
                  inputMode="numeric"
                  value={userIncome}
                  onChange={handleIncomeInput}
                />
              </div>
            </div>
          </div>

          {buybackCalc.isValid && (
            <div className="buyback-results">
              <div className="buyback-stat">
                <span className="buyback-label">Your household hourly value</span>
                <span className="buyback-value">
                  ${fmt(buybackCalc.userHourlyValue, 0)}/hr
                </span>
              </div>
              <div className="buyback-stat featured">
                <span className="buyback-label">Your household buyback rate</span>
                <span className="buyback-value highlight">
                  ${fmt(buybackCalc.buybackRate, 0)}/hr
                </span>
              </div>
              <p className="buyback-explanation">
                If you can delegate a task for less than{" "}
                <strong>${fmt(buybackCalc.buybackRate, 0)}/hr</strong>, you
                should. Your time is worth more doing higher-value work.
              </p>

              <button className="continue-btn" onClick={handleContinue}>
                See if a House Manager fits your budget
              </button>
            </div>
          )}
        </>
      )}

      {/* Step 2: Cost Calculator */}
      {step === 2 && (
        <>
          <div className="cost-calc-header">
            <button className="back-link" onClick={handleBack}>
              ← Back
            </button>
            <h2>Your House Manager investment</h2>
            <p>
              Your buyback rate:{" "}
              <strong>${fmt(buybackCalc.buybackRate, 0)}/hr</strong>
            </p>
          </div>

          <div className="cost-calc-inputs">
            {/* Hourly Rate Input */}
            <div className="cost-calc-field">
              <label htmlFor="hourly-rate-input">
                House Manager hourly rate
              </label>
              <div className="income-input-wrap">
                <span className="currency-symbol">$</span>
                <input
                  id="hourly-rate-input"
                  type="number"
                  className="cost-calc-input"
                  placeholder="30"
                  inputMode="numeric"
                  min={15}
                  max={75}
                  value={hourlyRate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHourlyRate(val === "" ? "" : Number(val));
                  }}
                />
                <span className="rate-suffix">/hr</span>
              </div>
            </div>

            {/* Hours Per Week Slider */}
            <div className="cost-calc-field">
              <label htmlFor="hours-slider">
                Hours per week:{" "}
                <strong className="rate-display">{hoursPerWeek} hrs</strong>
              </label>
              <div className="slider-container">
                <span className="slider-min">10</span>
                <input
                  id="hours-slider"
                  type="range"
                  min={10}
                  max={40}
                  step={1}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="cost-calc-slider"
                />
                <span className="slider-max">40</span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="cost-calc-breakdown">
            <div className="breakdown-header">Your Investment</div>
            <div className="breakdown-row">
              <span className="breakdown-label">Hourly rate</span>
              <span className="breakdown-value highlight">
                ${fmt(costCalc.hourlyRate, 0)}
              </span>
            </div>
            <div className="breakdown-divider"></div>
            <div className="breakdown-row">
              <span className="breakdown-label">
                Weekly ({hoursPerWeek} hrs)
              </span>
              <span className="breakdown-value">
                ${fmt(costCalc.weeklyCost, 0)}
              </span>
            </div>
            <div className="breakdown-row total">
              <span className="breakdown-label">Monthly investment</span>
              <span className="breakdown-value highlight">
                ${fmt(costCalc.monthlyCost, 0)}
              </span>
            </div>
          </div>

          {/* ROI Section */}
          <div className="cost-calc-roi-box">
            <div className="breakdown-header">Your Return</div>
            <div className="breakdown-row">
              <span className="breakdown-label">Value of time reclaimed</span>
              <span className="breakdown-value">
                ${fmt(costCalc.weeklyTimeValue, 0)}/wk
              </span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Net value gained</span>
              <span className="breakdown-value highlight">
                ${fmt(costCalc.monthlyNetGain, 0)}/mo
              </span>
            </div>
            <div className="breakdown-row total">
              <span className="breakdown-label">ROI</span>
              <span className="breakdown-value highlight roi-big">
                {fmt(costCalc.roiMultiplier, 1)}x
              </span>
            </div>
          </div>

          {/* Verdict */}
          <div
            className={`verdict-box ${costCalc.isWithinBudget ? "success" : "neutral"}`}
          >
            {costCalc.isWithinBudget ? (
              <>
                <div className="verdict-icon">✓</div>
                <div className="verdict-content">
                  <strong>This fits your buyback rate.</strong>
                  <p>
                    At ${fmt(costCalc.hourlyRate, 0)}/hr, a House Manager costs{" "}
                    <strong>${fmt(costCalc.savings, 0)}/hr less</strong> than
                    your ${fmt(buybackCalc.buybackRate, 0)}/hr threshold. Your
                    time is worth more doing higher-value work.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="verdict-content">
                  <strong>The math is close.</strong>
                  <p>
                    But consider the intangible value: stress reduction, quality
                    time with family, and mental bandwidth reclaimed.
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
