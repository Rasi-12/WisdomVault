export function AboutScreen() {
  return (
    <div data-ocid="about.page" className="flex flex-col">
      <div
        className="px-6 pt-8 pb-10 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
        }}
      >
        <div className="flex justify-center mb-3">
          <img
            src="/assets/uploads/logo-1.jpeg"
            alt="WisdomVault Logo"
            className="h-16 w-auto object-contain rounded-xl"
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          About WisdomVault
        </h2>
        <p className="text-white/80 text-sm leading-relaxed">
          Preserving ancestral knowledge using AI &amp; community trust
        </p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4">
        {[
          {
            icon: "🎯",
            title: "Our Mission",
            body: "WisdomVault exists to capture, preserve, and make accessible the rich oral traditions and practical knowledge held by village elders across India. We believe traditional knowledge is a living heritage that must not be lost.",
          },
          {
            icon: "⚙️",
            title: "How It Works",
            body: "Elders record their knowledge in their native language. Our AI transcribes and indexes the recordings. Human experts verify accuracy before publishing. Community members can search and explore this living library of wisdom.",
          },
          {
            icon: "🧬",
            title: "Technology Stack",
            body: "Powered by Whisper AI for speech-to-text transcription, Google Gemini for intelligent search, MongoDB for knowledge storage, and Internet Computer Protocol for decentralized, censorship-resistant hosting.",
          },
        ].map((card) => (
          <div
            key={card.title}
            data-ocid={`about.${card.title.toLowerCase().replace(/\s+/g, "_")}.card`}
            className="bg-card rounded-2xl p-5 shadow-card border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{card.icon}</span>
              <h3 className="font-bold text-base text-foreground">
                {card.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}

        <div
          className="rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.377 0.12 143), oklch(0.445 0.118 143))",
          }}
        >
          <h3 className="font-bold text-white text-center mb-4">Our Impact</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "100+", label: "Elders Engaged" },
              { value: "3+", label: "Languages Supported" },
              { value: "AI + Human", label: "Ethical Verification" },
            ].map((stat) => (
              <div
                key={stat.label}
                data-ocid="about.impact.card"
                className="bg-white/15 rounded-xl p-3 text-center"
              >
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/80 leading-tight mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-2">
          <p className="text-xs text-muted-foreground">
            Built with ❤️ in India, for every elder voice
          </p>
        </div>
      </div>
    </div>
  );
}
