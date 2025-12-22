"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "./DatePicker/DatePicker";
import NewLocationSelect from "./LocationSelect/LocationSelect";
import PassengerSelect from "./PassengerSelect";
import SearchButton from "./SearchButton";
import {
  FlightFormErrors,
  FlightFormState,
  PersistedFlightSearchState,
} from "./types/flight.types";

import SelectBox from "@/components/ui/SelectBox";
import { CityOption } from "@/types/search";
import { useSyncExternalStore } from "react";
import { useSearchForm } from "../hooks/useSearchForm";

const STORAGE_KEY = "flight_search_form_state";
let cachedRaw: string | null = null;
let cachedParsed: PersistedFlightSearchState | null = null;

interface FlightSearchFormProps {
  initialValues?: Partial<FlightFormState>;
  onSearchComplete?: () => void;
}

const FlightSearchForm = ({
  initialValues,
  onSearchComplete,
}: FlightSearchFormProps) => {
  const {
    form,
    setForm,
    handleOriginChange,
    handleDestinationChange,
    handleDateRangeChange,
    onStepChange,
  } = useSearchForm<FlightFormState>({
    tripType: "round-trip",
    origin: null,
    destination: null,
    dateRange: undefined,
    passengers: null,
    activeStep: null,
    errors: {},
    ...(initialValues ?? {}),
  });

  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {}, []);

  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) callback();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        cachedRaw = null;
        cachedParsed = null;
        return null;
      }
      if (raw === cachedRaw) return cachedParsed;
      const parsed = JSON.parse(raw) as PersistedFlightSearchState;
      cachedRaw = raw;
      cachedParsed = parsed;
      return parsed;
    } catch {
      return cachedParsed ?? null;
    }
  };

  const getServerSnapshot = () => null;

  const persisted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const derivedInitial = (() => {
    if (!persisted) return {};
    const next: Partial<FlightFormState> = {
      tripType: persisted.tripType,
      origin: persisted.origin ?? null,
      destination: persisted.destination ?? null,
      passengers: persisted.passengers ?? null,
      dateRange: undefined,
      errors: {},
      activeStep: null,
    };
    if (persisted.dateRange) {
      const from = persisted.dateRange.from
        ? new Date(persisted.dateRange.from)
        : undefined;
      const to = persisted.dateRange.to
        ? new Date(persisted.dateRange.to)
        : undefined;
      if (from || to) next.dateRange = { from, to };
    }
    return next;
  })();

  const handleOriginChangeInternal = (val: CityOption | null) => {
    handleOriginChange(val);
  };

  const handleDestinationChangeInternal = (val: CityOption | null) => {
    handleDestinationChange(val);
  };

  // Remove redundant handleDateRangeChange since we use the one from useSearchForm

  const handleSearch = () => {
    const errors: FlightFormErrors = {};

    const effForm: FlightFormState = {
      ...form,
      tripType:
        form.tripType ??
        (derivedInitial.tripType as FlightFormState["tripType"]) ??
        "one-way",
      origin: form.origin ?? derivedInitial.origin ?? null,
      destination: form.destination ?? derivedInitial.destination ?? null,
      dateRange:
        form.dateRange ??
        (derivedInitial.dateRange as FlightFormState["dateRange"]) ??
        undefined,
      passengers: form.passengers ?? derivedInitial.passengers ?? null,
    };

    if (!effForm.origin) {
      errors.origin = "مبدا را وارد کنید";
    }

    if (!effForm.destination) {
      errors.destination = "مقصد را وارد کنید";
    }

    if (!effForm.dateRange?.from) {
      errors.date =
        effForm.tripType === "round-trip"
          ? "تاریخ رفت و برگشت را انتخاب کنید"
          : "تاریخ رفت را انتخاب کنید";
    } else if (effForm.tripType === "round-trip" && !effForm.dateRange.to) {
      errors.date = "تاریخ برگشت را نیز انتخاب کنید";
    }

    if (Object.keys(errors).length > 0) {
      setForm((prev) => ({
        ...prev,
        errors: { ...prev.errors, ...errors },
      }));
      return;
    }

    if (typeof window !== "undefined") {
      const payload: PersistedFlightSearchState = {
        tripType: effForm.tripType,
        origin: effForm.origin,
        destination: effForm.destination,
        dateRange: effForm.dateRange
          ? {
              from: effForm.dateRange.from
                ? effForm.dateRange.from.toISOString()
                : undefined,
              to: effForm.dateRange.to
                ? effForm.dateRange.to.toISOString()
                : undefined,
            }
          : null,
        passengers: effForm.passengers,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }

    const adult = effForm.passengers?.adults ?? 1;
    const child = effForm.passengers?.children ?? 0;
    const infant = effForm.passengers?.infants ?? 0;

    const departingISO = effForm.dateRange!.from!.toISOString();

    const params = new URLSearchParams({
      adult: String(adult),
      child: String(child),
      infant: String(infant),
      departing: departingISO,
      trip: effForm.tripType,
    });

    if (effForm.tripType === "round-trip" && effForm.dateRange?.to) {
      params.set("returning", effForm.dateRange.to.toISOString());
    }

    const path = `/flights/${effForm.origin!.code}-${
      effForm.destination!.code
    }?${params.toString()}`;

    setIsSearching(true);
    try {
      router.prefetch(path);
    } catch {}
    router.push(path);
    setIsSearching(false);
    if (onSearchComplete) onSearchComplete();
  };

  return (
    <div className="w-full px-0 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <SelectBox
          value={form.tripType}
          onChange={(val) => {
            setForm((prev) => ({
              ...prev,
              tripType: val,
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
            originValue={form.origin ?? derivedInitial.origin ?? null}
            destinationValue={
              form.destination ?? derivedInitial.destination ?? null
            }
            onOriginChange={handleOriginChangeInternal}
            onDestinationChange={handleDestinationChangeInternal}
            value={form.origin ?? derivedInitial.origin ?? null}
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
                ? form.dateRange ??
                  (derivedInitial.dateRange as typeof form.dateRange)
                : form.dateRange?.from ??
                  (derivedInitial.dateRange as { from?: Date } | undefined)
                    ?.from
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

export default FlightSearchForm;
