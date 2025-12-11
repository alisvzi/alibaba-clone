import { Calendar, Search, Share2, Users } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-white border-b border-[#e5e7eb] py-4">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Share Button */}
          <button className="p-2 text-[#6b7280] hover:bg-gray-100 rounded-lg">
            <Share2 className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-[#1f2937]">
              بلیط هواپیما
            </span>
            <span className="text-lg font-bold text-[#1f2937]">تهران</span>
            <span className="text-[#6b7280]">به</span>
            <span className="text-lg font-bold text-[#1f2937]">شیراز</span>
          </div>

          {/* Search Fields */}
          <div className="flex-1 flex items-center gap-2 mr-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-lg">
              <Calendar className="w-5 h-5 text-[#6b7280]" />
              <span className="text-sm text-[#374151]">چهارشنبه، ۲۶ آذر</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-lg">
              <Users className="w-5 h-5 text-[#6b7280]" />
              <span className="text-sm text-[#374151]">۱ مسافر</span>
            </div>

            <button className="flex items-center gap-2 px-6 py-2 bg-[#f57c00] text-white rounded-lg hover:bg-[#ef6c00] transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
