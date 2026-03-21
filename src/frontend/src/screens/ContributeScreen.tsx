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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ConfirmationData } from "../App";
import { AudioPlayer } from "../components/AudioPlayer";
import { useSubmitContribution } from "../hooks/useQueries";

interface ContributeScreenProps {
  onConfirmation: (data: ConfirmationData) => void;
}

const SAMPLE_TRANSCRIPTION =
  "மஞ்சள் பால் தயாரிக்க ஒரு டீஸ்பூன் மஞ்சள் பொடியை ஒரு கப் சூடான பாலில் சேர்த்து இரவில் குடிக்க வேண்டும். இதனால் நோய் எதிர்ப்பு சக்தி அதிகரிக்கும்.";

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
        {/* Audio Preview */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
            Audio Preview
          </h3>
          <AudioPlayer
            title="Your Recording"
            durationSeconds={72}
            variant="large"
          />
          <div className="mt-4 flex gap-4 text-center">
            <div className="flex-1 bg-muted/50 rounded-xl p-2">
              <div className="text-sm font-bold text-primary">1:12</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div className="flex-1 bg-muted/50 rounded-xl p-2">
              <div className="text-sm font-bold text-primary">Good</div>
              <div className="text-xs text-muted-foreground">Quality</div>
            </div>
            <div className="flex-1 bg-muted/50 rounded-xl p-2">
              <div className="text-sm font-bold text-primary">Clear</div>
              <div className="text-xs text-muted-foreground">Voice</div>
            </div>
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
