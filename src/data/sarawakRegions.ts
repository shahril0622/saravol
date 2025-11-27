export const SARAWAK_REGIONS = [
  "Kuching",
  "Samarahan", 
  "Serian",
  "Bau",
  "Sibu",
  "Miri",
  "Bintulu",
  "Limbang",
  "Lawas",
  "Kapit",
  "Mukah",
  "Sri Aman",
  "Betong",
] as const;

export type SarawakRegion = typeof SARAWAK_REGIONS[number];

export const OPPORTUNITY_CATEGORIES = [
  "Animal Welfare",
  "Food Aid",
  "Environment",
  "Community Events",
  "Education",
] as const;

export type OpportunityCategory = typeof OPPORTUNITY_CATEGORIES[number];
