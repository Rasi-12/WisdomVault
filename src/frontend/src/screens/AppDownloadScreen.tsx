import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Check, Download, X } from "lucide-react";

interface AppDownloadScreenProps {
  onBack: () => void;
}

const features = [
  { name: "Search knowledge entries", website: true, app: true },
  { name: "Listen to elder voices", website: true, app: true },
  { name: "Save search history", website: false, app: true },
  { name: "Offline access", website: false, app: true },
  { name: "Better audio experience", website: false, app: true },
  { name: "Personalized recommendations", website: false, app: true },
  { name: "Push notifications", website: false, app: true },
  { name: "Contribute recordings", website: true, app: true },
];

const whyUseApp = [
  {
    emoji: "💾",
    title: "Save Search History",
    desc: "Pick up where you left off",
  },
  {
    emoji: "📶",
    title: "Offline Access",
    desc: "Browse even without internet",
  },
  { emoji: "🔊", title: "Better Audio", desc: "Enhanced playback quality" },
  { emoji: "🎯", title: "Personalized", desc: "Recommendations just for you" },
];

export function AppDownloadScreen({ onBack }: AppDownloadScreenProps) {
  return (
    <div data-ocid="app_download.page" className="flex flex-col">
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
          data-ocid="app_download.back.button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <h2 className="text-2xl font-bold text-white mb-1">
          WisdomVault Mobile App
        </h2>
        <p className="text-white/70 text-sm">
          The best way to explore ancestral knowledge
        </p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* Why Use App */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-bold text-base text-foreground mb-4">
            Why Use the App?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {whyUseApp.map((item) => (
              <div
                key={item.title}
                data-ocid={`app_download.${item.title.toLowerCase().replace(/\s+/g, "_")}.card`}
                className="bg-primary/5 rounded-xl p-3 border border-primary/10"
              >
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="font-semibold text-sm text-foreground">
                  {item.title}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <h3 className="font-bold text-base text-foreground">
              Website vs App
            </h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Feature</TableHead>
                <TableHead className="text-xs text-center">Website</TableHead>
                <TableHead className="text-xs text-center">App</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, i) => (
                <TableRow
                  key={feature.name}
                  data-ocid={`app_download.comparison.row.${i + 1}`}
                >
                  <TableCell className="text-xs font-medium">
                    {feature.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.website ? (
                      <Check className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-destructive mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.app ? (
                      <Check className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-destructive mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Download */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-bold text-base text-foreground mb-4">
            Download Now
          </h3>
          <Button
            data-ocid="app_download.android.primary_button"
            className="w-full h-12 bg-primary hover:bg-secondary text-primary-foreground rounded-xl font-semibold text-base"
          >
            <Download className="w-5 h-5 mr-2" />
            Download for Android
          </Button>

          {/* QR Code Placeholder */}
          <div className="mt-4 flex flex-col items-center">
            <div
              className="w-32 h-32 rounded-xl border-2 border-border flex items-center justify-center bg-muted/50"
              data-ocid="app_download.qr.canvas_target"
            >
              <div className="text-center">
                <div className="text-3xl mb-1">📱</div>
                <div className="text-xs text-muted-foreground">QR Code</div>
                <div className="text-xs text-muted-foreground">Coming Soon</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Scan to download
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-800 leading-relaxed">
            🔒 <strong>Your data is secure.</strong> Contact details are never
            shared publicly. All data is encrypted and stored on decentralized
            infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}
