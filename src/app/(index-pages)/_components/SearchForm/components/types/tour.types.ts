import { CityOption, DateRange, PassengerCounts, SearchActiveStep } from "@/types/search";

export type TourFormErrors = {
  origin?: string;
  destination?: string;
  date?: string;
  passengers?: string;
};

export type TourFormState = {
  origin: CityOption | null;
  destination: CityOption | null;
  dateRange: DateRange | undefined;
  passengers: PassengerCounts | null;
  activeStep: SearchActiveStep;
  errors: TourFormErrors;
};

