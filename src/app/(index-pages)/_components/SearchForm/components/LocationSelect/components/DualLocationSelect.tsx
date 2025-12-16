import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useCityFilter } from "../hooks/useCityFilter";
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import CityInput from "./CityInput";
import CityList from "./CityList";
import { CityOption } from "@/types/search";

function DualLocationSelect({
  originPlaceholder = "مبدا",
  destinationPlaceholder = "مقصد",
  originValue,
  destinationValue,
  onOriginChange,
  onDestinationChange,
  hasError,
  errorMessage,
  cities,
}: {
  originPlaceholder?: string;
  destinationPlaceholder?: string;
  originValue?: CityOption | null;
  destinationValue?: CityOption | null;
  onOriginChange?: (city: CityOption) => void;
  onDestinationChange?: (city: CityOption) => void;
  hasError?: boolean;
  errorMessage?: string;
  cities: CityOption[];
}) {
  const [activeField, setActiveField] = useState<
    "origin" | "destination" | null
  >(null);
  const [listStyle, setListStyle] = useState({ right: 0, width: 0 });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);

  const originFilter = useCityFilter(cities, originValue?.label);
  const destFilter = useCityFilter(cities, destinationValue?.label);

  const currentFilter = activeField === "origin" ? originFilter : destFilter;
  const isOpen = activeField !== null;

  useEffect(() => {
    if (originValue?.label) {
      originFilter.setQuery(originValue.label);
    }
  }, [originValue?.label, originFilter]);

  useEffect(() => {
    if (destinationValue?.label) {
      destFilter.setQuery(destinationValue.label);
    }
  }, [destinationValue?.label, destFilter]);

  const handleSelect = useCallback(
    (city: CityOption) => {
      if (activeField === "origin") {
        onOriginChange?.(city);
        originFilter.setQuery(city.label);
        setActiveField("destination");
        setShouldAnimate(true);
        destFilter.resetTyping();
        setTimeout(() => {
          destinationInputRef.current?.focus();
          destinationInputRef.current?.select();
        }, 50);
      } else {
        onDestinationChange?.(city);
        destFilter.setQuery(city.label);
        setActiveField(null);
        setShouldAnimate(false);
      }
    },
    [activeField, onOriginChange, onDestinationChange, originFilter, destFilter]
  );

  const { highlightedIndex, setHighlightedIndex, handleKeyDown } =
    useKeyboardNav({
      isOpen,
      filteredCities: currentFilter.filteredCities,
      onSelect: handleSelect,
      onClose: () => {
        setActiveField(null);
        setShouldAnimate(false);
      },
    });

  useLayoutEffect(() => {
    if (!activeField || !containerRef.current) return;
    const targetRef = activeField === "origin" ? originRef : destinationRef;
    if (!targetRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    setListStyle({
      right: containerRect.right - targetRect.right,
      width: targetRect.width,
    });
  }, [activeField]);

  useClickOutside(containerRef, () => {
    setActiveField(null);
    setShouldAnimate(false);
  });

  const handleFocus = useCallback(
    (field: "origin" | "destination") => {
      const isSwitching = activeField && activeField !== field;
      setShouldAnimate(!!isSwitching);
      setActiveField(field);

      if (field === "origin") originFilter.resetTyping();
      else destFilter.resetTyping();

      const inputRef =
        field === "origin" ? originInputRef : destinationInputRef;
      inputRef.current?.select();

      if (!activeField && containerRef.current) {
        const targetRef = field === "origin" ? originRef : destinationRef;
        if (targetRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const targetRect = targetRef.current.getBoundingClientRect();
          setListStyle({
            right: containerRect.right - targetRect.right,
            width: targetRect.width,
          });
        }
      }
    },
    [activeField, originFilter, destFilter]
  );

  const handleSwap = useCallback(() => {
    const tempQuery = originFilter.query;
    originFilter.setQuery(destFilter.query);
    destFilter.setQuery(tempQuery);

    if (destinationValue) onOriginChange?.(destinationValue);
    if (originValue) onDestinationChange?.(originValue);
  }, [
    originFilter,
    destFilter,
    originValue,
    destinationValue,
    onOriginChange,
    onDestinationChange,
  ]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "flex items-center border rounded-lg",
          hasError && "border-red-500"
        )}
      >
        <div ref={originRef} className="flex-1">
          <CityInput
            value={originFilter.query}
            onChange={originFilter.handleQueryChange}
            placeholder={originPlaceholder}
            isActive={activeField === "origin"}
            onFocus={() => handleFocus("origin")}
            onKeyDown={handleKeyDown}
            iconColor="text-emerald-500"
            inputRef={originInputRef as React.RefObject<HTMLInputElement>}
          />
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="p-2 rounded-full border border-input bg-background hover:bg-accent active:scale-95 transition-all"
          aria-label="جابجایی"
        >
          <ArrowLeftRight className="size-4 text-muted-foreground" />
        </button>

        <div ref={destinationRef} className="flex-1">
          <CityInput
            value={destFilter.query}
            onChange={destFilter.handleQueryChange}
            placeholder={destinationPlaceholder}
            isActive={activeField === "destination"}
            onFocus={() => handleFocus("destination")}
            onKeyDown={handleKeyDown}
            iconColor="text-rose-500"
            inputRef={destinationInputRef as React.RefObject<HTMLInputElement>}
          />
        </div>
      </div>

      <CityList
        isOpen={isOpen}
        filteredCities={currentFilter.filteredCities}
        highlightedIndex={highlightedIndex}
        onSelect={handleSelect}
        onHover={setHighlightedIndex}
        listStyle={listStyle}
        shouldAnimate={shouldAnimate}
      />

      {errorMessage && (
        <div className="hidden lg:block absolute -bottom-5 right-0 text-[11px] text-red-600 text-right">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default DualLocationSelect;
