import { Badge } from "@/components/ui/badge";
import { Flight } from "@/types/flight";
import { formatPrice } from "@/utils/formatters";
import { Plane } from "lucide-react";
import AirlineLogoImage from "./AirlineLogoImage";

interface FlightProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightProps) {
  return (
    <div className="bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3 min-w-[140px] w-full md:w-auto">
              <AirlineLogoImage src={flight.airlineLogo} alt={flight.airline} />
              <div>
                <p className="font-medium text-foreground">{flight.airline}</p>
                <p className="text-xs text-muted-foreground">
                  {flight.flightNumber}
                </p>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center gap-4 w-full">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {flight.departureTime}
                </p>
                <p className="text-sm text-muted-foreground">
                  {flight.originCode}
                </p>
              </div>

              <div className="flex-1 max-w-[200px] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted"></div>
                <div className="flex-1 relative">
                  <div className="h-[2px] bg-border"></div>
                  <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-[-90deg]" />
                </div>
                <div className="w-2 h-2 rounded-full bg-muted"></div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {flight.arrivalTime}
                </p>
                <p className="text-sm text-muted-foreground">
                  {flight.destinationCode}
                </p>
              </div>
            </div>

            <div className="text-center min-w-[120px] hidden md:block">
              <p className="text-sm text-muted-foreground">{flight.duration}</p>
              <p className="text-xs text-muted-foreground">بدون توقف</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <Badge variant="secondary">{flight.class}</Badge>

            <Badge
              variant={flight.type === "سیستمی" ? "default" : "outline"}
              className={
                flight.type === "سیستمی"
                  ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-50"
              }
            >
              {flight.type}
            </Badge>

            <Badge variant="secondary">{flight.aircraft}</Badge>

            {flight.seatsLeft < 10 && (
              <span className="text-xs text-destructive mr-auto">
                {flight.seatsLeft} صندلی باقی‌مانده
              </span>
            )}
          </div>
        </div>

        <div className="w-full md:w-[200px] bg-muted/30 border-t md:border-t-0 md:border-r border-border p-4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3">
          <div className="text-center md:text-right">
            <p className="text-lg font-bold text-primary">
              {formatPrice(flight.price)}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                تومان
              </span>
            </p>
            <p className="text-xs text-muted-foreground hidden md:block mt-1">
              قیمت برای یک بزرگسال
            </p>
          </div>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto">
            انتخاب پرواز
          </button>
        </div>
      </div>
    </div>
  );
}
