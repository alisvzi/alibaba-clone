"use client";

import { useMemo, useState } from "react";
import DateSlider from "./components/DateSlider";
import FAQ from "./components/FAQ";
import FilterSidebar from "./components/FilterSidebar";
import FlightCard from "./components/FlightCard";
import SearchBar from "./components/SearchBar";

const flights = [
  {
    id: 1,
    airline: "ماهان",
    airlineLogo: "/mahan-airline-logo.jpg",
    flightNumber: "W5 1082",
    departureTime: "06:00",
    arrivalTime: "07:25",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Airbus A310",
    price: 2850000,
    class: "اکونومی",
    type: "سیستمی",
    seatsLeft: 5,
    baggage: "20 کیلوگرم",
  },
  {
    id: 2,
    airline: "ایران ایر",
    airlineLogo: "/iran-air-airline-logo.jpg",
    flightNumber: "IR 352",
    departureTime: "08:30",
    arrivalTime: "09:55",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Fokker 100",
    price: 3200000,
    class: "اکونومی",
    type: "سیستمی",
    seatsLeft: 12,
    baggage: "20 کیلوگرم",
  },
  {
    id: 3,
    airline: "آسمان",
    airlineLogo: "/aseman-airline-logo.jpg",
    flightNumber: "EP 513",
    departureTime: "10:15",
    arrivalTime: "11:40",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "ATR 72",
    price: 2650000,
    class: "اکونومی",
    type: "چارتر",
    seatsLeft: 3,
    baggage: "20 کیلوگرم",
  },
  {
    id: 4,
    airline: "کیش ایر",
    airlineLogo: "/kish-air-airline-logo.jpg",
    flightNumber: "Y9 7062",
    departureTime: "12:45",
    arrivalTime: "14:10",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "MD-82",
    price: 2450000,
    class: "اکونومی",
    type: "چارتر",
    seatsLeft: 8,
    baggage: "20 کیلوگرم",
  },
  {
    id: 5,
    airline: "زاگرس",
    airlineLogo: "/zagros-airline-logo.jpg",
    flightNumber: "IZG 4107",
    departureTime: "15:30",
    arrivalTime: "16:55",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Airbus A320",
    price: 2980000,
    class: "اکونومی",
    type: "سیستمی",
    seatsLeft: 15,
    baggage: "20 کیلوگرم",
  },
  {
    id: 6,
    airline: "وارش",
    airlineLogo: "/varesh-airline-logo.jpg",
    flightNumber: "VR 5802",
    departureTime: "18:00",
    arrivalTime: "19:25",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Boeing 737",
    price: 3100000,
    class: "اکونومی",
    type: "سیستمی",
    seatsLeft: 6,
    baggage: "20 کیلوگرم",
  },
  {
    id: 7,
    airline: "قشم ایر",
    airlineLogo: "/qeshm-air-airline-logo.jpg",
    flightNumber: "QB 1282",
    departureTime: "20:30",
    arrivalTime: "21:55",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Airbus A320",
    price: 2750000,
    class: "اکونومی",
    type: "چارتر",
    seatsLeft: 4,
    baggage: "20 کیلوگرم",
  },
];

export default function FlightsPage() {
  const [sortBy, setSortBy] = useState<"price" | "time" | "duration">("price");
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 10000000,
    airlines: [] as string[],
    ticketTypes: [] as string[],
    times: [] as string[],
    seatsMinimum: 1,
  });

  // Filter and sort flights
  const sortedFlights = useMemo(() => {
    const filtered = flights.filter((flight) => {
      // Price filter
      if (flight.price < filters.priceMin || flight.price > filters.priceMax) {
        return false;
      }

      // Airline filter
      if (
        filters.airlines.length > 0 &&
        !filters.airlines.includes(flight.airline)
      ) {
        return false;
      }

      // Ticket type filter
      if (
        filters.ticketTypes.length > 0 &&
        !filters.ticketTypes.includes(flight.type)
      ) {
        return false;
      }

      // Seats available filter
      if (flight.seatsLeft < filters.seatsMinimum) {
        return false;
      }

      return true;
    });

    // Sort flights
    const sorted = [...filtered];
    if (sortBy === "price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "time") {
      sorted.sort((a, b) => {
        const timeA = parseInt(a.departureTime.split(":")[0]);
        const timeB = parseInt(b.departureTime.split(":")[0]);
        return timeA - timeB;
      });
    } else if (sortBy === "duration") {
      sorted.sort((a, b) => {
        const extractMinutes = (duration: string) => {
          const match = duration.match(/(\d+)\s*ساعت.*?(\d+)\s*دقیقه/);
          if (match) {
            return parseInt(match[1]) * 60 + parseInt(match[2]);
          }
          return 0;
        };
        return extractMinutes(a.duration) - extractMinutes(b.duration);
      });
    }

    return sorted;
  }, [sortBy, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]" dir="rtl">
      <SearchBar />
      <DateSlider />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-[280px] shrink-0 hidden lg:block">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </aside>

          {/* Flight Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6b7280]">مرتب‌سازی:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy("price")}
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                      sortBy === "price"
                        ? "bg-[#fff3e0] text-[#f57c00]"
                        : "bg-white text-[#374151] hover:bg-gray-50"
                    }`}
                  >
                    ارزان‌ترین
                  </button>
                  <button
                    onClick={() => setSortBy("time")}
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                      sortBy === "time"
                        ? "bg-[#fff3e0] text-[#f57c00]"
                        : "bg-white text-[#374151] hover:bg-gray-50"
                    }`}
                  >
                    زودترین
                  </button>
                  <button
                    onClick={() => setSortBy("duration")}
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                      sortBy === "duration"
                        ? "bg-[#fff3e0] text-[#f57c00]"
                        : "bg-white text-[#374151] hover:bg-gray-50"
                    }`}
                  >
                    کوتاه‌ترین
                  </button>
                </div>
              </div>
              <span className="text-sm text-[#6b7280]">
                {sortedFlights.length} از {flights.length} پرواز
              </span>
            </div>

            {/* Flight Cards */}
            <div className="space-y-3">
              {sortedFlights.length > 0 ? (
                sortedFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#6b7280]">
                    هیچ پروازی با این معیارها یافت نشد
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </main>
    </div>
  );
}
