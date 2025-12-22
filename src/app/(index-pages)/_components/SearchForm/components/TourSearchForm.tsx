"use client";

import { CityOption } from "@/types/search";
import { useSearchForm } from "../hooks/useSearchForm";
import DatePicker from "./DatePicker/DatePicker";
import NewLocationSelect from "./LocationSelect/LocationSelect";
import PassengerSelect from "./PassengerSelect";
import SearchButton from "./SearchButton";
import { TourFormErrors, TourFormState } from "./types/tour.types";

const TourSearchForm = () => {
  const {
    form,
    setForm,
    handleOriginChange,
    handleDestinationChange,
    handleDateRangeChange,
    handleSwap,
    onStepChange,
  } = useSearchForm<TourFormState>({
    origin: null,
    destination: null,
    dateRange: undefined,
    passengers: null,
    activeStep: null,
    errors: {},
  });

  const handleOriginChangeInternal = (val: CityOption | null) => {
    handleOriginChange(val);
  };

  const handleDestinationChangeInternal = (val: CityOption | null) => {
    handleDestinationChange(val);
  };

  const handleSearch = () => {
    const errors: TourFormErrors = {};

    if (!form.origin) {
      errors.origin = "مبدا را وارد کنید";
    }

    if (!form.destination) {
      errors.destination = "مقصد را وارد کنید";
    }

    if (!form.dateRange?.from) {
      errors.date = "تاریخ سفر را انتخاب کنید";
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
            originValue={form.origin}
            destinationValue={form.destination}
            onOriginChange={handleOriginChangeInternal}
            onDestinationChange={handleDestinationChangeInternal}
            onSwap={handleSwap}
            value={form.origin}
            onChange={(city) =>
              setForm((prev) => ({
                ...prev,
                origin: city,
                errors: { ...prev.errors, origin: undefined },
              }))
            }
            mode="dual"
            hasError={!!(form.errors.origin || form.errors.destination)}
            errorMessage={form.errors.origin || form.errors.destination}
          />
        </div>
        <div className="flex-[1.3] min-w-[230px] relative z-20">
          <DatePicker
            mode="range"
            label="تاریخ تور"
            startLabel="تاریخ شروع تور"
            endLabel="تاریخ پایان تور"
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
                errors: { ...prev.errors, passengers: undefined },
              }))
            }
            isOpen={form.activeStep === "passengers"}
            onOpen={() => onStepChange("passengers", true)}
            onClose={() => onStepChange("passengers", false)}
            hasError={!!form.errors.passengers}
            errorMessage={form.errors.passengers}
          />
        </div>
        <div className="flex items-center justify-center lg:w-auto w-full">
          <SearchButton onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default TourSearchForm;
