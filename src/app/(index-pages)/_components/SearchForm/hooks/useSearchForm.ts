import { CityOption, DateRange, SearchActiveStep } from "@/types/search";
import { useCallback, useState } from "react";
import { BaseFormState } from "../types/form.types";

export function useSearchForm<T extends BaseFormState>(initialState: T) {
  const [form, setForm] = useState<T>(initialState);

  const updateField = useCallback((field: keyof T, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field as string]: undefined },
    }));
  }, []);

  const handleOriginChange = useCallback((val: CityOption | null) => {
    setForm((prev) => ({
      ...prev,
      origin: val,
      activeStep: val ? "destination" : prev.activeStep,
      errors: { ...prev.errors, origin: undefined },
    }));
  }, []);

  const handleDestinationChange = useCallback((val: CityOption | null) => {
    setForm((prev) => ({
      ...prev,
      destination: val,
      activeStep: val ? "date" : prev.activeStep,
      errors: { ...prev.errors, destination: undefined },
    }));
  }, []);

  const handleDateRangeChange = useCallback(
    (val: DateRange | Date | undefined) => {
      let dateRange: DateRange | undefined;
      if (!val) {
        dateRange = undefined;
      } else if (val instanceof Date) {
        dateRange = { from: val, to: undefined };
      } else {
        dateRange = val as DateRange;
      }

      setForm((prev) => ({
        ...prev,
        dateRange,
        errors: { ...prev.errors, date: undefined },
      }));
    },
    []
  );

  const setStep = useCallback((step: SearchActiveStep) => {
    setForm((prev) => ({ ...prev, activeStep: step }));
  }, []);

  const onStepChange = useCallback((step: SearchActiveStep, open: boolean) => {
    setForm((prev) => ({
      ...prev,
      activeStep:
        open && prev.activeStep !== step
          ? step
          : !open && prev.activeStep === step
          ? null
          : prev.activeStep,
    }));
  }, []);

  return {
    form,
    setForm,
    updateField,
    handleOriginChange,
    handleDestinationChange,
    handleDateRangeChange,
    setStep,
    onStepChange,
  };
}
