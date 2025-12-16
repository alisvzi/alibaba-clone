import { CityOption } from "@/types/search";

export type LocationSelectProps = {
  mode: "single" | "dual";
  placeholder?: string;
  originPlaceholder?: string;
  destinationPlaceholder?: string;
  value?: CityOption | null;
  originValue?: CityOption | null;
  destinationValue?: CityOption | null;
  onChange?: (city: CityOption) => void;
  onOriginChange?: (city: CityOption) => void;
  onDestinationChange?: (city: CityOption) => void;
  hasError?: boolean;
  errorMessage?: string;
  cities?: CityOption[];
};
