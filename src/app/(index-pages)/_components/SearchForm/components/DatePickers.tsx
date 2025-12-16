"use client";

import { CalendarDays } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface CustomDatePickerProps {
  label: string;
  value?: DateObject | DateObject[] | null;
  onChange?: (date: DateObject | DateObject[] | null) => void;
  range?: boolean;
  minDate?: DateObject | Date;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  highlightDate?: DateObject | null;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value = null,
  onChange,
  range = false,
  minDate,
  isOpen,
  onOpen,
  onClose,
  highlightDate,
}) => {
  const pickerRef = useRef<{
    openCalendar?: () => void;
    closeCalendar?: () => void;
  } | null>(null);
  const [internalValue, setInternalValue] = useState<
    DateObject | DateObject[] | null
  >(value ?? null);

  // control open/close from parent
  useEffect(() => {
    if (isOpen) {
      pickerRef.current?.openCalendar?.();
    } else {
      pickerRef.current?.closeCalendar?.();
    }
  }, [isOpen]);

  const commitIfNeeded = (val: DateObject | DateObject[] | null) => {
    if (!range) {
      onChange?.(val);
      return true;
    }
    if (Array.isArray(val) && val.length >= 2) {
      onChange?.(val);
      return true;
    }
    return false;
  };

  const handleChange = (val: DateObject | DateObject[] | null) => {
    setInternalValue(val ?? null);

    if (commitIfNeeded(val ?? null)) {
      pickerRef.current?.closeCalendar?.();
    }
  };

  const handleClose = () => {
    if (onChange) onChange(internalValue ?? null);
    onClose?.();
  };

  const open = () => {
    onOpen?.();
    setInternalValue(value ?? null);
    pickerRef.current?.openCalendar?.();
  };

  const hasValue = !!value && (Array.isArray(value) ? value.length > 0 : true);

  const formattedValue = (() => {
    if (!value) return "";
    if (Array.isArray(value)) {
      return value.map((d) => d.format("D MMMM")).join(" - ");
    }
    return value.format("D MMMM");
  })();

  return (
    <div
      className="relative h-full px-4 py-2 hover:bg-gray-100/50 transition-colors cursor-pointer flex flex-col justify-center w-full"
      onClick={open}
    >
      {!hasValue && (
        <div className="absolute inset-0 flex items-center gap-2 text-base text-gray-500 font-bold pointer-events-none z-10">
          <CalendarDays className="w-5 h-5 opacity-50 mr-4" />
          <span>{label}</span>
        </div>
      )}

      {hasValue && (
        <div className="pt-1 text-base font-semibold text-gray-800 h-[28px] flex items-center z-20">
          {formattedValue}
        </div>
      )}

      <div
        className="absolute inset-0 z-30"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <DatePicker
          ref={pickerRef}
          value={internalValue}
          onChange={handleChange}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          range={range}
          minDate={minDate}
          arrow={false}
          offsetY={10}
          numberOfMonths={2}
          rangeHover
          className="alibaba-datepicker"
          portal
          editable={false}
          onOpen={() => onOpen?.()}
          onClose={handleClose}
          mapDays={({ date }) => {
            if (
              highlightDate &&
              date.format("YYYY-MM-DD") ===
                (highlightDate as DateObject).format("YYYY-MM-DD")
            ) {
              return { className: "highlight" };
            }
            return {};
          }}
          containerClassName="w-full h-full"
          inputClass="w-full h-full opacity-0 pointer-events-auto absolute top-0 left-0"
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
