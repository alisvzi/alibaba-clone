"use client";

import type React from "react";

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

export default function FilterSidebar() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
        <span className="font-medium text-[#1f2937]">فیلترها</span>
        <button className="text-sm text-[#f57c00] hover:underline">
          حذف فیلترها
        </button>
      </div>

      {/* Price Range */}
      <FilterSection title="محدوده قیمت" defaultOpen>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6b7280]">از</span>
            <span className="text-[#1f2937]">۲,۴۵۰,۰۰۰ تومان</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6b7280]">تا</span>
            <span className="text-[#1f2937]">۵,۰۰۰,۰۰۰ تومان</span>
          </div>
          <div className="relative pt-2">
            <div className="h-1 bg-[#e5e7eb] rounded-full">
              <div className="h-1 bg-[#f57c00] rounded-full w-1/2"></div>
            </div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-white border-2 border-[#f57c00] rounded-full"></div>
            <div className="absolute top-0 right-1/2 w-4 h-4 bg-white border-2 border-[#f57c00] rounded-full"></div>
          </div>
        </div>
      </FilterSection>

      {/* Departure Time */}
      <FilterSection title="ساعت حرکت" defaultOpen>
        <div className="grid grid-cols-2 gap-2">
          <TimeButton label="صبح" time="۰۶:۰۰ - ۱۲:۰۰" />
          <TimeButton label="ظهر" time="۱۲:۰۰ - ۱۸:۰۰" />
          <TimeButton label="عصر" time="۱۸:۰۰ - ۲۴:۰۰" />
          <TimeButton label="شب" time="۰۰:۰۰ - ۰۶:۰۰" />
        </div>
      </FilterSection>

      {/* Ticket Type */}
      <FilterSection title="نوع بلیط" defaultOpen>
        <div className="space-y-2">
          <CheckboxItem label="سیستمی" checked />
          <CheckboxItem label="چارتر" />
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
            />
          ))}
        </div>
      </FilterSection>

      {/* Flight Class */}
      <FilterSection title="کلاس پرواز">
        <div className="space-y-2">
          <CheckboxItem label="اکونومی" checked />
          <CheckboxItem label="بیزینس" />
          <CheckboxItem label="فرست کلاس" />
        </div>
      </FilterSection>

      {/* Aircraft Type */}
      <FilterSection title="نوع هواپیما">
        <div className="space-y-2">
          <CheckboxItem label="Airbus" />
          <CheckboxItem label="Boeing" />
          <CheckboxItem label="ATR" />
          <CheckboxItem label="Fokker" />
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

function TimeButton({ label, time }: { label: string; time: string }) {
  return (
    <button className="flex flex-col items-center p-2 border border-[#e5e7eb] rounded-lg hover:border-[#f57c00] transition-colors">
      <span className="text-sm font-medium text-[#1f2937]">{label}</span>
      <span className="text-xs text-[#6b7280]">{time}</span>
    </button>
  );
}

function CheckboxItem({
  label,
  checked = false,
  count,
}: {
  label: string;
  checked?: boolean;
  count?: number;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          checked
            ? "bg-[#f57c00] border-[#f57c00]"
            : "border-[#d1d5db] group-hover:border-[#f57c00]"
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="text-sm text-[#374151] flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-[#6b7280]">({count})</span>
      )}
    </label>
  );
}
