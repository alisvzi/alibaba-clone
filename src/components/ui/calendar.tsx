"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import * as React from "react";

import {
  DayPicker as DayPickerPersian,
  type DayButton as DayButtonPersian,
} from "react-day-picker/persian";

import {
  DayPicker as DayPickerGregorian,
  type DayButton as DayButtonGregorian,
} from "react-day-picker";

import { Button, buttonVariants } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip"; // اضافه شده
import { cn } from "@/lib/utils";

// تعریف نوع DayButton برای تایپ عمومی
type AnyDayButtonProps = React.ComponentProps<typeof DayButtonPersian>;

// اضافه کردن export برای استفاده در کامپوننت DatePicker
export function CalendarDayButtonGeneric({
  className,
  day,
  modifiers,
  ...props
}: AnyDayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-[var(--cell-size)] flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-l-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-r-md [&>span]:text-xs [&>span]:opacity-70",
        className
      )}
      {...props}
    />
  );
}

function CalendarDayButtonPersian(
  props: React.ComponentProps<typeof DayButtonPersian>
) {
  return <CalendarDayButtonGeneric {...props} />;
}

function CalendarDayButtonGregorian(
  props: React.ComponentProps<typeof DayButtonGregorian>
) {
  return <CalendarDayButtonGeneric {...props} />;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  calendar = "jalali",
  ...props
}: React.ComponentProps<typeof DayPickerPersian> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  calendar?: "jalali" | "gregorian";
}) {
  const CurrentDayPicker =
    calendar === "jalali" ? DayPickerPersian : DayPickerGregorian;
  const CurrentDayButton =
    calendar === "jalali"
      ? CalendarDayButtonPersian
      : CalendarDayButtonGregorian;
  return (
    <TooltipProvider>
      <CurrentDayPicker
        dir="rtl"
        showOutsideDays={showOutsideDays}
        className={cn(
          "bg-background group/calendar p-3 [--cell-size:2.5rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
          String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
          String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
          className
        )}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) =>
            date.toLocaleString("default", { month: "short" }),
          ...formatters,
        }}
        classNames={{
          root: cn("w-fit"),
          months: cn("flex gap-4 flex-col md:flex-row relative"),
          month: cn("flex flex-col w-full gap-4"),
          nav: cn(
            "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between"
          ),
          button_previous: cn(
            buttonVariants({ variant: buttonVariant }),
            "size-[var(--cell-size)] aria-disabled:opacity-50 p-0 select-none"
          ),
          button_next: cn(
            buttonVariants({ variant: buttonVariant }),
            "size-[var(--cell-size)] aria-disabled:opacity-50 p-0 select-none"
          ),
          month_caption: cn(
            "flex items-center justify-center h-[var(--cell-size)] w-full px-[var(--cell-size)]"
          ),
          dropdowns: cn(
            "w-full flex items-center text-sm font-medium justify-center h-[var(--cell-size)] gap-1.5"
          ),
          dropdown_root: cn(
            "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md"
          ),
          dropdown: cn("absolute bg-popover inset-0 opacity-0"),
          caption_label: cn(
            "select-none font-medium",
            captionLayout === "label"
              ? "text-sm"
              : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5"
          ),
          table: "w-full border-collapse",
          weekdays: cn("flex"),
          weekday: cn(
            "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none"
          ),
          week: cn("flex w-full mt-2"),
          week_number_header: cn("select-none w-[var(--cell-size)]"),
          week_number: cn("text-[0.8rem] select-none text-muted-foreground"),
          day: cn(
            "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-l-md group/day aspect-square select-none",
            props.showWeekNumber
              ? "[&:nth-child(2)[data-selected=true]_button]:rounded-r-md"
              : "[&:first-child[data-selected=true]_button]:rounded-r-md"
          ),
          range_start: cn("rounded-r-md bg-accent"),
          range_middle: cn("rounded-none"),
          range_end: cn("rounded-l-md bg-accent"),
          today: cn(
            "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none"
          ),
          outside: cn(
            "text-muted-foreground aria-selected:text-muted-foreground"
          ),
          disabled: cn("text-muted-foreground opacity-50"),
          hidden: cn("invisible"),
          ...classNames,
        }}
        components={{
          Root: ({ className, rootRef, ...props }) => {
            return (
              <div
                data-slot="calendar"
                ref={rootRef}
                className={cn(className)}
                {...props}
              />
            );
          },
          Chevron: ({ className, orientation, ...props }) => {
            if (orientation === "left") {
              return (
                <ChevronRightIcon
                  className={cn("size-4", className)}
                  {...props}
                />
              );
            }
            if (orientation === "right") {
              return (
                <ChevronLeftIcon
                  className={cn("size-4", className)}
                  {...props}
                />
              );
            }
            return (
              <ChevronDownIcon className={cn("size-4", className)} {...props} />
            );
          },
          DayButton: CurrentDayButton,
          WeekNumber: ({ children, ...props }) => {
            return (
              <td {...props}>
                <div className="flex size-[var(--cell-size)] items-center justify-center text-center">
                  {children}
                </div>
              </td>
            );
          },
          ...components,
        }}
        {...props}
      />
    </TooltipProvider>
  );
}

export { Calendar };
