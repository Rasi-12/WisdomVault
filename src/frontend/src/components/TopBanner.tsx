import { X } from "lucide-react";

interface TopBannerProps {
  onDismiss: () => void;
  onDownload: () => void;
}

export function TopBanner({ onDismiss, onDownload }: TopBannerProps) {
  return (
    <div
      data-ocid="banner.panel"
      className="flex items-center justify-between gap-2 px-3 py-2 text-xs text-primary-foreground"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
      }}
    >
      <span className="flex-1 leading-tight">
        📱 History is not stored on this website. Use our mobile app for a
        smoother experience.
      </span>
      <button
        type="button"
        data-ocid="banner.download_button"
        onClick={onDownload}
        className="flex-shrink-0 bg-white/20 hover:bg-white/30 rounded px-2 py-0.5 font-medium transition-colors whitespace-nowrap"
      >
        Download App
      </button>
      <button
        type="button"
        data-ocid="banner.close_button"
        onClick={onDismiss}
        aria-label="Dismiss banner"
        className="flex-shrink-0 p-0.5 hover:bg-white/20 rounded transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
