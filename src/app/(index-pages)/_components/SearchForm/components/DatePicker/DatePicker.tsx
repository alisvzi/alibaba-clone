"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarDayButtonGeneric } from "@/components/ui/calendar";
import { useClickOutside } from "@/hooks/useClickOutside";
import { formatCustomDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { DateRange } from "@/types/search";
import { enUS as localeGregorian } from "date-fns/locale";
import { CalendarDays, Check } from "lucide-react";
import * as React from "react";
import { DateInputBox } from "./DateInputBox";
import { DatePickerProps } from "./types";

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

  React.useEffect(() => {
    setTempSelected(selected);
  }, [selected]);

  useClickOutside(containerRef as React.RefObject<HTMLElement>, () =>
    setOpen(false)
  );

  const formatDate = React.useCallback(
    (date: Date | undefined) => formatCustomDate(date, calendarType, "D MMMM"),
    [calendarType]
  );

  let displayStartValue = "";
  let displayEndValue = "";

  if (mode === "range" && selected) {
    const range = selected as DateRange;
    displayStartValue = formatDate(range.from);
    displayEndValue = formatDate(range.to);
  } else if (mode === "single" && selected) {
    displayStartValue = formatDate(selected as Date);
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
      const next = { from: day, to: undefined };
      setTempSelected(next);
      if (onSelect) onSelect(next);
      return;
    }

    if (current.from && !current.to) {
      if (day.getTime() === current.from.getTime()) {
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
      if (onSelect) onSelect(next);
      return;
    }

    const next: DateRange = { from: day, to: undefined };
    setTempSelected(next);
    if (onSelect) onSelect(next);
  };

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
              <CalendarDays className="size-3" />
              تغییر به {calendarType === "jalali" ? "میلادی" : "شمسی"}
            </Button>
          </div>

          <div className="p-2" dir={calendarType === "jalali" ? "rtl" : "ltr"}>
            <Calendar
              key={`${calendarType}-${mode}-${
                (tempSelected as DateRange)?.to ? "full" : "partial"
              }`}
              mode={mode === "range" ? "range" : "single"}
              selected={tempSelected as any}
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
