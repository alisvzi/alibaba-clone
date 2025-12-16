"use client";

import { formatJalaliYMD } from "@/lib/date";
import { CityOption, DateRange } from "@/types/search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "./DatePicker/DatePicker";
import {
  InternationalFormErrors,
  InternationalFormState,
  InternationalTripType,
} from "./international.types";
import NewLocationSelect from "./LocationSelect/LocationSelect";
import PassengerSelect from "./PassengerSelect";
import SearchButton from "./SearchButton";

import SelectBox from "@/components/ui/SelectBox";

const InternationalFlightSearchForm = () => {
  const [form, setForm] = useState<InternationalFormState>({
    tripType: "round-trip",
    origin: null,
    destination: null,
    dateRange: undefined,
    passengers: null,
    activeStep: null,
    errors: {},
  });
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleOriginChange = (val: CityOption | null) => {
    setForm((prev) => ({
      ...prev,
      origin: val,
      activeStep: val ? "destination" : prev.activeStep,
      errors: { ...prev.errors, origin: undefined },
    }));
  };

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
    const errors: InternationalFormErrors = {};

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

    const adult = form.passengers?.adults ?? 1;
    const child = form.passengers?.children ?? 0;
    const infant = form.passengers?.infants ?? 0;

    const departing = formatJalaliYMD(form.dateRange!.from!);

    const params = new URLSearchParams({
      adult: String(adult),
      child: String(child),
      infant: String(infant),
      departing,
      trip: form.tripType,
    });

    if (form.tripType === "round-trip" && form.dateRange?.to) {
      params.set("returning", formatJalaliYMD(form.dateRange.to));
    }

    const path = `/flights/${form.origin!.code}-${
      form.destination!.code
    }?${params.toString()}`;

    setIsSearching(true);
    try {
      router.prefetch(path);
    } catch {}
    router.push(path);
  };

  return (
    <div className="w-full px-0 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <SelectBox
          value={form.tripType}
          onChange={(val) => {
            setForm((prev) => ({
              ...prev,
              tripType: val as InternationalTripType,
              dateRange: undefined,
              errors: { ...prev.errors, date: undefined },
            }));
          }}
          options={[
            { value: "one-way", label: "یک طرفه" },
            { value: "round-trip", label: "رفت و برگشت" },
            { value: "multi-city", label: "چند مسیره" },
          ]}
        />
      </div>
      <div className="flex flex-col lg:flex-row items-stretch relative z-20 bg-white gap-4">
        <div className="flex-[1.4] min-w-[230px] relative z-30">
          <NewLocationSelect
            originValue={form.origin}
            destinationValue={form.destination}
            onOriginChange={handleOriginChange}
            onDestinationChange={handleDestinationChange}
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
            hasError={!!form.errors.passengers}
            errorMessage={form.errors.passengers}
          />
        </div>
        <div className="flex items-center justify-center lg:w-auto w-full">
          <SearchButton
            onClick={handleSearch}
            disabled={isSearching}
            isLoading={isSearching}
          />
        </div>
      </div>
    </div>
  );
};

export default InternationalFlightSearchForm;
