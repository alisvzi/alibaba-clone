import {
  CityOption,
  DateRange,
  PassengerCounts,
  SearchActiveStep,
} from "@/types/search";

export type HotelFormErrors = {
  destination?: string;
  date?: string;
  passengers?: string;
};

export type HotelFormState = {
  destination: CityOption | null;
  dateRange: DateRange | undefined;
  passengers: PassengerCounts | null;
  activeStep: SearchActiveStep;
  errors: HotelFormErrors;
};

