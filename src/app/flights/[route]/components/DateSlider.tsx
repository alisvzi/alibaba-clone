import { ChevronLeft, ChevronRight } from "lucide-react";

const dates = [
  { day: "دوشنبه", date: "۲۴ آذر", price: "۲,۴۵۰,۰۰۰" },
  { day: "سه‌شنبه", date: "۲۵ آذر", price: "۲,۶۵۰,۰۰۰" },
  { day: "چهارشنبه", date: "۲۶ آذر", price: "۲,۴۵۰,۰۰۰", active: true },
  { day: "پنج‌شنبه", date: "۲۷ آذر", price: "۲,۸۵۰,۰۰۰" },
  { day: "جمعه", date: "۲۸ آذر", price: "۳,۱۰۰,۰۰۰" },
  { day: "شنبه", date: "۲۹ آذر", price: "۲,۵۵۰,۰۰۰" },
  { day: "یکشنبه", date: "۳۰ آذر", price: "۲,۷۵۰,۰۰۰" },
];

export default function DateSlider() {
  return (
    <div className="bg-[#fafafa] border-b border-[#e5e7eb] py-3">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#6b7280] hover:bg-white rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {dates.map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center px-4 py-2 rounded-lg min-w-[100px] transition-colors ${
                  item.active
                    ? "bg-[#fff3e0] border-2 border-[#f57c00]"
                    : "bg-white border border-[#e5e7eb] hover:border-[#f57c00]"
                }`}
              >
                <span className="text-xs text-[#6b7280]">{item.day}</span>
                <span className="text-sm font-medium text-[#1f2937]">
                  {item.date}
                </span>
                <span
                  className={`text-xs ${
                    item.active ? "text-[#f57c00]" : "text-[#10b981]"
                  }`}
                >
                  {item.price}
                </span>
              </button>
            ))}
          </div>

          <button className="p-2 text-[#6b7280] hover:bg-white rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
