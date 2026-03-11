/**
 * Employer burden percentages by state
 * These percentages include: payroll taxes, workers comp, unemployment insurance, etc.
 *
 * TODO: Replace placeholder values with actual data from user
 */

export const EMPLOYER_BURDEN: Record<string, number> = {
  "Alabama": 12.5,
  "Alaska": 14.0,
  "Arizona": 13.0,
  "Arkansas": 12.5,
  "California": 18.5,
  "Colorado": 13.5,
  "Connecticut": 15.0,
  "Delaware": 13.0,
  "Florida": 11.5,
  "Georgia": 12.0,
  "Hawaii": 16.0,
  "Idaho": 12.5,
  "Illinois": 14.5,
  "Indiana": 12.0,
  "Iowa": 13.0,
  "Kansas": 12.5,
  "Kentucky": 13.0,
  "Louisiana": 12.5,
  "Maine": 14.0,
  "Maryland": 14.0,
  "Massachusetts": 15.5,
  "Michigan": 14.0,
  "Minnesota": 14.5,
  "Mississippi": 12.0,
  "Missouri": 12.5,
  "Montana": 13.5,
  "Nebraska": 12.5,
  "Nevada": 13.0,
  "New Hampshire": 12.5,
  "New Jersey": 16.0,
  "New Mexico": 13.0,
  "New York": 17.0,
  "North Carolina": 12.0,
  "North Dakota": 12.5,
  "Ohio": 13.5,
  "Oklahoma": 12.0,
  "Oregon": 14.5,
  "Pennsylvania": 14.5,
  "Rhode Island": 15.0,
  "South Carolina": 12.0,
  "South Dakota": 11.5,
  "Tennessee": 12.0,
  "Texas": 11.5,
  "Utah": 12.5,
  "Vermont": 14.0,
  "Virginia": 12.5,
  "Washington": 15.5,
  "West Virginia": 13.5,
  "Wisconsin": 14.0,
  "Wyoming": 12.0,
  "District of Columbia": 15.0,
};

// Default fallback percentage if state not found
export const DEFAULT_BURDEN = 13.0;

// Get all state names for dropdown
export const STATE_NAMES = Object.keys(EMPLOYER_BURDEN).sort();
