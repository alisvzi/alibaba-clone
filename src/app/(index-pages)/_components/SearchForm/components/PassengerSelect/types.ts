import { PassengerCounts } from "@/types/search";

export interface PassengerSelectProps {
  value?: PassengerCounts | null;
  onChange?: (passengers: PassengerCounts) => void;
  className?: string;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

export interface PassengerCounterItemProps {
  label: string;
  subLabel: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minCount?: number;
  maxCount?: number;
}
