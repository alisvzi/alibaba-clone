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
        <h2 className="text-lg font-bold text-foreground">
          پرطرفدارترین مسیرها
        </h2>
        <a
          href="#"
          className="text-sm text-brand hover:text-brand/90 flex items-center gap-1"
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
            className="bg-white rounded-xl border border-border p-4 hover:border-brand hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <span>{route.from}</span>
                    <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                    <span>{route.to}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">پرواز داخلی</span>
                </div>
              </div>
              <div className="text-left">
                <span className="text-xs text-muted-foreground">شروع قیمت از</span>
                <div className="text-brand font-bold">
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
