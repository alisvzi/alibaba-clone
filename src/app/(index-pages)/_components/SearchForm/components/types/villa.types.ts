import { CityOption, DateRange, PassengerCounts } from "@/types/search";

export type VillaActiveStep = "destination" | "date" | "passengers" | null;

export type VillaFormErrors = {
  destination?: string;
  date?: string;
  passengers?: string;
};

export type VillaFormState = {
  destination: CityOption | null;
  dateRange: DateRange | undefined;
  passengers: PassengerCounts | null;
  activeStep: VillaActiveStep;
  errors: VillaFormErrors;
};

