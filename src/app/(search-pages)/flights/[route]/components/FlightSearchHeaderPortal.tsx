"use client";

import FlightSearchForm from "@/app/(index-pages)/_components/SearchForm/components/FlightSearchForm";
import { FlightFormState } from "@/app/(index-pages)/_components/SearchForm/components/types/flight.types";
import HeaderPortal from "@/app/_components/layouts/Header/HeaderPortal";
import { getCityName } from "@/utils/city-helper";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function FlightSearchHeaderPortal() {
  const params = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [overflowVisible, setOverflowVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.body.classList.remove("header-pinned");
    };
  }, []);

  const handleToggle = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (nextIsOpen) {
      document.body.classList.add("header-pinned");
      timeoutRef.current = setTimeout(() => setOverflowVisible(true), 300);
    } else {
      document.body.classList.remove("header-pinned");
      setOverflowVisible(false);
    }
  };

  const route = pathname.split("/").pop() || "";
  const [originCode, destinationCode] = route.split("-");

  const originCity = getCityName(originCode);
  const destinationCity = getCityName(destinationCode);

  const adult = Number(params.get("adult") ?? 1);
  const child = Number(params.get("child") ?? 0);
  const infant = Number(params.get("infant") ?? 0);

  const totalPassengers = adult + child + infant;

  const departDateStr = params.get("departing");
  const returnDateStr = params.get("returning");
  const tripParam = params.get("trip");

  const departDate = useMemo(
    () => (departDateStr ? new Date(departDateStr) : undefined),
    [departDateStr]
  );
  const returnDate = useMemo(
    () => (returnDateStr ? new Date(returnDateStr) : undefined),
    [returnDateStr]
  );

  const initialValues: Partial<FlightFormState> = useMemo(() => {
    const from = departDate;
    const to = returnDate;

    return {
      origin: { code: originCode, label: originCity },
      destination: { code: destinationCode, label: destinationCity },
      passengers: { adults: adult, children: child, infants: infant },
      tripType: tripParam === "round-trip" ? "round-trip" : "one-way",
      dateRange: { from, to },
    };
  }, [
    originCode,
    destinationCode,
    originCity,
    destinationCity,
    adult,
    child,
    infant,
    departDate,
    returnDate,
    tripParam,
  ]);

  return (
    <HeaderPortal>
      <div className="bg-white border-t border-border shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 md:px-5">
          <div className="flex items-center justify-between py-3">
            {!isOpen && (
              <div className="flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold text-foreground">
                    {originCity}
                  </span>
                  <span className="text-muted-foreground">به</span>
                  <span className="font-bold text-foreground">
                    {destinationCity}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                  <span>|</span>
                  <span>{totalPassengers} مسافر</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                  <span>|</span>
                  <span>
                    {departDate
                      ? new Date(departDate).toLocaleDateString("fa-IR")
                      : "تاریخ رفت"}
                    {tripParam === "round-trip" && (
                      <>
                        <span className="mx-1">-</span>
                        {returnDate
                          ? new Date(returnDate).toLocaleDateString("fa-IR")
                          : "تاریخ برگشت"}
                      </>
                    )}
                  </span>
                </div>
              </div>
            )}
            {isOpen && <div />}

            <button
              onClick={handleToggle}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
            >
              {isOpen ? (
                <>
                  بستن
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  تغییر جستجو
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div
            className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isOpen
                ? "grid-rows-[1fr] opacity-100 pb-4"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div
              className={
                overflowVisible ? "overflow-visible" : "overflow-hidden"
              }
            >
              <FlightSearchForm
                initialValues={initialValues}
                onSearchComplete={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setIsOpen(false);
                  setOverflowVisible(false);
                  document.body.classList.remove("header-pinned");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </HeaderPortal>
  );
}
