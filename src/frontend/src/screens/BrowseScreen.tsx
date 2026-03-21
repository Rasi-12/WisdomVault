import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import type { Screen } from "../App";
import type { KnowledgeEntry } from "../backend";
import { AudioPlayer } from "../components/AudioPlayer";
import { CATEGORIES, dummyKnowledgeEntries } from "../data/knowledgeData";
import { useGetAllKnowledgeEntries } from "../hooks/useQueries";

interface BrowseScreenProps {
  onNavigate: (screen: Screen) => void;
  onOpenDetail: (entry: KnowledgeEntry) => void;
}

const categoryColors: Record<string, string> = {
  "Traditional Medicine": "bg-blue-50 text-blue-700 border-blue-200",
  "Food Remedies": "bg-orange-50 text-orange-700 border-orange-200",
  "Cultural Stories": "bg-purple-50 text-purple-700 border-purple-200",
  "Farming Practices": "bg-green-50 text-green-700 border-green-200",
};

function langToSpeechCode(language: string): string {
  switch (language) {
    case "Tamil":
      return "ta-IN";
    case "Telugu":
      return "te-IN";
    case "Hindi":
      return "hi-IN";
    default:
      return "en-US";
  }
}

export function BrowseScreen({
  onNavigate: _onNavigate,
  onOpenDetail,
}: BrowseScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: entries = dummyKnowledgeEntries } = useGetAllKnowledgeEntries();

  const filtered = entries.filter((e) => {
    const matchesCategory =
      activeCategory === "All" || e.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div data-ocid="browse.page" className="flex flex-col">
      {/* Header */}
      <div
        className="px-4 pt-5 pb-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
        }}
      >
        <h2 className="text-xl font-bold text-white mb-3">Browse Knowledge</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="browse.search_input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search knowledge entries..."
            className="pl-9 bg-white border-0 shadow-card h-10 text-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-border bg-card">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            data-ocid={`browse.${cat.toLowerCase().replace(/\s+/g, "_")}.tab`}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-primary/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"} found
        </p>
      </div>

      {/* Knowledge Cards */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div data-ocid="browse.empty_state" className="text-center py-12">
            <p className="text-muted-foreground">No entries found</p>
          </div>
        ) : (
          filtered.map((entry, idx) => (
            <button
              type="button"
              key={entry.id}
              data-ocid={`browse.item.${idx + 1}`}
              onClick={() => onOpenDetail(entry)}
              className="bg-card rounded-2xl p-4 shadow-card border border-border text-left hover:shadow-glow transition-shadow active:scale-[0.99] animate-fade-in"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-base text-foreground leading-tight flex-1">
                  {entry.title}
                </h3>
                {entry.verified && (
                  <Badge className="bg-accent/20 text-primary border-0 text-[10px] flex-shrink-0">
                    ✓ Verified
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${
                    categoryColors[entry.category] ||
                    "bg-muted text-muted-foreground"
                  }`}
                >
                  {entry.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {entry.region}
                </span>
                <span className="text-xs text-muted-foreground">
                  {entry.language}
                </span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                {entry.description}
              </p>

              <AudioPlayer
                title={entry.title}
                durationSeconds={72}
                variant="compact"
                speechText={entry.description}
                speechLang={langToSpeechCode(entry.language)}
              />
            </button>
          ))
        )}
      </div>

      {/* Disclaimer */}
      <div className="mx-4 mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-xs text-amber-800">
          ⚠️ For informational purposes only. Not medical advice.
        </p>
      </div>
    </div>
  );
}
