"use client";

import { ArrowLeftRight, ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import CustomDatePicker from "./DatePicker";
import LocationSelect, { CityOption } from "./LocationSelect";
import PassengerSelect, { PassengerCounts } from "./PassengerSelect";

type TripType = "one-way" | "round-trip";
type ActiveStep = "origin" | "destination" | "date" | "passengers" | null;

const FlightSearchForm = () => {
  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [activeStep, setActiveStep] = useState<ActiveStep>(null);

  const [origin, setOrigin] = useState<CityOption | null>(null);
  const [destination, setDestination] = useState<CityOption | null>(null);
  const [departDate, setDepartDate] = useState<DateObject | null>(null);
  const [returnDate, setReturnDate] = useState<DateObject | null>(null);
  const [passengers, setPassengers] = useState<PassengerCounts | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleOriginChange = (val: CityOption | null) => {
    setOrigin(val);
    if (val) setActiveStep("destination");
  };

  const handleDestinationChange = (val: CityOption | null) => {
    setDestination(val);
    if (val) setActiveStep("date");
  };

  const handleDateRangeChange = (val: DateObject | DateObject[] | null) => {
    if (Array.isArray(val)) {
      const [start, end] = val as DateObject[];
      setDepartDate(start ?? null);
      setReturnDate(end ?? null);
      if (tripType === "round-trip" && end) {
        setTimeout(() => setActiveStep("passengers"), 200);
      } else if (!tripType || tripType === "one-way") {
        if (start) setTimeout(() => setActiveStep("passengers"), 200);
      }
    } else {
      const start = val as DateObject | null;
      setDepartDate(start ?? null);
      setReturnDate(null);
      if (start && tripType === "one-way") {
        setTimeout(() => setActiveStep("passengers"), 200);
      }
    }
  };

  const handleSearch = () => {
    if (!origin || !destination || !departDate) return;
    const adult = passengers?.adults ?? 1;
    const child = passengers?.children ?? 0;
    const infant = passengers?.infants ?? 0;
    const departing = departDate.format("YYYY-MM-DD");
    const params = new URLSearchParams({
      adult: String(adult),
      child: String(child),
      infant: String(infant),
      departing,
      trip: tripType,
    });
    if (tripType === "round-trip" && returnDate) {
      params.set("returning", returnDate.format("YYYY-MM-DD"));
    }
    const path = `/flights/${origin.code}-${
      destination.code
    }?${params.toString()}`;
    setIsSearching(true);
    try {
      router.prefetch(path);
    } catch {}
    router.push(path);
  };

  return (
    <div className="w-full px-0 flex flex-col gap-4">
      {/* Trip Type Selector */}
      <div className="flex items-center gap-4 pr-2">
        <div className="relative group">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors py-2">
            {tripType === "one-way" ? "یک طرفه" : "رفت و برگشت"}
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {/* Dropdown for Trip Type */}
          <div className="absolute top-full right-0 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 hidden group-hover:block z-50 animate__animated animate__fadeIn animate__faster">
            <button
              onClick={() => {
                setTripType("one-way");
                setDepartDate(null);
                setReturnDate(null);
              }}
              className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                tripType === "one-way"
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
              }`}
            >
              یک طرفه
            </button>
            <button
              onClick={() => {
                setTripType("round-trip");
                setDepartDate(null);
                setReturnDate(null);
              }}
              className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                tripType === "round-trip"
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
              }`}
            >
              رفت و برگشت
            </button>
          </div>
        </div>
      </div>

      {/* Main Search Bar Container */}
      <div className="flex flex-col lg:flex-row items-stretch border border-gray-200 rounded-xl shadow-sm divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse relative z-20 bg-white overflow-hidden ">
        {/* Origin */}
        <div className="flex-1 relative z-30 group/origin">
          <LocationSelect
            label="مبدا"
            placeholder="انتخاب کنید"
            value={origin}
            onChange={handleOriginChange}
            className="rounded-t-xl lg:rounded-r-xl lg:rounded-tl-none h-full"
            isOpen={activeStep === "origin"}
            onMenuOpen={() => setActiveStep("origin")}
            onMenuClose={() =>
              setActiveStep((prev) => (prev === "origin" ? null : prev))
            }
            inputId="origin-input"
          />
          {/* Swap Button (Absolute centered between two cols) */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <button
              onClick={handleSwap}
              className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-gray-50 shadow-sm transition-all hover:rotate-180"
              title="جابجایی مبدا و مقصد"
            >
              <ArrowLeftRight size={14} />
            </button>
          </div>
        </div>

        {/* Destination */}
        <div className="flex-1 relative z-20">
          <LocationSelect
            label="مقصد"
            placeholder="انتخاب کنید"
            value={destination}
            onChange={handleDestinationChange}
            className="lg:pr-6 h-full" // Add padding to avoid overlap with swap button
            isOpen={activeStep === "destination"}
            onMenuOpen={() => setActiveStep("destination")}
            onMenuClose={() =>
              setActiveStep((prev) => (prev === "destination" ? null : prev))
            }
            inputId="destination-input"
          />
        </div>

        {/* Dates (Range) */}
        <div className="flex-1 min-w-[320px] relative z-20 flex">
          <div className="flex-1">
            <CustomDatePicker
              label={
                tripType === "round-trip" ? "تاریخ رفت و برگشت" : "تاریخ رفت"
              }
              value={
                tripType === "round-trip"
                  ? departDate && returnDate
                    ? [departDate, returnDate]
                    : departDate
                    ? [departDate]
                    : null
                  : departDate
              }
              onChange={handleDateRangeChange}
              isOpen={activeStep === "date"}
              onOpen={() => setActiveStep("date")}
              onClose={() => setActiveStep(null)}
              range={tripType === "round-trip"}
              minDate={undefined}
              highlightDate={departDate || null}
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="flex-1 min-w-[200px] relative z-20">
          <PassengerSelect
            onChange={setPassengers}
            isOpen={activeStep === "passengers"}
            onOpen={() => setActiveStep("passengers")}
            onClose={() => setActiveStep(null)}
          />
        </div>

        {/* Search Button Container */}
        <div className="p-2 flex items-center justify-center lg:w-auto w-full">
          <button
            onClick={handleSearch}
            disabled={isSearching || !origin || !destination || !departDate}
            className={`w-full lg:w-auto h-full min-h-[48px] px-10 rounded-lg flex items-center justify-center gap-3 transition-colors whitespace-nowrap shadow-[0_4px_10px_rgba(253,183,19,0.3)] ${
              isSearching
                ? "bg-[#fac852] text-black"
                : "bg-[#fdb713] hover:bg-[#fac852] text-black"
            } ${isSearching ? "cursor-wait" : ""}`}
          >
            {isSearching ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            {isSearching ? "در حال انتقال..." : "جستجو"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
