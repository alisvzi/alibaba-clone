"use client";

import { CityOption, TripType } from "@/types/search";
import { useSearchForm } from "../hooks/useSearchForm";
import DatePicker from "./DatePicker/DatePicker";
import NewLocationSelect from "./LocationSelect/LocationSelect";
import PassengerSelect from "./PassengerSelect";
import SearchButton from "./SearchButton";

import SelectBox from "@/components/ui/SelectBox";
import { TrainFormErrors, TrainFormState } from "./types/train.types";

const TrainSearchForm = () => {
  const {
    form,
    setForm,
    handleOriginChange,
    handleDestinationChange,
    handleDateRangeChange,
    handleSwap,
    onStepChange,
  } = useSearchForm<TrainFormState>({
    tripType: "one-way",
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
    const errors: TrainFormErrors = {};

    if (!form.origin) {
      errors.origin = "مبدا را وارد کنید";
    }

    if (!form.destination) {
      errors.destination = "مقصد را وارد کنید";
    }

    if (!form.dateRange?.from) {
      errors.date =
        form.tripType === "round-trip"
          ? "تاریخ رفت و برگشت را انتخاب کنید"
          : "تاریخ رفت را انتخاب کنید";
    } else if (form.tripType === "round-trip" && !form.dateRange.to) {
      errors.date = "تاریخ برگشت را نیز انتخاب کنید";
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
      <div className="flex items-center gap-4">
        <SelectBox
          value={form.tripType}
          onChange={(val) => {
            setForm((prev) => ({
              ...prev,
              tripType: val as TripType,
              dateRange: undefined,
              errors: { ...prev.errors, date: undefined },
            }));
          }}
          options={[
            { value: "one-way", label: "یک طرفه" },
            { value: "round-trip", label: "رفت و برگشت" },
          ]}
        />
      </div>
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
            mode={form.tripType === "round-trip" ? "range" : "single"}
            label={
              form.tripType === "round-trip" ? "تاریخ رفت و برگشت" : "تاریخ رفت"
            }
            startLabel="تاریخ رفت"
            endLabel="تاریخ برگشت"
            selected={
              form.tripType === "round-trip"
                ? form.dateRange
                : form.dateRange?.from
            }
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

export default TrainSearchForm;
