"use client";

import { ArrowLeftRight, Search } from "lucide-react";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import CustomDatePicker from "./DatePicker";
import LocationSelect, { CityOption } from "./LocationSelect";

type ActiveStep = "origin" | "destination" | "date" | null;

const BusSearchForm = () => {
  const [activeStep, setActiveStep] = useState<ActiveStep>(null);

  const [origin, setOrigin] = useState<CityOption | null>(null);
  const [destination, setDestination] = useState<CityOption | null>(null);
  const [date, setDate] = useState<DateObject | DateObject[] | null>(null);

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

  const handleDateChange = (val: DateObject | DateObject[] | null) => {
    setDate(val);
    // No next step for Bus usually, or just close
    if (val) setTimeout(() => setActiveStep(null), 200);
  };

  return (
    <div className="w-full px-0 flex flex-col gap-4">
      <div className="h-8"></div> {/* Spacer for alignment with others */}
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
            onMenuClose={() => setActiveStep(null)}
            inputId="bus-origin-input"
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
            onMenuClose={() => setActiveStep(null)}
            inputId="bus-destination-input"
          />
        </div>

        {/* Date */}
        <div className="flex-1 min-w-[250px] relative z-20">
          <CustomDatePicker
            label="تاریخ حرکت"
            value={date}
            onChange={handleDateChange}
            isOpen={activeStep === "date"}
            onOpen={() => setActiveStep("date")}
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

export default BusSearchForm;
