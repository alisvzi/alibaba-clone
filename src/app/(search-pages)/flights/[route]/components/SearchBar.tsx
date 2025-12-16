import { Calendar, Search, Share2, Users } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-white border-b border-border py-4">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Share Button */}
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg">
            <Share2 className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">
              بلیط هواپیما
            </span>
            <span className="text-lg font-bold text-foreground">تهران</span>
            <span className="text-muted-foreground">به</span>
            <span className="text-lg font-bold text-foreground">شیراز</span>
          </div>

          {/* Search Fields */}
          <div className="flex-1 flex items-center gap-2 mr-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">چهارشنبه، ۲۶ آذر</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">۱ مسافر</span>
            </div>

            <button className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
