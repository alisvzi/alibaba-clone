"use client";

import { useMemo, useState } from "react";

import { QuestionBox } from "@/components/common/QuestionBox";
import { flights, initialFilters } from "@/data/mock-flights";
import {
  filterFlights,
  SORT_KEYS,
  sortFlights,
  SortKey,
} from "@/utils/flight-helper";
import DateSlider from "./components/DateSlider";
import FilterSidebar from "./components/FilterSidebar";
import FlightCard from "./components/FlightCard/FlightCard";
import FlightSearchHeaderPortal from "./components/FlightSearchHeaderPortal";
import { SortButton } from "./components/SortButton";
import { FLIGHT_FAQS, SORT_LABELS } from "./constants";

export default function FlightsPage() {
  const [sortBy, setSortBy] = useState<SortKey>(SORT_KEYS.PRICE);
  const [filters, setFilters] = useState(initialFilters);

  const sortedFlights = useMemo(() => {
    const filtered = filterFlights(flights, filters);
    return sortFlights(filtered, sortBy);
  }, [sortBy, filters]);

  const handleFilterChange = (newFilters: typeof initialFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-muted" dir="rtl">
      <FlightSearchHeaderPortal />
      <DateSlider />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-[280px] shrink-0 hidden lg:block sticky top-24 h-fit">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  مرتب‌سازی:
                </span>
                <div className="flex gap-2">
                  {Object.entries(SORT_LABELS).map(([key, label]) => (
                    <SortButton
                      key={key}
                      sortKey={key as SortKey}
                      label={label}
                      isActive={sortBy === key}
                      onClick={setSortBy}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {sortedFlights.length} از {flights.length} پرواز
              </span>
            </div>

            <div className="space-y-3">
              {sortedFlights.length > 0 ? (
                sortedFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    هیچ پروازی با این معیارها یافت نشد
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <QuestionBox
          title="سوالات متداول پرواز تهران به شیراز"
          items={FLIGHT_FAQS}
        />
      </main>
    </div>
  );
}
