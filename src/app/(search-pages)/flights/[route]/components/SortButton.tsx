import { SortKey } from "@/utils/flight-helper";

interface SortButtonProps {
  sortKey: SortKey;
  label: string;
  isActive: boolean;
  onClick: (key: SortKey) => void;
}

export const SortButton = ({
  sortKey,
  label,
  isActive,
  onClick,
}: SortButtonProps) => (
  <button
    onClick={() => onClick(sortKey)}
    className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
      isActive
        ? "bg-primary/10 text-primary"
        : "bg-white text-foreground hover:bg-muted"
    }`}
  >
    {label}
  </button>
);
