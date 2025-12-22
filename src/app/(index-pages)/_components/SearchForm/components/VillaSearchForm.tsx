"use client";

import { CityOption } from "@/types/search";
import { useSearchForm } from "../hooks/useSearchForm";
import DatePicker from "./DatePicker/DatePicker";
import NewLocationSelect from "./LocationSelect/LocationSelect";
import PassengerSelect from "./PassengerSelect";
import SearchButton from "./SearchButton";
import { VillaFormErrors, VillaFormState } from "./types/villa.types";

const VillaSearchForm = () => {
  const {
    form,
    setForm,
    handleDestinationChange,
    handleDateRangeChange,
    onStepChange,
  } = useSearchForm<VillaFormState>({
    destination: null,
    dateRange: undefined,
    passengers: null,
    activeStep: null,
    errors: {},
  });

  const handleDestinationChangeInternal = (val: CityOption | null) => {
    handleDestinationChange(val);
  };

  const handleSearch = () => {
    const errors: VillaFormErrors = {};

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
            onChange={handleDestinationChangeInternal}
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
            onOpenChange={(open) => onStepChange("date", open)}
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
            onOpen={() => onStepChange("passengers", true)}
            onClose={() => onStepChange("passengers", false)}
          />
        </div>

        <div className="flex items-center justify-center lg:w-auto w-full">
          <SearchButton onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default VillaSearchForm;
