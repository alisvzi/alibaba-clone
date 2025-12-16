import { cn } from "@/lib/utils";
import React from "react";

function CityInput({
  value,
  onChange,
  placeholder,
  isActive,
  onFocus,
  onKeyDown,
  inputRef,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isActive: boolean;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  iconColor?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}) {
  const isFloating = isActive || value.length > 0;

  return (
    <div
      className={cn(
        "relative flex items-center rounded-lg bg-background transition-all duration-200 h-11",
        isActive ? "border-primary ring-2 ring-primary/20" : "border-input"
      )}
    >
      <span
        className={cn(
          "absolute right-3 pointer-events-none transition-all duration-200 ease-in-out px-1 bg-background text-muted-foreground",
          isFloating
            ? "-top-2.5 text-xs text-primary scale-90 -mr-1"
            : "top-3 text-sm"
        )}
      >
        {placeholder}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        aria-label={placeholder}
        className="px-3 py-2 w-full bg-transparent outline-none text-sm h-full"
      />
    </div>
  );
}

export default CityInput;
