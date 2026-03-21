import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin } from "lucide-react";
import type { KnowledgeEntry } from "../backend";
import { AudioPlayer } from "../components/AudioPlayer";

interface KnowledgeDetailScreenProps {
  entry: KnowledgeEntry;
  onBack: () => void;
}

export function KnowledgeDetailScreen({
  entry,
  onBack,
}: KnowledgeDetailScreenProps) {
  return (
    <div data-ocid="detail.page" className="flex flex-col">
      {/* Header */}
      <div
        className="px-4 pt-4 pb-6"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
        }}
      >
        <button
          type="button"
          data-ocid="detail.back.button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <h2 className="text-2xl font-bold text-white leading-tight mb-2">
          {entry.title}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-white/20 text-white border-0 text-xs">
            {entry.category}
          </Badge>
          <span className="flex items-center gap-1 text-white/80 text-xs">
            <MapPin className="w-3 h-3" />
            {entry.region}
          </span>
          <Badge className="bg-white/20 text-white border-0 text-xs">
            {entry.language}
          </Badge>
          {entry.verified && (
            <Badge className="bg-white/20 text-white border-0 text-xs">
              ✓ Verified
            </Badge>
          )}
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Audio Player */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-4 text-center">
            Elder Voice Recording
          </p>
          <AudioPlayer
            title={entry.title}
            durationSeconds={72}
            variant="large"
          />
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border mb-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
            About This Knowledge
          </h3>
          <p className="text-base text-foreground leading-relaxed">
            {entry.description}
          </p>
        </div>

        {/* Transcription */}
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20 mb-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Transcription — {entry.language}
          </h3>
          <p className="text-base text-foreground leading-relaxed" dir="auto">
            {entry.transcription}
          </p>
        </div>

        {/* Contributor Info */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border mb-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Contributor
          </h3>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {String(entry.contributorAge)}
              </div>
              <div className="text-xs text-muted-foreground">Age</div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">
                This knowledge was shared by an elder from {entry.region},
                preserving traditional practices passed down through
                generations.
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-800">
            ⚠️ For informational purposes only. Not medical advice. Consult a
            qualified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
