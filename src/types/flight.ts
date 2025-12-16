export interface Flight {
  id: number;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  duration: string;
  aircraft: string;
  price: number;
  class: string;
  type: string;
  seatsLeft: number;
  baggage: string;
}

export interface FlightFilters {
  priceMin: number;
  priceMax: number;
  airlines: string[];
  ticketTypes: string[];
  times: string[];
  seatsMinimum: number;
}
