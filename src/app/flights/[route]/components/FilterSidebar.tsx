"use client";

import type React from "react";

import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const airlines = [
  { name: "ماهان", count: 12 },
  { name: "ایران ایر", count: 8 },
  { name: "آسمان", count: 6 },
  { name: "کیش ایر", count: 5 },
  { name: "زاگرس", count: 4 },
  { name: "وارش", count: 3 },
  { name: "قشم ایر", count: 3 },
];

const convertToPersian = (num: number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .split("")
    .map((digit) => persianDigits[parseInt(digit)] || digit)
    .join("");
};

const formatPrice = (price: number) => {
  const formatted = (price / 1000000).toFixed(1);
  return `${formatted} میلیون`;
};

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
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
        <span className="font-medium text-[#1f2937]">فیلترها</span>
        <button
          onClick={handleResetFilters}
          className="text-sm text-[#f57c00] hover:underline"
        >
          حذف فیلترها
        </button>
      </div>

      {/* Price Range */}
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
              <span className="text-[#6b7280]">حداقل:</span>
              <span className="text-[#1f2937] font-medium">
                {formatPrice(localFilters.priceMin)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6b7280]">حداکثر:</span>
              <span className="text-[#1f2937] font-medium">
                {formatPrice(localFilters.priceMax)}
              </span>
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Ticket Type */}
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

      {/* Airlines */}
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
function FilterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#e5e7eb] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-right"
      >
        <span className="font-medium text-[#1f2937]">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#6b7280]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6b7280]" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function CheckboxItem({
  label,
  checked = false,
  count,
  onChange,
}: {
  label: string;
  checked?: boolean;
  count?: number;
  onChange?: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-2 border-[#d1d5db] accent-[#f57c00] cursor-pointer"
      />
      <span className="text-sm text-[#374151] flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-[#6b7280]">({count})</span>
      )}
    </label>
  );
}
