import { ArrowLeft, Plane } from "lucide-react";

const popularRoutes = [
  {
    id: 1,
    from: "تهران",
    to: "مشهد",
    price: "۱,۲۵۰,۰۰۰",
  },
  {
    id: 2,
    from: "تهران",
    to: "کیش",
    price: "۱,۸۰۰,۰۰۰",
  },
  {
    id: 3,
    from: "تهران",
    to: "شیراز",
    price: "۱,۴۵۰,۰۰۰",
  },
  {
    id: 4,
    from: "تهران",
    to: "اصفهان",
    price: "۹۸۰,۰۰۰",
  },
  {
    id: 5,
    from: "مشهد",
    to: "تهران",
    price: "۱,۳۰۰,۰۰۰",
  },
  {
    id: 6,
    from: "تهران",
    to: "تبریز",
    price: "۱,۱۰۰,۰۰۰",
  },
];

export default function PopularRoutes() {
  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#1f2937]">
          پرطرفدارترین مسیرها
        </h2>
        <a
          href="#"
          className="text-sm text-[#f57c00] hover:text-[#e65100] flex items-center gap-1"
        >
          مشاهده همه
          <ArrowLeft className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularRoutes.map((route) => (
          <a
            key={route.id}
            href="#"
            className="bg-white rounded-xl border border-[#e5e7eb] p-4 hover:border-[#f57c00] hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fff3e0] rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-[#f57c00]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#374151] font-medium">
                    <span>{route.from}</span>
                    <ArrowLeft className="w-4 h-4 text-[#9ca3af]" />
                    <span>{route.to}</span>
                  </div>
                  <span className="text-xs text-[#9ca3af]">پرواز داخلی</span>
                </div>
              </div>
              <div className="text-left">
                <span className="text-xs text-[#9ca3af]">شروع قیمت از</span>
                <div className="text-[#f57c00] font-bold">
                  {route.price}
                  <span className="text-xs font-normal mr-1">تومان</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
