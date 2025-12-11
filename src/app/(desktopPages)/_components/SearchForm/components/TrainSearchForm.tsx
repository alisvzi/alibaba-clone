"use client";

import { ArrowLeftRight, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import CustomDatePicker from "./DatePicker";
import LocationSelect, { CityOption } from "./LocationSelect";
import PassengerSelect, { PassengerCounts } from "./PassengerSelect";

type TripType = "one-way" | "round-trip";
type ActiveStep =
  | "origin"
  | "destination"
  | "date_depart"
  | "date_return"
  | "passengers"
  | null;

const TrainSearchForm = () => {
  const [tripType, setTripType] = useState<TripType>("one-way"); // Train defaults to one-way often
  const [activeStep, setActiveStep] = useState<ActiveStep>(null);

  const [origin, setOrigin] = useState<CityOption | null>(null);
  const [destination, setDestination] = useState<CityOption | null>(null);
  const [departDate, setDepartDate] = useState<DateObject | null>(null);
  const [returnDate, setReturnDate] = useState<DateObject | null>(null);
  const [passengers, setPassengers] = useState<PassengerCounts | null>(null);

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
    if (val) setActiveStep("date_depart");
  };

  const handleDepartChange = (val: DateObject | DateObject[] | null) => {
    const v = Array.isArray(val)
      ? (val[0] as DateObject)
      : (val as DateObject | null);
    setDepartDate(v || null);
    if (v) {
      if (tripType === "round-trip")
        setTimeout(() => setActiveStep("date_return"), 200);
      else setTimeout(() => setActiveStep("passengers"), 200);
    }
  };

  const handleReturnChange = (val: DateObject | DateObject[] | null) => {
    const v = Array.isArray(val)
      ? (val[0] as DateObject)
      : (val as DateObject | null);
    setReturnDate(v || null);
    if (v) setTimeout(() => setActiveStep("passengers"), 200);
  };

  return (
    <div className="w-full px-0 flex flex-col gap-4">
      {/* Trip Type Selector */}
      <div className="flex items-center gap-4 pr-2">
        <div className="relative group">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-full border border-gray-200 hover:border-blue-300 group-hover:ring-2 group-hover:ring-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-300/50">
            {tripType === "one-way" ? "یک طرفه" : "رفت و برگشت"}
            <ChevronDown size={16} className="text-gray-400" />
          </button>
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
        <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-blue-600 transition-colors">
          <span className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center"></span>
          <span>کوپه دربست</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-blue-600 transition-colors">
          <span className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center"></span>
          <span>حمل خودرو</span>
        </div>
      </div>

      {/* Main Search Bar Container */}
      <div className="flex flex-col lg:flex-row items-stretch border border-gray-200 rounded-xl   divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse relative z-20 bg-white overflow-hidden ">
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
            inputId="train-origin-input"
          />
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
            className="lg:pr-6 h-full"
            isOpen={activeStep === "destination"}
            onMenuOpen={() => setActiveStep("destination")}
            onMenuClose={() =>
              setActiveStep((prev) => (prev === "destination" ? null : prev))
            }
            inputId="train-destination-input"
          />
        </div>

        {/* Dates */}
        <div className="flex-1 min-w-[320px] relative z-20 flex">
          <div className="flex-1">
            <CustomDatePicker
              label="تاریخ رفت"
              value={departDate}
              onChange={handleDepartChange}
              isOpen={activeStep === "date_depart"}
              onOpen={() => setActiveStep("date_depart")}
              onClose={() => setActiveStep(null)}
            />
          </div>
          {tripType === "round-trip" && (
            <div className="flex-1">
              <CustomDatePicker
                label="تاریخ برگشت"
                value={returnDate}
                onChange={handleReturnChange}
                isOpen={activeStep === "date_return"}
                onOpen={() =>
                  setActiveStep(departDate ? "date_return" : "date_depart")
                }
                onClose={() => setActiveStep(null)}
                minDate={departDate || undefined}
                highlightDate={departDate || null}
              />
            </div>
          )}
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
          <button className="w-full lg:w-auto h-full min-h-[48px] px-10 bg-[#fdb713] hover:bg-[#fac852] text-black font-bold text-lg rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-[0_4px_10px_rgba(253,183,19,0.3)]">
            <Search className="w-5 h-5" />
            جستجو
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainSearchForm;
