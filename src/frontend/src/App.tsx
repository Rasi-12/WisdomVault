import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import type { KnowledgeEntry } from "./backend";
import { BottomTabBar } from "./components/BottomTabBar";
import { AboutScreen } from "./screens/AboutScreen";
import { AdminScreen } from "./screens/AdminScreen";
import { AppDownloadScreen } from "./screens/AppDownloadScreen";
import { BrowseScreen } from "./screens/BrowseScreen";
import { ConfirmationScreen } from "./screens/ConfirmationScreen";
import { ContactScreen } from "./screens/ContactScreen";
import { ContributeScreen } from "./screens/ContributeScreen";
import { CulturalConnectionsScreen } from "./screens/CulturalConnectionsScreen";
import { ElderVoicesScreen } from "./screens/ElderVoicesScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { KnowledgeDetailScreen } from "./screens/KnowledgeDetailScreen";

export type Screen =
  | "home"
  | "browse"
  | "detail"
  | "elderVoices"
  | "cultural"
  | "contribute"
  | "confirmation"
  | "about"
  | "contact"
  | "appDownload";

export interface ConfirmationData {
  submissionId: string;
  submittedAt: string;
  category: string;
  language: string;
  region: string;
}

function MainApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [previousScreen, setPreviousScreen] = useState<Screen>("home");
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(
    null,
  );
  const [confirmationData, setConfirmationData] =
    useState<ConfirmationData | null>(null);

  const navigate = (to: Screen) => {
    setPreviousScreen(screen);
    setScreen(to);
  };

  const goBack = () => {
    setScreen(previousScreen);
  };

  const openDetail = (entry: KnowledgeEntry) => {
    setSelectedEntry(entry);
    navigate("detail");
  };

  const handleConfirmation = (data: ConfirmationData) => {
    setConfirmationData(data);
    navigate("confirmation");
  };

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen onNavigate={navigate} />;
      case "browse":
        return <BrowseScreen onNavigate={navigate} onOpenDetail={openDetail} />;
      case "detail":
        return selectedEntry ? (
          <KnowledgeDetailScreen entry={selectedEntry} onBack={goBack} />
        ) : (
          <BrowseScreen onNavigate={navigate} onOpenDetail={openDetail} />
        );
      case "elderVoices":
        return <ElderVoicesScreen onBack={() => navigate("home")} />;
      case "cultural":
        return <CulturalConnectionsScreen onBack={() => navigate("home")} />;
      case "contribute":
        return <ContributeScreen onConfirmation={handleConfirmation} />;
      case "confirmation":
        return confirmationData ? (
          <ConfirmationScreen
            data={confirmationData}
            onReturnHome={() => navigate("home")}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );
      case "about":
        return <AboutScreen />;
      case "contact":
        return <ContactScreen onDownload={() => navigate("appDownload")} />;
      case "appDownload":
        return <AppDownloadScreen onBack={goBack} />;
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-[480px] mx-auto relative min-h-screen flex flex-col bg-background shadow-card">
        {/* Top Navigation */}
        <header
          data-ocid="nav.top.panel"
          className="flex items-center gap-1 px-2 py-2 bg-card border-b border-border overflow-x-auto scrollbar-hide"
        >
          {/* Logo */}
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => navigate("home")}
            className="flex-shrink-0 mr-1"
            aria-label="WisdomVault Home"
          >
            <img
              src="/assets/uploads/logo-1.jpeg"
              alt="WisdomVault"
              className="h-10 w-auto object-contain rounded-lg"
            />
          </button>
          <button
            type="button"
            data-ocid="nav.browse.link"
            onClick={() => navigate("browse")}
            className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground text-foreground"
          >
            Browse Knowledge
          </button>
          <button
            type="button"
            data-ocid="nav.contribute.link"
            onClick={() => navigate("contribute")}
            className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground text-foreground"
          >
            Contribute
          </button>
          <button
            type="button"
            data-ocid="nav.about.link"
            onClick={() => navigate("about")}
            className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground text-foreground"
          >
            About
          </button>
          <button
            type="button"
            data-ocid="nav.contact.link"
            onClick={() => navigate("contact")}
            className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground text-foreground"
          >
            Contact Us
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 animate-fade-in">
          {renderScreen()}
        </main>

        <BottomTabBar activeScreen={screen} onNavigate={navigate} />
      </div>
      <Toaster />
    </div>
  );
}

export default function App() {
  if (window.location.pathname === "/admin") {
    return <AdminScreen />;
  }
  return <MainApp />;
}
