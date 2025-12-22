"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { PassengerCounterItemProps } from "./types";

export function PassengerCounterItem({
  label,
  subLabel,
  count,
  onIncrement,
  onDecrement,
  minCount = 0,
  maxCount = 9,
}: PassengerCounterItemProps) {
  return (
    <div className="flex items-center justify-between mb-4 last:mb-0">
      <div className="flex flex-col text-right">
        <span className="font-semibold text-gray-800 text-xs">{label}</span>
        <span className="text-[11px] text-gray-400 mt-1">{subLabel}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 border-0"
          onClick={onIncrement}
          disabled={count >= maxCount}
        >
          <Plus size={14} />
        </Button>
        <span className="font-semibold w-5 text-center text-sm">{count}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="w-7 h-7 rounded-full"
          onClick={onDecrement}
          disabled={count <= minCount}
        >
          <Minus size={14} />
        </Button>
      </div>
    </div>
  );
}
