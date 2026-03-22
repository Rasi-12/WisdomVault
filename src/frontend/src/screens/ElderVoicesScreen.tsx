import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { AudioPlayer } from "../components/AudioPlayer";

interface ElderVoicesScreenProps {
  onBack: () => void;
}

const FEATURED_SPEECH_TEXT =
  "For cold and cough, boil ginger with honey. Mix ginger and honey in warm water and drink it. This will reduce throat pain and cure the cough.";

const MORE_RECORDINGS = [
  {
    title: "Turmeric Milk for Immunity",
    duration: 95,
    region: "Tamil Nadu",
    speechText:
      "Boil turmeric in warm milk and drink it before sleeping. This builds immunity, fights infections, and keeps the body strong during seasonal changes.",
  },
  {
    title: "Neem Leaf Pest Repellent",
    duration: 108,
    region: "Tamil Nadu",
    speechText:
      "Crush neem leaves and mix with water. Spray this around crops and plants to keep pests away naturally without any harmful chemicals.",
  },
  {
    title: "Rain-Reading Wisdom",
    duration: 134,
    region: "Tamil Nadu",
    speechText:
      "When the eastern wind blows and ants carry eggs to higher ground, rain is coming within two days. This is how our elders predicted the monsoon.",
  },
];

export function ElderVoicesScreen({ onBack }: ElderVoicesScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div data-ocid="elder_voices.page" className="flex flex-col">
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
          data-ocid="elder_voices.back.button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <h2 className="text-2xl font-bold text-white mb-1">
          Authentic Elder Voices
        </h2>
        <p className="text-white/70 text-sm">
          Hear original recordings from village elders
        </p>
      </div>

      <div className="px-4 py-6">
        {/* Featured Recording */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-4">
          <div className="text-center mb-6">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              🎧 Featured Recording
            </span>
            <h3 className="text-xl font-bold text-foreground mt-3 mb-1">
              Cold &amp; Cough Remedy
            </h3>
            <p className="text-sm text-muted-foreground">
              1 min 12 sec · Tamil Nadu
            </p>
          </div>

          <AudioPlayer
            title="Cold & Cough Remedy"
            durationSeconds={72}
            variant="large"
            onPlayStateChange={setIsPlaying}
            speechText={FEATURED_SPEECH_TEXT}
            speechLang="en-IN"
          />
        </div>

        {/* Subtitle Box */}
        <div
          className={`bg-primary/5 rounded-2xl p-5 border border-primary/20 transition-opacity duration-500 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            English Translation
          </h4>
          <p className="text-lg text-foreground leading-loose">
            For cold and cough, boil ginger with honey. Mix ginger and honey in
            warm water and drink it. This will reduce throat pain and cure the
            cough.
          </p>
        </div>

        {isPlaying && (
          <p className="text-center text-xs text-muted-foreground mt-3 animate-fade-in">
            🎙️ AI voice is speaking
          </p>
        )}

        {/* Other Recordings */}
        <h4 className="font-semibold text-foreground mt-6 mb-3">
          More Recordings
        </h4>
        <div className="flex flex-col gap-3">
          {MORE_RECORDINGS.map((item, i) => (
            <div
              key={item.title}
              data-ocid={`elder_voices.item.${i + 1}`}
              className="bg-card rounded-xl p-4 shadow-card border border-border"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.region}</p>
                </div>
              </div>
              <AudioPlayer
                title={item.title}
                durationSeconds={item.duration}
                variant="compact"
                speechText={item.speechText}
                speechLang="en-IN"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
