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
    <div className="bg-muted border-b border-border py-3">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:bg-white rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {dates.map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center px-4 py-2 rounded-lg min-w-[100px] transition-colors ${
                  item.active
                    ? "bg-white border-2 border-primary"
                    : "bg-white border border-border hover:border-primary/50"
                }`}
              >
                <span className="text-xs text-muted-foreground">{item.day}</span>
                <span className="text-sm font-medium text-foreground">
                  {item.date}
                </span>
                <span
                  className={`text-xs ${
                    item.active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.price}
                </span>
              </button>
            ))}
          </div>

          <button className="p-2 text-muted-foreground hover:bg-white rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
