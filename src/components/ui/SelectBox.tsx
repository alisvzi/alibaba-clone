"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

type Option<T extends string> = {
  value: T;
  label: string;
};

type SelectBoxProps<T extends string> = {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
};

function SelectBox<T extends string>({
  value,
  options,
  onChange,
  placeholder = "انتخاب کنید",
  className = "",
}: SelectBoxProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // 👇 Click Outside
  useClickOutside(containerRef, () => {
    setOpen(false);
  });

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-right ${className}`}
    >
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-full border border-gray-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
      >
        {selectedOption?.label ?? placeholder}
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                value === option.value
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectBox;
