export const bannerMap: Record<string, string> = {
  "/": "/img/banners/flight.webp",
  "/iranout": "/img/banners/flightout.webp",
  "/train-ticket": "/img/banners/train.webp",
  "/bus-ticket": "/img/banners/bus.webp",
  "/hotel": "/img/banners/hotel.webp",
  "/accommodation": "/img/banners/accommodation.webp",
  "/tour": "/img/banners/tour.webp",
};

export function getBannerSrc(pathname: string | null | undefined) {
  if (!pathname) return bannerMap["/"];
  return bannerMap[pathname] || bannerMap["/"];
}
