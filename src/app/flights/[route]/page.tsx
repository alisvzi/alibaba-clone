import DateSlider from "./components/DateSlider";
import FAQ from "./components/FAQ";
import FilterSidebar from "./components/FilterSidebar";
import FlightCard from "./components/FlightCard";
import SearchBar from "./components/SearchBar";

const flights = [
  {
    id: 1,
    airline: "ماهان",
    airlineLogo: "/mahan-airline-logo.jpg",
    flightNumber: "W5 1082",
    departureTime: "06:00",
    arrivalTime: "07:25",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Airbus A310",
    price: 2850000,
    class: "اکونومی",
    type: "سیستمی",
    seatsLeft: 5,
    baggage: "20 کیلوگرم",
  },
  {
    id: 2,
    airline: "ایران ایر",
    airlineLogo: "/iran-air-airline-logo.jpg",
    flightNumber: "IR 352",
    departureTime: "08:30",
    arrivalTime: "09:55",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Fokker 100",
    price: 3200000,
    class: "اکونومی",
    type: "سیستمی",
    seatsLeft: 12,
    baggage: "20 کیلوگرم",
  },
  {
    id: 3,
    airline: "آسمان",
    airlineLogo: "/aseman-airline-logo.jpg",
    flightNumber: "EP 513",
    departureTime: "10:15",
    arrivalTime: "11:40",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "ATR 72",
    price: 2650000,
    class: "اکونومی",
    type: "چارتر",
    seatsLeft: 3,
    baggage: "20 کیلوگرم",
  },
  {
    id: 4,
    airline: "کیش ایر",
    airlineLogo: "/kish-air-airline-logo.jpg",
    flightNumber: "Y9 7062",
    departureTime: "12:45",
    arrivalTime: "14:10",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "MD-82",
    price: 2450000,
    class: "اکونومی",
    type: "چارتر",
    seatsLeft: 8,
    baggage: "20 کیلوگرم",
  },
  {
    id: 5,
    airline: "زاگرس",
    airlineLogo: "/zagros-airline-logo.jpg",
    flightNumber: "IZG 4107",
    departureTime: "15:30",
    arrivalTime: "16:55",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Airbus A320",
    price: 2980000,
    class: "اکونومی",
    type: "سیستمی",
    seatsLeft: 15,
    baggage: "20 کیلوگرم",
  },
  {
    id: 6,
    airline: "وارش",
    airlineLogo: "/varesh-airline-logo.jpg",
    flightNumber: "VR 5802",
    departureTime: "18:00",
    arrivalTime: "19:25",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Boeing 737",
    price: 3100000,
    class: "اکونومی",
    type: "سیستمی",
    seatsLeft: 6,
    baggage: "20 کیلوگرم",
  },
  {
    id: 7,
    airline: "قشم ایر",
    airlineLogo: "/qeshm-air-airline-logo.jpg",
    flightNumber: "QB 1282",
    departureTime: "20:30",
    arrivalTime: "21:55",
    origin: "تهران",
    originCode: "THR",
    destination: "شیراز",
    destinationCode: "SYZ",
    duration: "1 ساعت و 25 دقیقه",
    aircraft: "Airbus A320",
    price: 2750000,
    class: "اکونومی",
    type: "چارتر",
    seatsLeft: 4,
    baggage: "20 کیلوگرم",
  },
];

export default function FlightsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]" dir="rtl">
      <SearchBar />
      <DateSlider />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-[280px] shrink-0 hidden lg:block">
            <FilterSidebar />
          </aside>

          {/* Flight Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6b7280]">مرتب‌سازی:</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm bg-[#fff3e0] text-[#f57c00] rounded-lg font-medium">
                    ارزان‌ترین
                  </button>
                  <button className="px-4 py-2 text-sm bg-white text-[#374151] rounded-lg hover:bg-gray-50">
                    زودترین
                  </button>
                  <button className="px-4 py-2 text-sm bg-white text-[#374151] rounded-lg hover:bg-gray-50">
                    کوتاه‌ترین
                  </button>
                </div>
              </div>
              <span className="text-sm text-[#6b7280]">
                {flights.length} پرواز یافت شد
              </span>
            </div>

            {/* Flight Cards */}
            <div className="space-y-3">
              {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </main>
    </div>
  );
}
