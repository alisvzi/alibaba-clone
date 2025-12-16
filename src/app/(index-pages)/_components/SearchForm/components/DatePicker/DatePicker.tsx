"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarDayButtonGeneric } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { DateRange } from "@/types/search";
import { addDays, format } from "date-fns";
import { enUS as localeGregorian } from "date-fns/locale";
import { ArrowLeftRight, Check } from "lucide-react";
import * as React from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Matcher } from "react-day-picker";
import { DateInputBoxProps, DatePickerProps } from "./types";

function DateInputBox({
  value,
  label,
  isActive,
  className,
  ...props
}: DateInputBoxProps) {
  const isFloating = isActive || value.length > 0;

  return (
    <div
      className={cn(
        "relative flex items-center rounded-lg bg-background transition-all duration-200 h-11 w-full",
        isActive ? "border-primary ring-2 ring-primary/20" : "border-input",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute right-3 pointer-events-none transition-all duration-200 ease-in-out px-1 bg-background text-muted-foreground",
          isFloating
            ? "-top-2.5 text-xs text-primary scale-90 -mr-1"
            : "top-3 text-sm"
        )}
      >
        {label}
      </span>
      <div className="px-3 py-2 w-full bg-transparent outline-none text-sm h-full flex items-center pt-3 select-none">
        {value}
      </div>
    </div>
  );
}

function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function DatePicker({
  mode = "single",
  label = "تاریخ",
  startLabel = "تاریخ رفت",
  endLabel = "تاریخ برگشت",
  selected,
  onSelect,
  isOpen,
  onOpenChange,
  onConfirm,
  hasError,
  errorMessage,
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = isOpen ?? internalOpen;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [tempSelected, setTempSelected] = React.useState<
    Date | DateRange | undefined
  >(selected);

  const [calendarType, setCalendarType] = React.useState<
    "jalali" | "gregorian"
  >("jalali");

  const setOpen = (next: boolean) => {
    if (isOpen === undefined) {
      setInternalOpen(next);
    }
    if (onOpenChange) {
      onOpenChange(next);
    }
  };

  React.useEffect(() => {}, []);

  useClickOutside(containerRef as React.RefObject<HTMLElement>, () =>
    setOpen(false)
  );

  const formatDate = React.useCallback(
    (date: Date | undefined) => {
      if (!date) return "";
      if (calendarType === "jalali") {
        const d = new DateObject({
          date,
          calendar: persian,
          locale: persian_fa,
        });
        return d.format("D MMMM");
      }
      return format(date, "d MMMM", { locale: localeGregorian });
    },
    [calendarType]
  );

  let displayStartValue = "";
  let displayEndValue = "";

  const formatDisplayInput = (date: Date | undefined) => {
    if (!date) return "";
    if (calendarType === "jalali") {
      const d = new DateObject({
        date,
        calendar: persian,
        locale: persian_fa,
      });
      return d.format("D MMMM");
    }
    return format(date, "d MMMM", { locale: localeGregorian });
  };

  if (mode === "range" && selected) {
    const range = selected as DateRange;
    displayStartValue = formatDisplayInput(range.from);
    displayEndValue = formatDisplayInput(range.to);
  } else if (mode === "single" && selected) {
    displayStartValue = formatDisplayInput(selected as Date);
  }

  const footerStartValue = React.useMemo(() => {
    if (mode === "range") return formatDate((tempSelected as DateRange)?.from);
    return formatDate(tempSelected as Date);
  }, [tempSelected, mode, formatDate]);

  const footerEndValue = React.useMemo(() => {
    if (mode === "range") return formatDate((tempSelected as DateRange)?.to);
    return "";
  }, [tempSelected, mode, formatDate]);

  const toggleCalendarType = () => {
    setCalendarType((prev) => (prev === "jalali" ? "gregorian" : "jalali"));
  };

  const handleConfirm = () => {
    setOpen(false);
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleSingleSelect = (value: Date | undefined) => {
    setTempSelected(value);
    if (onSelect && value) {
      onSelect(value);
    }
  };

  const handleRangeDayClick = (day: Date) => {
    const current = tempSelected as DateRange | undefined;

    if (!current || (!current.from && !current.to)) {
      setTempSelected({ from: day, to: undefined });
      return;
    }

    if (current.from && !current.to) {
      if (day.getTime() === current.from.getTime()) {
        setTempSelected({ from: current.from, to: undefined });
        return;
      }

      let from = current.from;
      let to = day;

      if (day < current.from) {
        from = day;
        to = current.from;
      }

      const next: DateRange = { from, to };
      setTempSelected(next);
      if (onSelect) {
        onSelect(next);
      }
      return;
    }

    const next: DateRange = { from: day, to: undefined };
    setTempSelected(next);
    if (onSelect) {
      onSelect(next);
    }
  };

  const rangeSelectedMatcher = React.useMemo(() => {
    if (mode !== "range") return undefined;
    const range = tempSelected as DateRange | undefined;
    if (!range?.from) return undefined;
    if (!range.to) return range.from;
    return { from: range.from, to: range.to } as DateRange;
  }, [tempSelected, mode]);

  const rangeModifiers = React.useMemo(() => {
    if (mode !== "range") return undefined;
    const range = tempSelected as DateRange | undefined;
    if (!range) return undefined;

    const base: Record<string, Date | Matcher> = {
      range_start: range.from as Date,
      range_end: range.to as Date,
    };

    if (range.from && range.to) {
      const middleFrom = addDays(range.from, 1);
      const middleTo = addDays(range.to, -1);

      if (middleFrom.getTime() <= middleTo.getTime()) {
        base.range_middle = { from: middleFrom, to: middleTo };
      }
    }

    return base;
  }, [tempSelected, mode]);

  const CustomDayButton = (
    props: React.ComponentProps<typeof CalendarDayButtonGeneric>
  ) => {
    return <CalendarDayButtonGeneric {...props} />;
  };

  return (
    <div className="w-full relative" dir="rtl" ref={containerRef}>
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        {mode === "single" ? (
          <div
            className={cn("border rounded-lg", hasError && "border-red-500")}
          >
            <DateInputBox
              value={displayStartValue}
              label={label!}
              isActive={open}
            />
          </div>
        ) : (
          <div
            className={cn(
              "border rounded-lg flex items-center gap-2",
              hasError && "border-red-500"
            )}
          >
            <div className="flex-1">
              <DateInputBox
                value={displayStartValue}
                label={startLabel!}
                isActive={open && !displayStartValue}
              />
            </div>
            <div className="w-0.5 h-4 bg-muted-foreground/30 rounded-full shrink-0" />
            <div className="flex-1">
              <DateInputBox
                value={displayEndValue}
                label={endLabel!}
                isActive={open && !!displayStartValue && !displayEndValue}
              />
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-50 w-auto min-w-[300px] rounded-md border bg-popover shadow-md text-popover-foreground outline-none">
          <div className="flex items-center justify-between p-3 border-b bg-muted/30 rounded-t-md">
            <span className="text-sm font-medium text-muted-foreground">
              تقویم {calendarType === "jalali" ? "شمسی" : "میلادی"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCalendarType}
              className="h-8 gap-2 text-xs"
            >
              <ArrowLeftRight className="size-3" />
              تغییر به {calendarType === "jalali" ? "میلادی" : "شمسی"}
            </Button>
          </div>

          <div className="p-2" dir={calendarType === "jalali" ? "rtl" : "ltr"}>
            <Calendar
              mode={mode === "range" ? "range" : "single"}
              selected={
                mode === "range"
                  ? (rangeSelectedMatcher as DateRange | undefined)
                  : (tempSelected as Date | undefined)
              }
              modifiers={mode === "range" ? rangeModifiers : undefined}
              showOutsideDays={false}
              onDayClick={mode === "range" ? handleRangeDayClick : undefined}
              onSelect={mode === "single" ? handleSingleSelect : undefined}
              classNames={{
                today:
                  "rounded-md border border-primary text-primary bg-background data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
              }}
              initialFocus
              numberOfMonths={2}
              calendar={calendarType}
              locale={
                calendarType === "gregorian" ? localeGregorian : undefined
              }
              disabled={{ before: new Date() }}
              className="rounded-md w-full"
              components={{
                DayButton: CustomDayButton,
              }}
            />
          </div>

          <div
            className="flex items-center justify-between p-3 border-t bg-muted/10 rounded-b-md"
            dir="rtl"
          >
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              {mode === "range" ? (
                <>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>
                      {startLabel}:{" "}
                      <span className="font-bold text-foreground">
                        {footerStartValue || "-"}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>
                      {endLabel}:{" "}
                      <span className="font-bold text-foreground">
                        {footerEndValue || "-"}
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <span>تاریخ انتخاب شده: {footerStartValue || "-"}</span>
              )}
            </div>

            <Button size="sm" onClick={handleConfirm} className="gap-2">
              <Check className="size-4" />
              تایید تاریخ
            </Button>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="hidden lg:block absolute -bottom-5 right-0 text-[11px] text-red-600 text-right">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
