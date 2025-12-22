"use client";

import { cn } from "@/lib/utils";
import { DateInputBoxProps } from "./types";

export function DateInputBox({
  value,
  label,
  isActive,
  className,
  ...props
}: DateInputBoxProps) {
  const isFloating = isActive || (value && value.length > 0);

  return (
    <div
      className={cn(
        "relative flex items-center rounded-lg bg-background transition-all duration-200 h-11 w-full",
        isActive ? "border-primary ring-2 ring-primary/20" : "border-input",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute right-3 pointer-events-none transition-all duration-200 ease-in-out px-1 bg-background text-muted-foreground",
          isFloating
            ? "-top-2.5 text-xs text-primary scale-90 -mr-1"
            : "top-3 text-sm"
        )}
      >
        {label}
      </span>
      <div className="px-3 py-2 w-full bg-transparent outline-none text-sm h-full flex items-center pt-3 select-none">
        {value}
      </div>
    </div>
  );
}
