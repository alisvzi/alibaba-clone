import {
  TripType,
  CityOption,
  DateRange,
  PassengerCounts,
  SearchActiveStep,
} from "@/types/search";

export type TrainFormErrors = {
  origin?: string;
  destination?: string;
  date?: string;
  passengers?: string;
};

export type TrainFormState = {
  tripType: TripType;
  origin: CityOption | null;
  destination: CityOption | null;
  dateRange: DateRange | undefined;
  passengers: PassengerCounts | null;
  activeStep: SearchActiveStep;
  errors: TrainFormErrors;
};

