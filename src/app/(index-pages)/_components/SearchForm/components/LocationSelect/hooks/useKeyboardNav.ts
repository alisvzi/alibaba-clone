import { useCallback, useState } from "react";
import { CityOption } from "../types";

export function useKeyboardNav({
  isOpen,
  filteredCities,
  onSelect,
  onClose,
}: {
  isOpen: boolean;
  filteredCities: CityOption[];
  onSelect: (city: CityOption) => void;
  onClose: () => void;
}) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      if (filteredCities.length === 0) {
        if (e.key === "Escape") onClose();
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((i) => (i + 1) % filteredCities.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(
            (i) => (i - 1 + filteredCities.length) % filteredCities.length
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0) onSelect(filteredCities[highlightedIndex]);
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, filteredCities, highlightedIndex, onSelect, onClose]
  );

  return { highlightedIndex, setHighlightedIndex, handleKeyDown };
}
