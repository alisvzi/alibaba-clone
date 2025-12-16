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

