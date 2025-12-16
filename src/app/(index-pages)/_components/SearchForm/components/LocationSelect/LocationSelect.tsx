"use client";

import DualLocationSelect from "./components/DualLocationSelect";
import SingleLocationSelect from "./components/SingleLocationSelect";
import { CityOption, LocationSelectProps } from "./types";

// --- Constants ---
const DEFAULT_CITIES: CityOption[] = [
  { label: "تهران", code: "THR" },
  { label: "مشهد", code: "MHD" },
  { label: "اصفهان", code: "IFN" },
  { label: "شیراز", code: "SYZ" },
  { label: "اهواز", code: "AWZ" },
  { label: "تبریز", code: "TBZ" },
  { label: "کیش", code: "KIH" },
  { label: "بندر عباس", code: "BND" },
];

export default function LocationSelect(props: LocationSelectProps) {
  const cities = props.cities ?? DEFAULT_CITIES;
  if (props.mode === "single")
    return <SingleLocationSelect {...props} cities={cities} />;
  return <DualLocationSelect {...props} cities={cities} />;
}
