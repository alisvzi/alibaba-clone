import { initialFilters } from "@/data/mock-flights";
import { Flight } from "@/types/flight";

export const SORT_KEYS = {
  PRICE: "price",
  TIME: "time",
  DURATION: "duration",
} as const;

export type SortKey = (typeof SORT_KEYS)[keyof typeof SORT_KEYS];

const extractMinutesFromDuration = (duration: string): number => {
  const match = duration.match(/(\d+)\s*ساعت.*?(\d+)\s*دقیقه/);
  if (match) {
    return parseInt(match[1]) * 60 + parseInt(match[2]);
  }
  return 0;
};


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
