import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import React from "react";
import { CityOption } from "../../types";

function CityList({
  isOpen,
  filteredCities,
  highlightedIndex,
  onSelect,
  onHover,
  listStyle,
  shouldAnimate,
}: {
  isOpen: boolean;
  filteredCities: CityOption[];
  highlightedIndex: number;
  onSelect: (city: CityOption) => void;
  onHover: (index: number) => void;
  listStyle: React.CSSProperties;
  shouldAnimate: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute bg-popover border border-border rounded-lg shadow-lg z-50 w-[300px]!",
        shouldAnimate && isOpen
          ? "transition-all duration-300 ease-out"
          : "animate-in fade-in-0 zoom-in-95 duration-200",
        !isOpen &&
          "animate-out fade-out-0 zoom-out-95 duration-150 pointer-events-none hidden"
      )}
      style={{ top: "calc(100% + 4px)", ...listStyle }}
    >
      {isOpen && (
        <Command shouldFilter={false}>
          <CommandList>
            <CommandEmpty className="py-2 px-4 text-sm text-muted-foreground text-center">
              شهری یافت نشد
            </CommandEmpty>
            <CommandGroup heading="شهرها" className="w-[300px]">
              {filteredCities.map((city, index) => (
                <CommandItem
                  key={city.code}
                  value={city.label}
                  onSelect={() => onSelect(city)}
                  onMouseEnter={() => onHover(index)}
                  className={cn(
                    "cursor-pointer",
                    index === highlightedIndex && "bg-accent"
                  )}
                >
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}

export default CityList;
