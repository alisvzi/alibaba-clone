import {
  TripType,
  CityOption,
  DateRange,
  PassengerCounts,
  SearchActiveStep,
} from "@/types/search";

export type BusFormErrors = {
  origin?: string;
  destination?: string;
  date?: string;
  passengers?: string;
};

export type BusFormState = {
  tripType: TripType;
  origin: CityOption | null;
  destination: CityOption | null;
  dateRange: DateRange | undefined;
  passengers: PassengerCounts | null;
  activeStep: SearchActiveStep;
  errors: BusFormErrors;
};

