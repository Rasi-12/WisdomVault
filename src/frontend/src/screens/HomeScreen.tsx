import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cpu, Headphones, Leaf, Search } from "lucide-react";
import { useState } from "react";
import type { Screen } from "../App";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onNavigate("browse");
    }
  };

  return (
    <div data-ocid="home.page" className="flex flex-col">
      <div
        className="px-6 pt-8 pb-10 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.377 0.12 143) 0%, oklch(0.445 0.118 143) 100%)",
        }}
      >
        <div className="flex justify-center mb-3">
          <img
            src="/assets/uploads/logo-1.jpeg"
            alt="WisdomVault Logo"
            className="h-24 w-auto object-contain rounded-xl shadow-glow"
          />
        </div>
        <p className="text-white/80 text-sm font-light">
          AI Elder Knowledge System
        </p>
        <p className="text-white/70 text-xs mt-1">
          Preserving traditional village wisdom through elder voices
        </p>

        <div className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="home.search_input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ask about remedies, recipes, cultural stories..."
              className="pl-9 bg-white text-foreground placeholder:text-muted-foreground border-0 shadow-card text-sm h-11"
            />
          </div>
          <Button
            data-ocid="home.search.primary_button"
            onClick={handleSearch}
            className="h-11 px-4 font-medium bg-white text-primary hover:bg-white/90"
          >
            Search
          </Button>
        </div>
      </div>

      <div className="px-4 -mt-4 flex flex-col gap-3">
        <button
          type="button"
          data-ocid="home.elder_voices.card"
          onClick={() => onNavigate("elderVoices")}
          className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-start gap-4 text-left hover:shadow-glow transition-shadow active:scale-[0.99]"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Headphones className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground">
                Authentic Elder Voices
              </span>
              <span className="text-[10px] bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full font-medium">
                Live
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Listen to original recordings from village elders sharing
              generational wisdom in their native languages.
            </p>
          </div>
          <span className="text-muted-foreground text-lg">›</span>
        </button>

        <div
          data-ocid="home.ai_discovery.card"
          className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-start gap-4 opacity-75"
        >
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Cpu className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground">
                AI-Guided Discovery
              </span>
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                Coming Soon
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Intelligent search across thousands of knowledge entries using
              natural language queries.
            </p>
          </div>
        </div>

        <button
          type="button"
          data-ocid="home.cultural.card"
          onClick={() => onNavigate("cultural")}
          className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-start gap-4 text-left hover:shadow-glow transition-shadow active:scale-[0.99]"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground">
                Cultural Connections
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore how food, health, rituals, and stories form a unified
              tapestry of ancestral knowledge.
            </p>
          </div>
          <span className="text-muted-foreground text-lg">›</span>
        </button>
      </div>

      <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
        {[
          { value: "100+", label: "Elders Engaged" },
          { value: "3+", label: "Languages" },
          { value: "50+", label: "Knowledge Entries" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-primary/5 rounded-xl p-3 text-center border border-primary/10"
          >
            <div className="text-xl font-bold text-primary">{stat.value}</div>
            <div className="text-xs text-muted-foreground leading-tight mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4 mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-xs text-amber-800 leading-relaxed">
          ⚠️ <strong>Disclaimer:</strong> All knowledge entries are for
          informational purposes only. Not medical advice. Consult a qualified
          healthcare professional before following any remedy.
        </p>
      </div>

      <footer className="px-4 pb-4 text-center">
        <p className="text-xs text-muted-foreground">
          Built with ❤️ in India, for every elder voice
        </p>
      </footer>
    </div>
  );
}
