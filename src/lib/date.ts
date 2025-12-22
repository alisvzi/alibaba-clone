import { format } from "date-fns";
import { enUS as localeGregorian } from "date-fns/locale";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const formatJalaliYMD = (date: Date) => {
  const d = new DateObject({
    date,
    calendar: persian,
    locale: persian_fa,
  });
  return d.format("YYYY-MM-DD");
};

export const formatCustomDate = (
  date: Date | undefined,
  calendarType: "jalali" | "gregorian" = "jalali",
  formatStr: string = "D MMMM"
) => {
  if (!date) return "";
  if (calendarType === "jalali") {
    const d = new DateObject({
      date,
      calendar: persian,
      locale: persian_fa,
    });
    return d.format(formatStr);
  }
  // Convert react-date-object format to date-fns format if needed
  // For now, handle common case
  const dateFnsFormat = formatStr === "D MMMM" ? "d MMMM" : formatStr;
  return format(date, dateFnsFormat, { locale: localeGregorian });
};

