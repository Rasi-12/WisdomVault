import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, RotateCcw, Share2 } from "lucide-react";
import type { ConfirmationData } from "../App";

interface ConfirmationScreenProps {
  data: ConfirmationData;
  onReturnHome: () => void;
}

export function ConfirmationScreen({
  data,
  onReturnHome,
}: ConfirmationScreenProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "WisdomVault Submission",
        text: `I contributed to WisdomVault! Submission ID: ${data.submissionId}`,
      });
    }
  };

  return (
    <div data-ocid="confirmation.page" className="flex flex-col">
      {/* Success Hero */}
      <div
        className="px-6 pt-10 pb-8 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
        }}
      >
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Submission Confirmed
        </h2>
        <p className="text-white/80 text-sm">
          Thank you for preserving traditional knowledge
        </p>
        <div className="mt-4 bg-white/20 rounded-xl px-4 py-2 inline-block">
          <span className="text-white/80 text-xs">Submission ID</span>
          <div className="text-white font-bold text-lg">
            {data.submissionId}
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4">
        <p className="text-xs text-center text-muted-foreground">
          Submitted on {data.submittedAt}
        </p>

        {/* What Happens Next */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <span className="text-xl">🔍</span> What Happens Next
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { step: "1", text: "Expert review & verification" },
              { step: "2", text: "Possible clarification call from our team" },
              { step: "3", text: "Approval and publishing to WisdomVault" },
              { step: "4", text: "Notification via email/SMS" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <span className="text-sm text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-accent/15 rounded-xl p-3">
            <p className="text-xs text-primary font-medium">
              ⏱️ Estimated time: 3–5 business days
            </p>
          </div>
        </div>

        {/* Submission Summary */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <span className="text-xl">📋</span> Submission Summary
          </h3>
          <div className="flex flex-col gap-2">
            {[
              { label: "Category", value: data.category },
              { label: "Language", value: data.language },
              { label: "Region", value: data.region },
              { label: "Recording Type", value: "Audio + Transcription" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            data-ocid="confirmation.track.secondary_button"
            variant="outline"
            className="w-full h-11 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Track Status
          </Button>
          <Button
            data-ocid="confirmation.share.secondary_button"
            variant="outline"
            onClick={handleShare}
            className="w-full h-11 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            data-ocid="confirmation.home.primary_button"
            onClick={onReturnHome}
            className="w-full h-11 bg-primary hover:bg-secondary text-primary-foreground rounded-xl font-semibold"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
