"use client";

import { CityOption, DateRange } from "@/types/search";
import { useState } from "react";
import DatePicker from "./DatePicker/DatePicker";
import { HotelFormErrors, HotelFormState } from "./hotel.types";
import NewLocationSelect from "./LocationSelect/LocationSelect";
import PassengerSelect from "./PassengerSelect";
import SearchButton from "./SearchButton";

const HotelSearchForm = () => {
  const [form, setForm] = useState<HotelFormState>({
    destination: null,
    dateRange: undefined,
    passengers: null,
    activeStep: null,
    errors: {},
  });

  const handleDestinationChange = (val: CityOption | null) => {
    setForm((prev) => ({
      ...prev,
      destination: val,
      activeStep: val ? "date" : prev.activeStep,
      errors: { ...prev.errors, destination: undefined },
    }));
  };

  const handleDateRangeChange = (val: DateRange | Date | undefined) => {
    if (!val) {
      setForm((prev) => ({
        ...prev,
        dateRange: undefined,
        errors: { ...prev.errors, date: undefined },
      }));
      return;
    }

    if (val instanceof Date) {
      setForm((prev) => ({
        ...prev,
        dateRange: { from: val, to: undefined },
        errors: { ...prev.errors, date: undefined },
      }));
      return;
    }

    const range = val as DateRange;
    setForm((prev) => ({
      ...prev,
      dateRange: range,
      errors: { ...prev.errors, date: undefined },
    }));
  };

  const handleSearch = () => {
    const errors: HotelFormErrors = {};

    if (!form.destination) {
      errors.destination = "مقصد را وارد کنید";
    }

    if (!form.dateRange?.from || !form.dateRange.to) {
      errors.date = "تاریخ ورود و خروج را انتخاب کنید";
    }

    if (Object.keys(errors).length > 0) {
      setForm((prev) => ({
        ...prev,
        errors: { ...prev.errors, ...errors },
      }));
      return;
    }
  };

  return (
    <div className="w-full px-0 flex flex-col gap-4">
      <div className="h-9.5"></div>
      <div className="flex flex-col lg:flex-row items-stretch relative z-20 bg-white gap-4">
        <div className="flex-[1.4] min-w-[230px] relative z-30">
          <NewLocationSelect
            mode="single"
            placeholder="مقصد"
            value={form.destination}
            onChange={handleDestinationChange}
            hasError={!!form.errors.destination}
            errorMessage={form.errors.destination}
          />
        </div>
        <div className="flex-[1.3] min-w-[230px] relative z-20">
          <DatePicker
            mode="range"
            label="تاریخ اقامت"
            startLabel="تاریخ ورود"
            endLabel="تاریخ خروج"
            selected={form.dateRange}
            onSelect={handleDateRangeChange}
            isOpen={form.activeStep === "date"}
            onOpenChange={(open) =>
              setForm((prev) => ({
                ...prev,
                activeStep:
                  open && prev.activeStep !== "date"
                    ? "date"
                    : !open && prev.activeStep === "date"
                    ? null
                    : prev.activeStep,
              }))
            }
            onConfirm={() =>
              setForm((prev) => ({
                ...prev,
                activeStep: "passengers",
              }))
            }
            hasError={!!form.errors.date}
            errorMessage={form.errors.date}
          />
        </div>
        <div className="flex-1 min-w-[200px] relative z-20">
          <PassengerSelect
            value={form.passengers}
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                passengers: val,
              }))
            }
            isOpen={form.activeStep === "passengers"}
            onOpen={() =>
              setForm((prev) => ({
                ...prev,
                activeStep: "passengers",
              }))
            }
            onClose={() =>
              setForm((prev) => ({
                ...prev,
                activeStep: null,
              }))
            }
          />
        </div>
        <div className="flex items-center justify-center lg:w-auto w-full">
          <SearchButton onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default HotelSearchForm;
