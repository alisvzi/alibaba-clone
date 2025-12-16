import {
  CityOption,
  DateRange,
  PassengerCounts,
  SearchActiveStep,
} from "@/types/search";

export type InternationalTripType = "one-way" | "round-trip" | "multi-city";

export type InternationalFormErrors = {
  origin?: string;
  destination?: string;
  date?: string;
  passengers?: string;
};

export type InternationalFormState = {
  tripType: InternationalTripType;
  origin: CityOption | null;
  destination: CityOption | null;
  dateRange: DateRange | undefined;
  passengers: PassengerCounts | null;
  activeStep: SearchActiveStep;
  errors: InternationalFormErrors;
};

