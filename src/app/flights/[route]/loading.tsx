export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]" dir="rtl">
      {/* Top placeholder for SearchBar & DateSlider area */}
      <div className="w-full bg-white/80 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          {/* Search bar skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-3 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="h-12 rounded-lg bg-gray-200"></div>
              <div className="h-12 rounded-lg bg-gray-200"></div>
              <div className="h-12 rounded-lg bg-gray-200"></div>
              <div className="h-12 rounded-lg bg-gray-200"></div>
            </div>
          </div>

          {/* Date slider skeleton */}
          <div className="mt-4 flex gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-28 h-14 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar skeleton */}
          <aside className="w-[280px] shrink-0 hidden lg:block">
            <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
              <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              ))}
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </aside>

          {/* Flight cards skeleton list */}
          <div className="flex-1">
            {/* Result header skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="flex items-center justify-end gap-3">
                        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-xl border border-gray-200 p-3">
                <div className="h-full w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

