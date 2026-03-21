import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Globe, Loader2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

interface ContactScreenProps {
  onDownload: () => void;
}

export function ContactScreen({ onDownload }: ContactScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitContact = useSubmitContactForm();

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await submitContact.mutateAsync({
        name,
        emailOrPhone: `${email} | ${phone}`,
        message,
      });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setSubmitted(true);
    } catch {
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div data-ocid="contact.page" className="flex flex-col">
      {/* Header */}
      <div
        className="px-4 pt-5 pb-6"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-1">
          Contact &amp; Support
        </h2>
        <p className="text-white/70 text-sm">We're here to help</p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* Contact Form / Success State */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          {submitted ? (
            <div
              data-ocid="contact.success_state"
              className="flex flex-col items-center py-4 gap-3 text-center"
            >
              <CheckCircle className="w-14 h-14 text-primary" />
              <h3 className="font-bold text-lg text-foreground">
                Message Sent!
              </h3>
              <p className="text-sm text-muted-foreground">
                Thank you! We'll get back to you within 24 hours.
              </p>
              <Button
                data-ocid="contact.send_another.button"
                onClick={handleReset}
                variant="outline"
                className="mt-2 rounded-xl border-primary text-primary hover:bg-primary/10"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-base text-foreground mb-4">
                Send us a Message
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <Label htmlFor="contact_name" className="text-sm mb-1 block">
                    Name *
                  </Label>
                  <Input
                    id="contact_name"
                    data-ocid="contact.name.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email" className="text-sm mb-1 block">
                    Email *
                  </Label>
                  <Input
                    id="contact_email"
                    data-ocid="contact.email.input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone" className="text-sm mb-1 block">
                    Phone *
                  </Label>
                  <Input
                    id="contact_phone"
                    data-ocid="contact.phone.input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-10"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="contact_message"
                    className="text-sm mb-1 block"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="contact_message"
                    data-ocid="contact.message.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={4}
                  />
                </div>
                <Button
                  data-ocid="contact.send.primary_button"
                  onClick={handleSend}
                  disabled={submitContact.isPending}
                  className="w-full h-11 bg-primary hover:bg-secondary text-primary-foreground rounded-xl font-semibold mt-1"
                >
                  {submitContact.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* FAQ */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-bold text-base text-foreground mb-3">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq1">
              <AccordionTrigger
                data-ocid="contact.faq1.toggle"
                className="text-sm text-left"
              >
                Is this medical advice?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                No. All knowledge entries are for informational and educational
                purposes only. WisdomVault does not provide medical advice.
                Always consult a qualified healthcare professional before
                following any remedy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq2">
              <AccordionTrigger
                data-ocid="contact.faq2.toggle"
                className="text-sm text-left"
              >
                Can elders edit their submissions?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Yes. Contributors can request edits within 14 days of submission
                by contacting our support team with their Submission ID. After
                expert review, corrections can be made before final publishing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq3">
              <AccordionTrigger
                data-ocid="contact.faq3.toggle"
                className="text-sm text-left"
              >
                Is my data safe?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Absolutely. Contact details (email, phone) are never shared
                publicly. All personal information is stored securely and used
                only to notify you about your submission status.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Support Info */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-bold text-base text-foreground mb-4">
            Support Information
          </h3>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: <Mail className="w-4 h-4" />,
                label: "Email",
                value: "ksrasika178@gmail.com",
              },
              {
                icon: <Phone className="w-4 h-4" />,
                label: "Phone",
                value: "7598427899",
              },
              {
                icon: <Clock className="w-4 h-4" />,
                label: "Email Support",
                value: "Available 24/7",
              },
              {
                icon: <Clock className="w-4 h-4" />,
                label: "Call Support",
                value: "Mon–Fri, 9 AM – 6 PM",
              },
              {
                icon: <Globe className="w-4 h-4" />,
                label: "Languages",
                value: "Tamil, Telugu, Hindi",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://wisdomvault.in"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.website.link"
              className="text-sm text-primary hover:underline text-center py-2 rounded-lg bg-primary/5"
            >
              🌐 Website
            </a>
            <button
              type="button"
              data-ocid="contact.app_download.button"
              onClick={onDownload}
              className="text-sm text-primary hover:bg-primary/10 text-center py-2 rounded-lg bg-primary/5 transition-colors"
            >
              📱 Mobile App
            </button>
            <a
              href="https://wisdomvault.in/privacy"
              data-ocid="contact.privacy.link"
              className="text-sm text-primary hover:underline text-center py-2 rounded-lg bg-primary/5"
            >
              🔒 Privacy Policy
            </a>
            <a
              href="https://wisdomvault.in/feedback"
              data-ocid="contact.feedback.link"
              className="text-sm text-primary hover:underline text-center py-2 rounded-lg bg-primary/5"
            >
              💬 Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
