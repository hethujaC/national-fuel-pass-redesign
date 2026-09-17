import React from "react";
import type { ScreenId } from "@/components/Wf";
import { NAV_TABS } from "@/components/Wf";
import { Home, QrCode, MapPin, Clock, User, ArrowRight, Fuel, Smartphone, Monitor, Layers, type LucideIcon } from "lucide-react";

const SCREENS: { id: ScreenId; label: string; desc: string; group: string }[] = [
  { id: "welcome", label: "Welcome / Landing", desc: "Service intro, sign in, register, help", group: "Onboarding" },
  { id: "login", label: "Login", desc: "Mobile number entry, validation", group: "Onboarding" },
  { id: "otp", label: "OTP Verification", desc: "4-digit code, success & error states", group: "Onboarding" },
  { id: "dashboard", label: "Main Dashboard", desc: "Quota, vehicle, quick actions, alerts", group: "Core" },
  { id: "pass", label: "Fuel Pass / QR", desc: "QR code, validity, instructions", group: "Core" },
  { id: "vehicle", label: "Vehicle Management", desc: "Vehicle details, add/update, verify", group: "Core" },
  { id: "stations", label: "Station Finder", desc: "Search, map, availability, filters", group: "Services" },
  { id: "history", label: "Transaction History", desc: "Past refills, summary, export", group: "Services" },
  { id: "notifications", label: "Notifications", desc: "Alerts, reminders, announcements", group: "Services" },
  { id: "profile", label: "Profile & Settings", desc: "User info, preferences, logout", group: "Account" },
  { id: "help", label: "Help & Support", desc: "FAQs, contact, report issue", group: "Account" },
];

const FLOW: ScreenId[] = ["welcome", "login", "otp", "dashboard", "pass", "stations", "history"];

const SCREEN_ICON: Record<ScreenId, LucideIcon> = {
  welcome: Home, login: User, otp: User, dashboard: Home, pass: QrCode,
  vehicle: Fuel, stations: MapPin, history: Clock, notifications: User, profile: User, help: User,
};

export function OverviewScreen({
  current, onSelect, mode, setMode,
}: {
  current: ScreenId | null;
  onSelect: (id: ScreenId) => void;
  mode: "mobile" | "desktop";
  setMode: (m: "mobile" | "desktop") => void;
}) {
  const groups = ["Onboarding", "Core", "Services", "Account"];

  return (
    <div className="min-h-screen bg-gray-200 pb-16">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-300 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 wf-block-solid flex items-center justify-center text-white">
                <Fuel size={22} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">National Fuel Pass — Wireframe</h1>
                <p className="text-xs text-gray-500">Redesigned concept · Low-fidelity prototype · Sri Lanka</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 border border-gray-300">
              <button
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === "mobile" ? "bg-gray-700 text-white" : "text-gray-500"}`}
                onClick={() => setMode("mobile")}
              >
                <Smartphone size={14} /> Mobile
              </button>
              <button
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === "desktop" ? "bg-gray-700 text-white" : "text-gray-500"}`}
                onClick={() => setMode("desktop")}
              >
                <Monitor size={14} /> Desktop
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Intro */}
        <div className="wf-box p-6 mb-6">
          <div className="flex items-start gap-3">
            <Layers size={24} className="flex-shrink-0 mt-1 text-gray-500" />
            <div>
              <h2 className="text-base font-bold text-gray-800">Low-Fidelity Wireframe Overview</h2>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                This prototype shows a redesigned National Fuel Pass experience focused on reducing confusion, wait times, and unnecessary steps.
                All screens use grayscale blocks, labels, and placeholders to communicate layout and information hierarchy — not final visual design.
                Tap any screen below to view it in the device frame, or follow the user flow from left to right.
              </p>
            </div>
          </div>
        </div>

        {/* User flow */}
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="wf-label" style={{ textTransform: "none" }}>Primary User Flow</span>
        </h3>
        <div className="wf-box p-4 mb-8">
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {FLOW.map((id, i) => {
              const s = SCREENS.find((x) => x.id === id)!;
              const Icon = SCREEN_ICON[id];
              return (
                <React.Fragment key={id}>
                  <button
                    className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl border-2 transition-all flex-shrink-0 ${current === id ? "border-gray-700 bg-gray-100" : "border-gray-300 bg-white hover:border-gray-400"}`}
                    onClick={() => onSelect(id)}
                  >
                    <div className="w-8 h-8 wf-block flex items-center justify-center"><Icon size={16} /></div>
                    <span className="text-[10px] font-semibold text-gray-600 whitespace-nowrap">{s.label}</span>
                  </button>
                  {i < FLOW.length - 1 && <ArrowRight size={16} className="flex-shrink-0 text-gray-400" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* All screens by group */}
        {groups.map((g) => (
          <div key={g} className="mb-8">
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-gray-400 rounded-sm" />
              {g}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {SCREENS.filter((s) => s.group === g).map((s) => {
                const Icon = SCREEN_ICON[s.id];
                return (
                  <button
                    key={s.id}
                    className={`wf-box p-3 text-left transition-all hover:shadow-md active:scale-95 ${current === s.id ? "ring-2 ring-gray-700" : ""}`}
                    onClick={() => onSelect(s.id)}
                  >
                    <div className="w-9 h-9 wf-block flex items-center justify-center mb-2"><Icon size={18} /></div>
                    <p className="text-sm font-bold text-gray-700">{s.label}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Bottom nav legend */}
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-gray-400 rounded-sm" />
          Mobile Bottom Navigation
        </h3>
        <div className="wf-box p-4">
          <div className="flex justify-around items-center">
            {NAV_TABS.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.id} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 wf-block flex items-center justify-center"><Icon size={20} /></div>
                  <span className="text-[10px] font-bold text-gray-600">{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Design principles */}
        <h3 className="text-sm font-bold text-gray-700 mb-3 mt-8 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-gray-400 rounded-sm" />
          UX Design Principles Applied
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { t: "Most important info first", d: "Fuel quota and remaining allocation visible immediately on dashboard" },
            { t: "Minimized steps", d: "QR pass accessible in one tap from bottom nav or dashboard" },
            { t: "Plain language", d: "Simple terminology suitable for all literacy levels, trilingual support" },
            { t: "Clear feedback", d: "Success and error states shown for OTP, validation, and transactions" },
            { t: "Error prevention", d: "Input validation, confirmation prompts, status badges" },
            { t: "Accessibility", d: "Large tap targets, high contrast, readable text, clear hierarchy" },
            { t: "No information overload", d: "Progressive disclosure — secondary actions behind taps and sections" },
            { t: "Elderly-friendly", d: "Large fonts, simple navigation, clear instructions on QR screen" },
          ].map((p, i) => (
            <div key={i} className="wf-box p-3 flex items-start gap-2">
              <span className="w-5 h-5 wf-block-solid flex items-center justify-center text-white text-[10px] font-bold rounded flex-shrink-0">✓</span>
              <div>
                <p className="text-sm font-bold text-gray-700">{p.t}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
