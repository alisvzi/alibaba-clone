import { DateRange } from "@/types/search";

export type DatePickerProps = {
  mode?: "single" | "range";
  label?: string;
  startLabel?: string;
  endLabel?: string;
  selected?: Date | DateRange | undefined;
  onSelect?: (date: Date | DateRange | undefined) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  hasError?: boolean;
  errorMessage?: string;
};

export interface DateInputBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  isActive: boolean;
}
