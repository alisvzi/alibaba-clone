import { initialFilters } from "@/data/mock-flights";
import { Flight } from "@/types/flight";

export const SORT_KEYS = {
  PRICE: "price",
  TIME: "time",
  DURATION: "duration",
} as const;

export type SortKey = (typeof SORT_KEYS)[keyof typeof SORT_KEYS];

/**
 * مدت زمان پرواز را از رشته فارسی به دقیقه تبدیل می‌کند.
 * مثال: "1 ساعت و 25 دقیقه" -> 85
 */
const extractMinutesFromDuration = (duration: string): number => {
  const match = duration.match(/(\d+)\s*ساعت.*?(\d+)\s*دقیقه/);
  if (match) {
    // گروه 1: ساعت، گروه 2: دقیقه
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  }
  return 0; // در صورت عدم تطابق
};

/**
 * پروازها را بر اساس کلید مرتب‌سازی داده شده مرتب می‌کند.
 */
export const sortFlights = (flights: Flight[], sortBy: SortKey): Flight[] => {
  const sorted = [...flights];

  if (sortBy === SORT_KEYS.PRICE) {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === SORT_KEYS.TIME) {
    sorted.sort((a, b) => {
      const timeA = parseInt(a.departureTime.split(":")[0]);
      const timeB = parseInt(b.departureTime.split(":")[0]);
      return timeA - timeB;
    });
  } else if (sortBy === SORT_KEYS.DURATION) {
    sorted.sort((a, b) => {
      return (
        extractMinutesFromDuration(a.duration) -
        extractMinutesFromDuration(b.duration)
      );
    });
  }
  return sorted;
};

/**
 * پروازها را بر اساس فیلترهای اعمال‌شده فیلتر می‌کند.
 */
export const filterFlights = (
  flights: Flight[],
  filters: typeof initialFilters
): Flight[] => {
  return flights.filter((flight) => {
    if (flight.price < filters.priceMin || flight.price > filters.priceMax) {
      return false;
    }

    if (
      filters.airlines.length > 0 &&
      !filters.airlines.includes(flight.airline)
    ) {
      return false;
    }

    if (
      filters.ticketTypes.length > 0 &&
      !filters.ticketTypes.includes(flight.type)
    ) {
      return false;
    }

    if (flight.seatsLeft < filters.seatsMinimum) {
      return false;
    }

    return true;
  });
};
