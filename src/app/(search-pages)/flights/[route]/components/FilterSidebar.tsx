"use client";

import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/utils/formatters";
import { useState } from "react";
import CheckboxItem from "./CheckboxItem";
import FilterSection from "./FilterSection";

const airlines = [
  { name: "ماهان", count: 12 },
  { name: "ایران ایر", count: 8 },
  { name: "آسمان", count: 6 },
  { name: "کیش ایر", count: 5 },
  { name: "زاگرس", count: 4 },
  { name: "وارش", count: 3 },
  { name: "قشم ایر", count: 3 },
];

interface FilterSidebarProps {
  onFilterChange: (filters: {
    priceMin: number;
    priceMax: number;
    airlines: string[];
    ticketTypes: string[];
    times: string[];
    seatsMinimum: number;
  }) => void;
  currentFilters: {
    priceMin: number;
    priceMax: number;
    airlines: string[];
    ticketTypes: string[];
    times: string[];
    seatsMinimum: number;
  };
}

export default function FilterSidebar({
  onFilterChange,
  currentFilters,
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  const handleAirlineToggle = (airline: string) => {
    const updated = {
      ...localFilters,
      airlines: localFilters.airlines.includes(airline)
        ? localFilters.airlines.filter((a) => a !== airline)
        : [...localFilters.airlines, airline],
    };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleTicketTypeToggle = (type: string) => {
    const updated = {
      ...localFilters,
      ticketTypes: localFilters.ticketTypes.includes(type)
        ? localFilters.ticketTypes.filter((t) => t !== type)
        : [...localFilters.ticketTypes, type],
    };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handlePriceChange = (min: number, max: number) => {
    const updated = {
      ...localFilters,
      priceMin: min,
      priceMax: max,
    };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleResetFilters = () => {
    const reset = {
      priceMin: 0,
      priceMax: 10000000,
      airlines: [],
      ticketTypes: [],
      times: [],
      seatsMinimum: 1,
    };
    setLocalFilters(reset);
    onFilterChange(reset);
  };

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <span className="font-medium text-foreground">فیلترها</span>
        <button
          onClick={handleResetFilters}
          className="text-sm text-primary hover:underline"
        >
          حذف فیلترها
        </button>
      </div>

      <FilterSection title="محدوده قیمت" defaultOpen>
        <div className="space-y-4">
          <div className="space-y-2">
            <Slider
              min={0}
              max={10000000}
              step={100000}
              value={[localFilters.priceMin, localFilters.priceMax]}
              onValueChange={(values) =>
                handlePriceChange(values[0], values[1])
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">حداقل:</span>
              <span className="text-foreground font-medium">
                {formatPrice(localFilters.priceMin)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">حداکثر:</span>
              <span className="text-foreground font-medium">
                {formatPrice(localFilters.priceMax)}
              </span>
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="نوع بلیط" defaultOpen>
        <div className="space-y-2">
          <CheckboxItem
            label="سیستمی"
            checked={localFilters.ticketTypes.includes("سیستمی")}
            onChange={() => handleTicketTypeToggle("سیستمی")}
          />
          <CheckboxItem
            label="چارتر"
            checked={localFilters.ticketTypes.includes("چارتر")}
            onChange={() => handleTicketTypeToggle("چارتر")}
          />
        </div>
      </FilterSection>

      <FilterSection title="ایرلاین" defaultOpen>
        <div className="space-y-2">
          {airlines.map((airline) => (
            <CheckboxItem
              key={airline.name}
              label={airline.name}
              count={airline.count}
              checked={localFilters.airlines.includes(airline.name)}
              onChange={() => handleAirlineToggle(airline.name)}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
