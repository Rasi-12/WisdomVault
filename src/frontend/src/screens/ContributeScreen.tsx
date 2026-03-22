import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mic, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { ConfirmationData } from "../App";
import { useSubmitContribution } from "../hooks/useQueries";

interface ContributeScreenProps {
  onConfirmation: (data: ConfirmationData) => void;
}

const SAMPLE_TRANSCRIPTION =
  "மஞ்சள் பால் தயாரிக்க ஒரு டீஸ்பூன் மஞ்சள் பொடியை ஒரு கப் சூடான பாலில் சேர்த்து இரவில் குடிக்க வேண்டும். இதனால் நோய் எதிர்ப்பு சக்தி அதிகரிக்கும்.";

type RecordingState = "idle" | "recording" | "complete";

export function ContributeScreen({ onConfirmation }: ContributeScreenProps) {
  const [verification, setVerification] = useState<
    "correct" | "minor_edits" | "re_record"
  >("correct");
  const [transcription, setTranscription] = useState(SAMPLE_TRANSCRIPTION);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");

  // Voice recording state
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioBlobUrl) URL.revokeObjectURL(audioBlobUrl);
      if (streamRef.current) {
        for (const track of streamRef.current.getTracks()) track.stop();
      }
    };
  }, [audioBlobUrl]);

  const handleMicClick = async () => {
    if (recordingState === "idle" || recordingState === "complete") {
      // Start recording
      try {
        if (audioBlobUrl) {
          URL.revokeObjectURL(audioBlobUrl);
          setAudioBlobUrl(null);
        }
        chunksRef.current = [];

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setAudioBlobUrl(url);
          setRecordingState("complete");
          // Stop all tracks
          if (streamRef.current) {
            for (const track of streamRef.current.getTracks()) track.stop();
          }
        };

        mediaRecorder.start();
        setRecordingState("recording");
      } catch {
        toast.error(
          "Microphone access denied. Please allow microphone permission and try again.",
        );
      }
    } else if (recordingState === "recording") {
      // Stop recording
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    }
  };

  const handlePlayback = () => {
    if (!audioBlobUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(audioBlobUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const submitMutation = useSubmitContribution();

  const handleSubmit = async () => {
    if (
      !name.trim() ||
      !age.trim() ||
      !region.trim() ||
      !language ||
      !emailOrPhone.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const ageNum = Number(age);
    if (Number.isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
      toast.error("Please enter a valid age");
      return;
    }

    try {
      const submissionId = await submitMutation.mutateAsync({
        contributorName: name,
        age: BigInt(ageNum),
        region,
        language,
        transcription,
        category: "Traditional Medicine",
        recordingType: "Audio + Transcription",
      });
      onConfirmation({
        submissionId,
        submittedAt: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
        category: "Traditional Medicine",
        language,
        region,
      });
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  const statusText =
    recordingState === "idle"
      ? "Tap to Record"
      : recordingState === "recording"
        ? "Recording..."
        : "Recording Complete";

  return (
    <div data-ocid="contribute.page" className="flex flex-col">
      {/* Header */}
      <div
        className="px-4 pt-5 pb-6"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">
          Preview &amp; Verification
        </h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Review your recording and confirm accuracy before submission
        </p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* Voice Recording */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
            Voice Recording
          </h3>
          <div className="flex flex-col items-center gap-3 py-2">
            {/* Mic button */}
            <button
              data-ocid="contribute.mic.button"
              type="button"
              onClick={handleMicClick}
              className={[
                "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300",
                recordingState === "recording"
                  ? "bg-red-500 shadow-lg shadow-red-300 animate-pulse"
                  : "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-red-200",
              ].join(" ")}
              aria-label={
                recordingState === "recording"
                  ? "Stop recording"
                  : "Start recording"
              }
            >
              {recordingState === "recording" ? (
                <Square className="w-8 h-8 text-white fill-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>

            {/* Status text */}
            <p
              data-ocid="contribute.recording.loading_state"
              className={[
                "text-sm font-medium text-center mt-1",
                recordingState === "recording"
                  ? "text-red-500"
                  : recordingState === "complete"
                    ? "text-green-600"
                    : "text-muted-foreground",
              ].join(" ")}
            >
              {statusText}
            </p>

            {/* Playback button */}
            {recordingState === "complete" && audioBlobUrl && (
              <button
                data-ocid="contribute.playback.button"
                type="button"
                onClick={handlePlayback}
                className="w-12 h-12 rounded-full bg-primary hover:bg-secondary flex items-center justify-center shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300 mt-1"
                aria-label={isPlaying ? "Stop playback" : "Play recording"}
              >
                {isPlaying ? (
                  <Square className="w-5 h-5 text-white fill-white" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                )}
              </button>
            )}
            {recordingState === "complete" && (
              <p className="text-xs text-muted-foreground">
                {isPlaying
                  ? "Playing your recording..."
                  : "Tap to play back your recording"}
              </p>
            )}
          </div>
        </div>

        {/* AI Transcription */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-1">
            AI Transcription
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Auto-generated — review for accuracy
          </p>
          <Textarea
            data-ocid="contribute.transcription.textarea"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            readOnly={verification !== "minor_edits"}
            rows={4}
            className={`text-sm leading-relaxed ${
              verification !== "minor_edits" ? "bg-muted/50 cursor-default" : ""
            }`}
            dir="auto"
          />
        </div>

        {/* Verification Choice */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
            Transcription Accuracy
          </h3>
          <RadioGroup
            value={verification}
            onValueChange={(v) =>
              setVerification(v as "correct" | "minor_edits" | "re_record")
            }
            className="flex flex-col gap-3"
          >
            {[
              { value: "correct", label: "✅ Correct — submit as is" },
              { value: "minor_edits", label: "✏️ Minor Edits — edit above" },
              { value: "re_record", label: "🔄 Re-record — start over" },
            ].map((opt) => (
              <div key={opt.value} className="flex items-center gap-3">
                <RadioGroupItem
                  data-ocid={`contribute.${opt.value}.radio`}
                  value={opt.value}
                  id={`ver_${opt.value}`}
                />
                <Label
                  htmlFor={`ver_${opt.value}`}
                  className="cursor-pointer text-sm"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Contributor Details */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
            Contributor Details
          </h3>
          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="contrib_name" className="text-sm mb-1 block">
                Full Name *
              </Label>
              <Input
                id="contrib_name"
                data-ocid="contribute.name.input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-10"
              />
            </div>
            <div>
              <Label htmlFor="contrib_age" className="text-sm mb-1 block">
                Age *
              </Label>
              <Input
                id="contrib_age"
                data-ocid="contribute.age.input"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Your age"
                className="h-10"
              />
            </div>
            <div>
              <Label htmlFor="contrib_region" className="text-sm mb-1 block">
                Region *
              </Label>
              <Input
                id="contrib_region"
                data-ocid="contribute.region.input"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g., Tamil Nadu"
                className="h-10"
              />
            </div>
            <div>
              <Label className="text-sm mb-1 block">Language *</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger
                  data-ocid="contribute.language.select"
                  className="h-10"
                >
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contrib_contact" className="text-sm mb-1 block">
                Email or Phone *
              </Label>
              <Input
                id="contrib_contact"
                data-ocid="contribute.contact.input"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="For updates on your submission"
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          data-ocid="contribute.submit.primary_button"
          onClick={handleSubmit}
          disabled={submitMutation.isPending}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-secondary text-primary-foreground rounded-xl"
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit for Review"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By submitting, you agree that this knowledge can be shared publicly
          for educational purposes.
        </p>
      </div>
    </div>
  );
}
