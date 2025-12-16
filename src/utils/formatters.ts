export const convertToPersian = (num: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .split("")
    .map((digit) => persianDigits[parseInt(digit)] || digit)
    .join("");
};

export const formatPrice = (price: number): string => {
  const formatted = (price / 1000000).toFixed(1);
  return `${convertToPersian(formatted)} میلیون`;
};
