import { BookOpen, Home, Info, MessageCircle, Mic } from "lucide-react";
import type { Screen } from "../App";

interface BottomTabBarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const tabs: { screen: Screen; label: string; icon: React.ReactNode }[] = [
  { screen: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
  { screen: "browse", label: "Browse", icon: <BookOpen className="w-5 h-5" /> },
  {
    screen: "contribute",
    label: "Contribute",
    icon: <Mic className="w-5 h-5" />,
  },
  { screen: "about", label: "About", icon: <Info className="w-5 h-5" /> },
  {
    screen: "contact",
    label: "Contact",
    icon: <MessageCircle className="w-5 h-5" />,
  },
];

export function BottomTabBar({ activeScreen, onNavigate }: BottomTabBarProps) {
  const activeTab = [
    "home",
    "browse",
    "contribute",
    "about",
    "contact",
  ].includes(activeScreen)
    ? activeScreen
    : null;

  return (
    <nav
      data-ocid="nav.panel"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card border-t border-border flex items-stretch z-50"
      style={{ boxShadow: "0 -2px 12px rgba(27,94,32,0.10)" }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.screen;
        return (
          <button
            type="button"
            key={tab.screen}
            data-ocid={`nav.${tab.screen}.tab`}
            onClick={() => onNavigate(tab.screen)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium transition-colors ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`transition-transform ${
                isActive ? "scale-110" : "scale-100"
              }`}
            >
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
