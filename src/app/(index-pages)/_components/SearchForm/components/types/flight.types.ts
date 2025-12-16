import {
  TripType,
  CityOption,
  DateRange,
  PassengerCounts,
  SearchActiveStep,
} from "@/types/search";

export type FlightFormErrors = {
  origin?: string;
  destination?: string;
  date?: string;
  passengers?: string;
};

export type FlightFormState = {
  tripType: TripType;
  origin: CityOption | null;
  destination: CityOption | null;
  dateRange: DateRange | undefined;
  passengers: PassengerCounts | null;
  activeStep: SearchActiveStep;
  errors: FlightFormErrors;
};

export type PersistedFlightSearchState = {
  tripType: TripType;
  origin: CityOption | null;
  destination: CityOption | null;
  dateRange: {
    from?: string;
    to?: string;
  } | null;
  passengers: PassengerCounts | null;
};

