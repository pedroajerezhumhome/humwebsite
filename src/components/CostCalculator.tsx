"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  EMPLOYER_BURDEN,
  DEFAULT_BURDEN,
  STATE_NAMES,
} from "@/data/employerBurden";

interface CostCalculatorProps {
  showRoi?: boolean;
  embedded?: boolean;
}

export default function CostCalculator({
  showRoi = true,
  embedded = false,
}: CostCalculatorProps) {
  const [selectedState, setSelectedState] = useState("California");
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const hourlyRate = 30; // Fixed base rate
  const [userIncome, setUserIncome] = useState("");
  const [isDetectingState, setIsDetectingState] = useState(true);
  const [showRoiSection, setShowRoiSection] = useState(false);

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
        // Fallback to California if detection fails
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

  // Calculate costs
  const calculations = useMemo(() => {
    const burdenPercent = EMPLOYER_BURDEN[selectedState] || DEFAULT_BURDEN;
    const burdenAmount = hourlyRate * (burdenPercent / 100);
    const margin = hourlyRate * 0.1;
    const totalCost = hourlyRate + burdenAmount + margin;

    // Weekly and monthly costs
    const weeklyCost = totalCost * hoursPerWeek;
    const monthlyCost = weeklyCost * 4.33; // Average weeks per month

    // Buyback rate calculation
    const rawIncome = parseInt(userIncome.replace(/[^0-9]/g, "")) || 0;
    const userHourlyValue = rawIncome / 2000;
    const buybackRate = userHourlyValue / 4; // Max you should pay to delegate
    const shouldDelegate = totalCost < buybackRate;
    const savings = buybackRate - totalCost; // How much under buyback rate

    return {
      burdenPercent,
      burdenAmount,
      margin,
      totalCost,
      weeklyCost,
      monthlyCost,
      userHourlyValue,
      buybackRate,
      shouldDelegate,
      savings,
      hasValidIncome: rawIncome >= 50000,
    };
  }, [selectedState, hourlyRate, hoursPerWeek, userIncome]);

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

  return (
    <div className={`cost-calc-container${embedded ? " embedded" : ""}`}>
      {/* Header */}
      <div className="cost-calc-header">
        <h2>What does it really cost to hire a House Manager?</h2>
        <p>
          See your total cost when HUM acts as employer of record.
        </p>
      </div>

      {/* Inputs Section */}
      <div className="cost-calc-inputs">
        {/* State Selection */}
        <div className="cost-calc-field">
          <label htmlFor="state-select">
            Your state
            {isDetectingState && (
              <span className="detecting"> (detecting...)</span>
            )}
          </label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="cost-calc-select"
          >
            {STATE_NAMES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
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
            ${fmt(calculations.totalCost)}
          </span>
        </div>
        <div className="breakdown-divider"></div>
        <div className="breakdown-row">
          <span className="breakdown-label">Weekly ({hoursPerWeek} hrs)</span>
          <span className="breakdown-value">
            ${fmt(calculations.weeklyCost, 0)}
          </span>
        </div>
        <div className="breakdown-row total">
          <span className="breakdown-label">Monthly investment</span>
          <span className="breakdown-value highlight">
            ${fmt(calculations.monthlyCost, 0)}
          </span>
        </div>
      </div>

      {/* ROI Section */}
      {showRoi && (
        <div className="cost-calc-roi">
          <button
            className="roi-toggle"
            onClick={() => setShowRoiSection(!showRoiSection)}
          >
            <span className="roi-icon">
              {showRoiSection ? "−" : "+"}
            </span>
            What&apos;s your time worth?
          </button>

          {showRoiSection && (
            <div className="roi-content">
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

              {calculations.hasValidIncome && (
                <div className="roi-results">
                  <div className="roi-stat">
                    <span className="roi-label">Your hourly value</span>
                    <span className="roi-value">
                      ${fmt(calculations.userHourlyValue, 0)}/hr
                    </span>
                  </div>
                  <div className="roi-stat">
                    <span className="roi-label">Your buyback rate</span>
                    <span className="roi-value">
                      ${fmt(calculations.buybackRate, 0)}/hr
                    </span>
                  </div>
                  <div className="roi-insight">
                    {calculations.shouldDelegate ? (
                      <>
                        <strong>You should delegate.</strong> At ${fmt(calculations.totalCost)}/hr,
                        a House Manager costs <strong>${fmt(calculations.savings, 0)}/hr less</strong> than
                        your buyback rate. Your time is worth more doing higher-value work.
                      </>
                    ) : (
                      <>
                        The math is close, but consider the intangible value: stress
                        reduction, quality time with family, and mental
                        bandwidth reclaimed.
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="cost-calc-disclaimer">
        <p>
          * Employer burden includes payroll taxes, workers&apos; compensation,
          unemployment insurance, and related costs. Actual rates may vary.
        </p>
      </div>
    </div>
  );
}
