import { CityOption } from "@/types/search";

export const CITIES: CityOption[] = [
  { label: "تهران", code: "THR" },
  { label: "مشهد", code: "MHD" },
  { label: "اصفهان", code: "IFN" },
  { label: "شیراز", code: "SYZ" },
  { label: "اهواز", code: "AWZ" },
  { label: "تبریز", code: "TBZ" },
  { label: "کیش", code: "KIH" },
  { label: "بندر عباس", code: "BND" },
];

export const getCityName = (code: string): string => {
  const city = CITIES.find((c) => c.code === code);
  return city ? city.label : code;
};
