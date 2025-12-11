"use client";

import { Minus, Plus, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerSelectProps {
  onChange?: (passengers: PassengerCounts) => void;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const PassengerSelect = ({
  onChange,
  isOpen,
  onOpen,
  onClose,
}: PassengerSelectProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isMenuOpen = isOpen !== undefined ? isOpen : internalIsOpen;

  const [counts, setCounts] = useState<PassengerCounts>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (onOpen) onOpen();
    setInternalIsOpen(true);
  };

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    setInternalIsOpen(false);
  }, [onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose]);

  const updateCount = (
    type: "adults" | "children" | "infants",
    delta: number
  ) => {
    setCounts((prev) => {
      const newVal = prev[type] + delta;
      if (newVal < 0) return prev;
      if (type === "adults" && newVal < 1) return prev; // Min 1 adult

      const newCounts = { ...prev, [type]: newVal };
      return newCounts;
    });
  };

  // Notify parent when counts change, but do it in an effect to avoid
  // calling parent setState during this component's render (which causes
  // the "Cannot update a component while rendering a different component" error).
  useEffect(() => {
    if (onChange) onChange(counts);
  }, [counts, onChange]);

  const total = counts.adults + counts.children + counts.infants;

  return (
    <div
      className="relative h-full px-4 py-2 hover:bg-gray-100/50 transition-colors flex flex-col justify-center cursor-pointer select-none"
      ref={containerRef}
      onClick={() => !isMenuOpen && handleOpen()}
    >
      {/* Floating Label */}
      <div
        className={`absolute pointer-events-none transition-all duration-200 ease-in-out z-10 flex items-center gap-1 ${
          isMenuOpen || total > 0
            ? "top-2 text-xs text-gray-500 font-medium translate-y-0"
            : "top-1/2 -translate-y-1/2 text-base text-gray-500 font-bold"
        }`}
      >
        {!isMenuOpen && total === 0 && <Users className="w-5 h-5 opacity-50" />}
        <span>مسافران</span>
      </div>

      <div
        className={`${isMenuOpen || total > 0 ? "pt-4" : "opacity-0"} w-full`}
      >
        <span className="text-base font-semibold text-gray-800 font-mono">
          {total} {" "}
          <span className="text-sm font-normal text-gray-500 font-sans">
            مسافر
          </span>
        </span>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 p-5 z-50 cursor-default animate__animated animate__fadeIn animate__faster">
          {/* Adults */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col text-right">
              <span className="font-bold text-gray-800 text-sm">بزرگسال</span>
              <span className="text-xs text-gray-400 mt-1">۱۲ سال به بالا</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCount("adults", 1);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} />
              </button>
              <span className="font-bold w-4 text-center text-lg">
                {counts.adults}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCount("adults", -1);
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors ${
                  counts.adults <= 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
                disabled={counts.adults <= 1}
              >
                <Minus size={16} />
              </button>
            </div>
          </div>
          {/* Children */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col text-right">
              <span className="font-bold text-gray-800 text-sm">کودک</span>
              <span className="text-xs text-gray-400 mt-1">۲ تا ۱۲ سال</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCount("children", 1);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} />
              </button>
              <span className="font-bold w-4 text-center text-lg">
                {counts.children}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCount("children", -1);
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors ${
                  counts.children <= 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
                disabled={counts.children <= 0}
              >
                <Minus size={16} />
              </button>
            </div>
          </div>
          {/* Infants */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col text-right">
              <span className="font-bold text-gray-800 text-sm">نوزاد</span>
              <span className="text-xs text-gray-400 mt-1">
                ۱۰ روز تا ۲ سال
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCount("infants", 1);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} />
              </button>
              <span className="font-bold w-4 text-center text-lg">
                {counts.infants}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateCount("infants", -1);
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors ${
                  counts.infants <= 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
                disabled={counts.infants <= 0}
              >
                <Minus size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerSelect;
