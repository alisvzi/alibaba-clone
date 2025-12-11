import { Briefcase, Info, Plane } from "lucide-react";

interface FlightProps {
  flight: {
    id: number;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    origin: string;
    originCode: string;
    destination: string;
    destinationCode: string;
    duration: string;
    aircraft: string;
    price: number;
    class: string;
    type: string;
    seatsLeft: number;
    baggage: string;
  };
}

export default function FlightCard({ flight }: FlightProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] hover:border-[#f57c00] hover:shadow-md transition-all overflow-hidden">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="flex items-center gap-4">
            {/* Airline Logo & Info */}
            <div className="flex items-center gap-3 min-w-[140px]">
              <img
                src="/img/airlinelogo.png"
                alt={flight.airline}
                className="w-10 h-10 rounded-lg object-contain"
              />
              <div>
                <p className="font-medium text-[#1f2937]">{flight.airline}</p>
                <p className="text-xs text-[#6b7280]">{flight.flightNumber}</p>
              </div>
            </div>

            {/* Flight Times */}
            <div className="flex-1 flex items-center justify-center gap-4">
              {/* Departure */}
              <div className="text-center">
                <p className="text-2xl font-bold text-[#1f2937]">
                  {flight.departureTime}
                </p>
                <p className="text-sm text-[#6b7280]">{flight.originCode}</p>
              </div>

              {/* Flight Path */}
              <div className="flex-1 max-w-[200px] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#d1d5db]"></div>
                <div className="flex-1 relative">
                  <div className="h-[2px] bg-[#e5e7eb]"></div>
                  <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] rotate-[-90deg]" />
                </div>
                <div className="w-2 h-2 rounded-full bg-[#d1d5db]"></div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <p className="text-2xl font-bold text-[#1f2937]">
                  {flight.arrivalTime}
                </p>
                <p className="text-sm text-[#6b7280]">
                  {flight.destinationCode}
                </p>
              </div>
            </div>

            {/* Duration & Details */}
            <div className="text-center min-w-[120px]">
              <p className="text-sm text-[#6b7280]">{flight.duration}</p>
              <p className="text-xs text-[#9ca3af]">بدون توقف</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f3f4f6]">
            <span className="px-2 py-1 text-xs bg-[#f3f4f6] text-[#6b7280] rounded">
              {flight.class}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded ${
                flight.type === "سیستمی"
                  ? "bg-[#e8f5e9] text-[#2e7d32]"
                  : "bg-[#fff3e0] text-[#f57c00]"
              }`}
            >
              {flight.type}
            </span>
            <span className="px-2 py-1 text-xs bg-[#f3f4f6] text-[#6b7280] rounded flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {flight.baggage}
            </span>
            <span className="px-2 py-1 text-xs bg-[#f3f4f6] text-[#6b7280] rounded">
              {flight.aircraft}
            </span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#fafafa] border-r border-[#e5e7eb] min-w-[180px]">
          {flight.seatsLeft <= 5 && (
            <span className="text-xs text-[#ef4444] mb-1">
              {flight.seatsLeft} صندلی باقی‌مانده
            </span>
          )}
          <p className="text-2xl font-bold text-[#1f2937]">
            {formatPrice(flight.price)}
          </p>
          <p className="text-xs text-[#6b7280] mb-3">تومان</p>
          <button className="w-full px-6 py-2 bg-[#f57c00] text-white rounded-lg hover:bg-[#ef6c00] transition-colors font-medium">
            انتخاب بلیط
          </button>
        </div>
      </div>

      {/* Details Link */}
      <button className="w-full flex items-center justify-center gap-1 py-2 text-sm text-[#f57c00] bg-[#fff8f0] hover:bg-[#fff3e0] transition-colors border-t border-[#fee2b3]">
        <Info className="w-4 h-4" />
        <span>جزئیات پرواز و قوانین استرداد</span>
      </button>
    </div>
  );
}
