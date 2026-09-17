import React from "react";
import type { ScreenId } from "@/components/Wf";
import { OverviewScreen } from "@/screens/OverviewScreen";
import { WelcomeScreen, LoginScreen, OtpScreen } from "@/screens/AuthScreens";
import { DashboardScreen, VehicleScreen } from "@/screens/DashboardScreens";
import { PassScreen, StationsScreen } from "@/screens/PassScreens";
import { HistoryScreen, NotificationsScreen, ProfileScreen, HelpScreen } from "@/screens/MoreScreens";

const BACK_MAP: Partial<Record<ScreenId, ScreenId>> = {
  login: "welcome",
  otp: "login",
  vehicle: "dashboard",
  notifications: "dashboard",
  profile: "dashboard",
  help: "profile",
};

function renderScreen(id: ScreenId, onNav: (id: ScreenId) => void, onBack: () => void) {
  switch (id) {
    case "welcome": return <WelcomeScreen onNav={onNav} />;
    case "login": return <LoginScreen onNav={onNav} onBack={onBack} />;
    case "otp": return <OtpScreen onNav={onNav} onBack={onBack} />;
    case "dashboard": return <DashboardScreen onNav={onNav} />;
    case "vehicle": return <VehicleScreen onNav={onNav} onBack={onBack} />;
    case "pass": return <PassScreen onNav={onNav} />;
    case "stations": return <StationsScreen onNav={onNav} />;
    case "history": return <HistoryScreen onNav={onNav} />;
    case "notifications": return <NotificationsScreen onNav={onNav} onBack={onBack} />;
    case "profile": return <ProfileScreen onNav={onNav} onBack={onBack} />;
    case "help": return <HelpScreen onNav={onNav} onBack={onBack} />;
    default: return <WelcomeScreen onNav={onNav} />;
  }
}

export default function App() {
  const [screen, setScreen] = React.useState<ScreenId | null>(null);
  const [mode, setMode] = React.useState<"mobile" | "desktop">("mobile");

  const go = (id: ScreenId) => setScreen(id);
  const back = () => {
    if (screen) {
      const prev = BACK_MAP[screen];
      if (prev) setScreen(prev);
      else setScreen(null);
    } else {
      setScreen(null);
    }
  };

  if (!screen) {
    return (
      <OverviewScreen
        current={null}
        onSelect={go}
        mode={mode}
        setMode={setMode}
      />
    );
  }

  const content = renderScreen(screen, go, back);

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Top bar with back-to-overview */}
      <div className="bg-white border-b-2 border-gray-300 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900"
            onClick={() => setScreen(null)}
          >
            <span className="wf-cap">‹</span> All Screens
          </button>
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 border border-gray-300">
            <button
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${mode === "mobile" ? "bg-gray-700 text-white" : "text-gray-500"}`}
              onClick={() => setMode("mobile")}
            >Mobile</button>
            <button
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${mode === "desktop" ? "bg-gray-700 text-white" : "text-gray-500"}`}
              onClick={() => setMode("desktop")}
            >Desktop</button>
          </div>
        </div>
      </div>

      {/* Device frame */}
      <div className="flex flex-col items-center py-8 px-4">
        {mode === "mobile" ? (
          <div className="wf-phone wf-fade" key={screen}>
            <div className="wf-notch" />
            <div className="wf-phone-screen">
              {content}
            </div>
          </div>
        ) : (
          <div className="wf-desktop wf-fade" key={screen}>
            <div className="wf-desktop-bar"><span /><span /><span /></div>
            <div className="flex h-[calc(100%-30px)]">
              {/* Sidebar */}
              <div className="w-56 border-r border-gray-300 bg-gray-50 flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 wf-block-solid flex items-center justify-center text-white text-xs font-bold">FP</div>
                    <span className="text-sm font-bold text-gray-700">Fuel Pass</span>
                  </div>
                </div>
                <nav className="flex-1 py-2">
                  {[
                    { id: "dashboard" as ScreenId, label: "Dashboard" },
                    { id: "pass" as ScreenId, label: "Fuel Pass / QR" },
                    { id: "vehicle" as ScreenId, label: "My Vehicles" },
                    { id: "stations" as ScreenId, label: "Find Stations" },
                    { id: "history" as ScreenId, label: "History" },
                    { id: "notifications" as ScreenId, label: "Notifications" },
                    { id: "profile" as ScreenId, label: "Profile & Settings" },
                    { id: "help" as ScreenId, label: "Help & Support" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={`w-full text-left px-4 py-2.5 text-sm font-semibold border-l-2 transition-colors ${screen === item.id ? "border-gray-700 bg-gray-200 text-gray-800" : "border-transparent text-gray-500 hover:bg-gray-100"}`}
                      onClick={() => go(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
              {/* Main content area — render the phone screen inside a wider container */}
              <div className="flex-1 overflow-y-auto bg-gray-100">
                {/* Desktop wraps the same screen content in a centered column */}
                <div className="max-w-2xl mx-auto" key={screen}>
                  {content}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Screen label */}
        <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
          {screen === "welcome" && "Screen 1 — Welcome / Landing"}
          {screen === "login" && "Screen 2 — Login / Registration"}
          {screen === "otp" && "Screen 2b — OTP Verification"}
          {screen === "dashboard" && "Screen 3 — Main Dashboard"}
          {screen === "vehicle" && "Screen 4 — Vehicle Management"}
          {screen === "pass" && "Screen 5 — Fuel Pass / QR"}
          {screen === "stations" && "Screen 6 — Fuel Station Finder"}
          {screen === "history" && "Screen 7 — Transaction / Fuel History"}
          {screen === "notifications" && "Screen 8 — Notifications"}
          {screen === "profile" && "Screen 9 — Profile & Settings"}
          {screen === "help" && "Screen 10 — Help / Support"}
        </p>
      </div>
    </div>
  );
}
