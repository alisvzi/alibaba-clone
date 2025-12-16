import { Command } from "@/components/ui/command";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useCallback, useRef, useState } from "react";
import { useCityFilter } from "../hooks/useCityFilter";
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import CityInput from "./CityInput";
import CityList from "./CityList";
import { CityOption } from "@/types/search";

function SingleLocationSelect({
  placeholder = "جستجوی شهر",
  value,
  onChange,
  cities,
}: {
  placeholder?: string;
  value?: CityOption | null;
  onChange?: (city: CityOption) => void;
  cities: CityOption[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // استفاده از هوک‌های جدید
  const { query, setQuery, filteredCities, resetTyping, handleQueryChange } =
    useCityFilter(cities, value?.label);

  const handleSelect = useCallback(
    (city: CityOption) => {
      onChange?.(city);
      setQuery(city.label);
      setIsOpen(false);
    },
    [onChange, setQuery]
  );

  const { highlightedIndex, setHighlightedIndex, handleKeyDown } =
    useKeyboardNav({
      isOpen,
      filteredCities,
      onSelect: handleSelect,
      onClose: () => setIsOpen(false),
    });

  useClickOutside(containerRef, () => setIsOpen(false));

  const handleFocus = useCallback(() => {
    setIsOpen(true);
    resetTyping();
    inputRef.current?.select();
  }, [resetTyping]);

  return (
    <div ref={containerRef} className="relative w-full border rounded-lg">
      <Command shouldFilter={false}>
        <CityInput
          value={query}
          onChange={handleQueryChange}
          placeholder={placeholder}
          isActive={isOpen}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          inputRef={inputRef as React.RefObject<HTMLInputElement>}
        />
        <CityList
          isOpen={isOpen}
          filteredCities={filteredCities}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
          onHover={setHighlightedIndex}
          listStyle={{ right: 0, width: "100%" }}
          shouldAnimate={false}
        />
      </Command>
    </div>
  );
}

export default SingleLocationSelect;
