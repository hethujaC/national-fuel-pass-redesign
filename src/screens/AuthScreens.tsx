import React from "react";
import { StatusBar, Section, KV, Bell, ChevronRight, HelpCircle, Fuel } from "@/components/Wf";
import type { ScreenId } from "@/components/Wf";

export function WelcomeScreen({ onNav }: { onNav: (id: ScreenId) => void }) {
  return (
    <>
      <StatusBar />
      <div className="wf-screen-content pt-6 flex flex-col" style={{ minHeight: "calc(100% - 32px)" }}>
        {/* Logo placeholder */}
        <div className="flex flex-col items-center text-center pt-6">
          <div className="w-20 h-20 wf-block-solid flex items-center justify-center mb-3">
            <Fuel size={36} />
          </div>
          <div className="wf-label">Government of Sri Lanka</div>
          <h1 className="wf-h1 mt-2 text-xl">National Fuel Pass</h1>
          <p className="wf-body text-gray-500 mt-2 max-w-[260px]">
            Manage your fuel allocation, find stations, and refuel with ease.
          </p>
        </div>

        {/* Hero illustration placeholder */}
        <div className="wf-stripe mt-6 h-32 flex items-center justify-center">
          <span className="wf-cap bg-white/70 px-2 rounded">Service illustration</span>
        </div>

        {/* Language selector */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="wf-chip" data-on="true">English</span>
          <span className="wf-chip">සිංහල</span>
          <span className="wf-chip">தமிழ்</span>
        </div>

        {/* Primary actions */}
        <div className="mt-6 space-y-3">
          <button className="wf-btn wf-btn-primary w-full h-12" onClick={() => onNav("login")}>
            Sign In
          </button>
          <button className="wf-btn wf-btn-secondary w-full h-12" onClick={() => onNav("login")}>
            Register New Account
          </button>
        </div>

        {/* Secondary link */}
        <div className="flex-1" />
        <div className="flex items-center justify-center gap-4 py-4">
          <button className="wf-btn wf-btn-ghost text-xs gap-1.5" onClick={() => onNav("help")}>
            <HelpCircle size={15} /> Help &amp; Support
          </button>
        </div>

        <p className="text-center wf-cap pb-2">Version 2.0 · Redesigned Concept</p>
      </div>
    </>
  );
}

export function LoginScreen({ onNav, onBack }: { onNav: (id: ScreenId) => void; onBack: () => void }) {
  return (
    <>
      <StatusBar />
      <div className="wf-screen-content pt-4">
        <button className="wf-cap mb-2" onClick={onBack}>‹ Back</button>
        <h1 className="wf-h1">Sign In</h1>
        <p className="wf-cap mt-1">Enter your registered mobile number to receive a one-time password.</p>

        <Section label="Identifier" >
          <div className="space-y-3">
            <div>
              <label className="wf-label">Mobile Number</label>
              <div className="flex items-center gap-2 mt-1">
                <div className="wf-input flex items-center w-[70px] flex-shrink-0 justify-center text-gray-500">+94</div>
                <input className="wf-input" inputMode="numeric" placeholder="71 234 5678" defaultValue="71 234 5678" />
              </div>
              <p className="wf-cap mt-1">We'll send a 4-digit code via SMS</p>
            </div>
          </div>
        </Section>

        <Section label="Validation Example">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 wf-block-solid flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[10px]">!</div>
            <p className="wf-body text-sm">Error state: "Please enter a valid 9-digit Sri Lankan mobile number."</p>
          </div>
        </Section>

        <button className="wf-btn wf-btn-primary w-full h-12 mt-4" onClick={() => onNav("otp")}>
          Send OTP
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="wf-cap">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button className="wf-btn wf-btn-secondary w-full h-12" onClick={() => onNav("otp")}>
          Use NIC Number Instead
        </button>

        <p className="text-center wf-cap mt-4">
          Don't have an account? <span className="font-semibold text-gray-700 underline">Register here</span>
        </p>
      </div>
    </>
  );
}

export function OtpScreen({ onNav, onBack }: { onNav: (id: ScreenId) => void; onBack: () => void }) {
  const [vals, setVals] = React.useState(["4", "8", "2", ""]);
  return (
    <>
      <StatusBar />
      <div className="wf-screen-content pt-4">
        <button className="wf-cap mb-2" onClick={onBack}>‹ Back</button>
        <h1 className="wf-h1">Verify OTP</h1>
        <p className="wf-cap mt-1">Enter the 4-digit code sent to <b>+94 71 234 5678</b></p>

        <Section label="OTP Entry">
          <div className="flex justify-center gap-3 py-3">
            {vals.map((v, i) => (
              <div
                key={i}
                className={`w-14 h-16 flex items-center justify-center text-2xl font-bold border-2 rounded-xl ${v ? "border-gray-700 bg-gray-50" : "border-gray-300 bg-gray-50 border-dashed"}`}
                style={i === 3 && !v ? { borderColor: "#9ca3af" } : {}}
              >
                {v}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="wf-cap">Resend code in <b>00:28</b></p>
            <button className="wf-cap font-semibold text-gray-500">Resend</button>
          </div>
        </Section>

        <Section label="Success State">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center text-white text-[10px]">✓</div>
            <p className="wf-body text-sm">Code verified — redirecting to your dashboard…</p>
          </div>
        </Section>

        <Section label="Error State">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 wf-block-solid flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[10px]">!</div>
            <div>
              <p className="wf-body text-sm font-semibold">Incorrect code</p>
              <p className="wf-cap">Please check and try again. 2 attempts remaining.</p>
            </div>
          </div>
        </Section>

        <button className="wf-btn wf-btn-primary w-full h-12 mt-4" onClick={() => onNav("dashboard")}>
          Verify &amp; Continue
        </button>
      </div>
    </>
  );
}
