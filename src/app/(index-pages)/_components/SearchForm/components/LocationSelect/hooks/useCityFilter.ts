import { CityOption } from "@/types/search";
import { useCallback, useState } from "react";

export function useCityFilter(cities: CityOption[], initialQuery: string = "") {
  const [query, setQuery] = useState(initialQuery);
  const [hasTyped, setHasTyped] = useState(false);

  const filteredCities = cities.filter((city) => {
    const filterText = hasTyped ? query : "";
    return city.label.toLowerCase().includes(filterText.toLowerCase());
  });

  const resetTyping = useCallback(() => setHasTyped(false), []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setHasTyped(true);
  }, []);

  return {
    query,
    setQuery,
    filteredCities,
    hasTyped,
    resetTyping,
    handleQueryChange,
  };
}
