"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import CustomDatePicker from "./DatePicker";
import LocationSelect, { CityOption } from "./LocationSelect";
import PassengerSelect, { PassengerCounts } from "./PassengerSelect";

type ActiveStep = "destination" | "date" | "passengers" | null;

const VillaSearchForm = () => {
  const [activeStep, setActiveStep] = useState<ActiveStep>(null);

  const [destination, setDestination] = useState<CityOption | null>(null);
  const [dates, setDates] = useState<DateObject[] | DateObject | null>(null);
  const [passengers, setPassengers] = useState<PassengerCounts | null>(null);

  const handleDestinationChange = (val: CityOption | null) => {
    setDestination(val);
    if (val) setActiveStep("date");
  };

  const handleDateChange = (val: DateObject[] | DateObject | null) => {
    setDates(val);
    if (Array.isArray(val) && val.length === 2) {
      setTimeout(() => setActiveStep("passengers"), 200);
    }
  };

  return (
    <div className="w-full px-0 flex flex-col gap-4">
      <div className="h-8"></div>

      <div className="flex flex-col lg:flex-row items-stretch border border-gray-200 rounded-xl   divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse relative z-20 bg-white overflow-hidden ">
        {/* Destination */}
        <div className="flex-[2] relative z-20">
          <LocationSelect
            label="مقصد یا اقامتگاه (داخلی و خارجی)"
            placeholder="انتخاب کنید"
            value={destination}
            onChange={handleDestinationChange}
            className="rounded-t-xl lg:rounded-r-xl lg:rounded-tl-none h-full"
            isOpen={activeStep === "destination"}
            onMenuOpen={() => setActiveStep("destination")}
            onMenuClose={() => setActiveStep(null)}
            inputId="villa-destination-input"
          />
        </div>

        {/* Date */}
        <div className="flex-[1.5] min-w-[250px] relative z-20">
          <CustomDatePicker
            label="تاریخ ورود و خروج"
            range={true}
            value={dates}
            onChange={handleDateChange}
            isOpen={activeStep === "date"}
            onOpen={() => setActiveStep("date")}
            onClose={() => setActiveStep(null)}
          />
        </div>

        {/* Travelers */}
        <div className="flex-1 min-w-[200px] relative z-20">
          <PassengerSelect
            onChange={setPassengers}
            isOpen={activeStep === "passengers"}
            onOpen={() => setActiveStep("passengers")}
            onClose={() => setActiveStep(null)}
          />
        </div>

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

export default VillaSearchForm;
