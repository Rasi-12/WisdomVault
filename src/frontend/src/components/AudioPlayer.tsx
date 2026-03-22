import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  title: string;
  durationSeconds: number;
  variant?: "large" | "compact";
  onPlayStateChange?: (playing: boolean) => void;
  speechText?: string;
  speechLang?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function AudioPlayer({
  title,
  durationSeconds,
  variant = "compact",
  onPlayStateChange,
  speechText,
  speechLang = "en-IN",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // When speechText is provided, estimate duration from text length (min 5s)
  const effectiveDuration = speechText
    ? Math.max(5, Math.ceil((speechText.length * 80) / 1000))
    : durationSeconds;

  const currentSeconds = Math.floor((progress / 100) * effectiveDuration);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            onPlayStateChange?.(false);
            return 0;
          }
          return prev + 100 / (effectiveDuration * 10);
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, effectiveDuration, onPlayStateChange]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isPlaying;

    window.speechSynthesis.cancel();

    if (next && speechText) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = speechLang;
      utterance.rate = 0.7;
      utterance.pitch = 0.8;
      utterance.volume = 1;
      utterance.onend = () => {
        setIsPlaying(false);
        onPlayStateChange?.(false);
        setProgress(0);
      };
      window.speechSynthesis.speak(utterance);
    }

    setIsPlaying(next);
    onPlayStateChange?.(next);
  };

  if (variant === "large") {
    return (
      <div className="flex flex-col items-center gap-6">
        <button
          type="button"
          data-ocid="audio.toggle"
          onClick={handleToggle}
          className="w-24 h-24 rounded-full flex items-center justify-center shadow-glow transition-transform active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.445 0.118 143), oklch(0.377 0.12 143))",
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-10 h-10 text-primary-foreground" />
          ) : (
            <Play className="w-10 h-10 text-primary-foreground ml-1" />
          )}
        </button>

        <div className="w-full">
          <div className="text-center text-sm font-medium text-muted-foreground mb-3">
            {title}
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentSeconds)}</span>
            <span>{formatTime(effectiveDuration)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        data-ocid="audio.toggle"
        onClick={handleToggle}
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs transition-transform active:scale-95"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.445 0.118 143), oklch(0.377 0.12 143))",
        }}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span className="truncate">{title}</span>
          <span className="ml-2 flex-shrink-0">
            {formatTime(currentSeconds)} / {formatTime(effectiveDuration)}
          </span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
