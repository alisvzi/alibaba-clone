import type { DateRange as DayPickerDateRange } from "react-day-picker";

export type DateRange = DayPickerDateRange;

export type CityOption = {
  label: string;
  code: string;
};

export type TripType = "one-way" | "round-trip";

export type PassengerCounts = {
  adults: number;
  children: number;
  infants: number;
};

export type SearchActiveStep =
  | "origin"
  | "destination"
  | "date"
  | "passengers"
  | null;
