"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PassengerCounts } from "@/types/search";
import { useState } from "react";
import { PassengerCounterItem } from "./PassengerCounterItem";
import { PassengerSelectProps } from "./types";

const PassengerSelect = ({
  value,
  onChange,
  className,
  isOpen,
  onOpen,
  onClose,
  hasError,
  errorMessage,
}: PassengerSelectProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [counts, setCounts] = useState<PassengerCounts>(
    value ?? {
      adults: 1,
      children: 0,
      infants: 0,
    }
  );
  const [internalError, setInternalError] = useState<string | null>(null);

  const open = isOpen ?? internalOpen;
  const isControlled = value != null;
  const effectiveCounts = isControlled ? (value as PassengerCounts) : counts;

  const handleOpenChange = (next: boolean) => {
    if (isOpen === undefined) {
      setInternalOpen(next);
    }
    if (next) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const updateCount = (
    type: "adults" | "children" | "infants",
    delta: number
  ) => {
    setInternalError(null);

    const base = isControlled ? (effectiveCounts as PassengerCounts) : counts;
    const nextVal = base[type] + delta;
    if (nextVal < 0) return;

    if (nextVal > 9) {
      setInternalError("حداکثر ۹ نفر برای هر گروه مجاز است");
      return;
    }

    if (type === "adults") {
      if (nextVal < 1) {
        setInternalError("حداقل یک بزرگسال لازم است");
        return;
      }
      if (base.infants > nextVal) {
        setInternalError("تعداد نوزاد نباید از بزرگسال بیشتر باشد");
        return;
      }
    }

    if (type === "infants" && nextVal > base.adults) {
      setInternalError("تعداد نوزاد نباید از بزرگسال بیشتر باشد");
      return;
    }

    const nextCounts: PassengerCounts = { ...base, [type]: nextVal };
    const total = nextCounts.adults + nextCounts.children + nextCounts.infants;
    if (total > 9) {
      setInternalError("حداکثر ۹ مسافر در مجموع مجاز است");
      return;
    }

    if (isControlled) {
      onChange?.(nextCounts);
    } else {
      setCounts(nextCounts);
      onChange?.(nextCounts);
    }
  };

  const parts: string[] = [];
  if (effectiveCounts.adults > 0)
    parts.push(`${effectiveCounts.adults} بزرگسال`);
  if (effectiveCounts.children > 0)
    parts.push(`${effectiveCounts.children} کودک`);
  if (effectiveCounts.infants > 0)
    parts.push(`${effectiveCounts.infants} نوزاد`);
  const displayText = parts.join("، ");
  const hasAny = parts.length > 0;
  const displayError = errorMessage || internalError;

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "border rounded-lg",
              (hasError || !!displayError) && "border-red-500"
            )}
          >
            <div
              className={cn(
                "relative flex items-center rounded-lg bg-background transition-all duration-200 h-11 w-full cursor-pointer",
                open ? "border-primary ring-2 ring-primary/20" : "border-input"
              )}
            >
              <span
                className={cn(
                  "absolute right-3 pointer-events-none transition-all duration-200 ease-in-out px-1 bg-background text-xs",
                  open || hasAny
                    ? "-top-2.5 text-[10px] scale-90 -mr-1"
                    : "top-3 text-sm",
                  "text-muted-foreground"
                )}
              >
                مسافران
              </span>

              <div className="px-3 w-full bg-transparent outline-none text-xs h-full flex items-center">
                {hasAny ? (
                  <span className="font-semibold">{displayText}</span>
                ) : null}
              </div>
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-4 text-xs" align="start">
          <PassengerCounterItem
            label="بزرگسال"
            subLabel="۱۲ سال به بالا"
            count={effectiveCounts.adults}
            onIncrement={() => updateCount("adults", 1)}
            onDecrement={() => updateCount("adults", -1)}
            minCount={1}
          />
          <PassengerCounterItem
            label="کودک"
            subLabel="۲ تا ۱۲ سال"
            count={effectiveCounts.children}
            onIncrement={() => updateCount("children", 1)}
            onDecrement={() => updateCount("children", -1)}
          />
          <PassengerCounterItem
            label="نوزاد"
            subLabel="۱۰ روز تا ۲ سال"
            count={effectiveCounts.infants}
            onIncrement={() => updateCount("infants", 1)}
            onDecrement={() => updateCount("infants", -1)}
            maxCount={effectiveCounts.adults}
          />

          {displayError && (
            <div className="mt-3 text-[11px] text-red-600 text-right">
              {displayError}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PassengerSelect;
