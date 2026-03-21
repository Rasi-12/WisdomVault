import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

interface CulturalConnectionsScreenProps {
  onBack: () => void;
}

const stories = [
  {
    emoji: "🌾",
    title: "Food Habits",
    description:
      "Seasonal grains, millets, herbs, and home meals built health from within. The diet was tuned to the body's rhythm and the earth's seasons.",
    color: "from-amber-500 to-yellow-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    emoji: "🍵",
    title: "Home Remedies",
    description:
      "Food became medicine: ginger, pepper, turmeric, and honey were the original pharmacopeia. The kitchen was the first clinic.",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    emoji: "🧘",
    title: "Daily Practices",
    description:
      "Movement, breathing, and intentional rest balanced the body and calmed the mind. Wellness was woven into daily routine.",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    emoji: "🪔",
    title: "Rituals",
    description:
      "Festivals, prayers, and seasonal ceremonies reinforced gratitude, discipline, and a deep sense of belonging within the community.",
    color: "from-purple-500 to-indigo-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    emoji: "📖",
    title: "Oral Stories",
    description:
      "Wisdom was passed as stories — memorable, layered with meaning, and alive in the telling. Each generation became the keeper.",
    color: "from-green-500 to-teal-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
];

export function CulturalConnectionsScreen({
  onBack,
}: CulturalConnectionsScreenProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div data-ocid="cultural.page" className="flex flex-col">
      {/* Header */}
      <div
        className="px-4 pt-4 pb-8"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
        }}
      >
        <button
          type="button"
          data-ocid="cultural.back.button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <h2 className="text-2xl font-bold text-white mb-1">
          Wisdom Lives as a Connected Story
        </h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Each thread of traditional knowledge is woven into a larger cultural
          fabric.
        </p>
      </div>

      <div className="px-4 py-6">
        {/* Horizontal scroll instruction */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">
            Connected Stories
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Scroll <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        {/* Horizontal Scrollable Story Blocks */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {stories.map((story, i) => (
            <div
              key={story.title}
              className="flex items-center gap-1 flex-shrink-0"
            >
              <div
                data-ocid={`cultural.item.${i + 1}`}
                className={`w-52 rounded-2xl p-5 border ${story.bg} ${story.border} shadow-card`}
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="text-4xl mb-3">{story.emoji}</div>
                <h3 className="font-bold text-base text-foreground mb-2">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {story.description}
                </p>
              </div>
              {i < stories.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Connection Dots */}
        <div className="flex justify-center gap-1 mt-4">
          {stories.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-full transition-all ${
                i === 0 ? "w-4 h-2 bg-primary" : "w-2 h-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-6 bg-primary/5 rounded-2xl p-4 border border-primary/20">
          <p className="text-sm text-foreground italic leading-relaxed text-center">
            "Cultural knowledge flowed naturally through food, health, routine,
            belief, and storytelling"
          </p>
        </div>

        {/* All Stories List */}
        <h4 className="font-semibold text-foreground mt-6 mb-3">
          All Cultural Themes
        </h4>
        <div className="flex flex-col gap-3">
          {stories.map((story, i) => (
            <div
              key={story.title}
              data-ocid={`cultural.list.item.${i + 1}`}
              className={`${story.bg} ${story.border} border rounded-xl p-4 flex gap-4`}
            >
              <span className="text-3xl flex-shrink-0">{story.emoji}</span>
              <div>
                <h5 className="font-semibold text-foreground mb-1">
                  {story.title}
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
