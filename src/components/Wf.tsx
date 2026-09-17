import React from "react";
import { Home, QrCode, MapPin, Clock, User, Bell, ChevronRight, ArrowLeft, HelpCircle, Search, Filter, Plus, Check, Fuel, Car, X, Menu, Signal, Wifi, Battery, AlertTriangle, MessageSquare, Phone, Globe, LogOut, Info, type LucideIcon } from "lucide-react";

export type ScreenId =
  | "welcome" | "login" | "otp"
  | "dashboard" | "vehicle" | "pass" | "stations" | "history" | "notifications" | "profile" | "help";

export const NAV_TABS: { id: ScreenId; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "pass", label: "Fuel Pass", icon: QrCode },
  { id: "stations", label: "Stations", icon: MapPin },
  { id: "history", label: "History", icon: Clock },
  { id: "profile", label: "Profile", icon: User },
];

export function StatusBar() {
  return (
    <div className="wf-status-bar">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Signal size={11} />
        <Wifi size={11} />
        <Battery size={13} />
      </div>
    </div>
  );
}

export function BottomNav({ active, onNav }: { active: ScreenId; onNav: (id: ScreenId) => void }) {
  return (
    <div className="wf-nav">
      {NAV_TABS.map((t) => {
        const Icon = t.icon;
        return (
          <div key={t.id} className="wf-nav-btn" data-active={active === t.id} onClick={() => onNav(t.id)}>
            <Icon size={20} />
            <span>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function TopBar({
  title, onBack, right,
}: { title: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 h-12 flex-shrink-0 bg-white border-b border-gray-300">
      <div className="flex items-center gap-2 min-w-0">
        {onBack && <ArrowLeft size={20} className="cursor-pointer flex-shrink-0" onClick={onBack} />}
        <h2 className="wf-h2 truncate">{title}</h2>
      </div>
      {right}
    </div>
  );
}

export function Section({ label, children, className = "" }: { label?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`wf-box p-4 mt-3 relative ${className}`}>
      {label && <span className="wf-section-tag">{label}</span>}
      {children}
    </div>
  );
}

export function Placeholder({ label, className = "", style }: { label?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`wf-block wf-x flex items-center justify-center ${className}`} style={style}>
      {label && <span className="relative z-10 wf-cap bg-white/70 px-2 rounded">{label}</span>}
    </div>
  );
}

export function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="wf-kv">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
    </div>
  );
}

/* Deterministic QR-like pattern */
export function QrPattern({ size = 200 }: { size?: number }) {
  const cells = 13 * 13;
  const arr: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < cells; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    arr.push(seed / 233280 > 0.5);
  }
  // force corners (finder patterns)
  const set = (r: number, c: number, on: boolean) => { arr[r * 13 + c] = on; };
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    set(r, c, true); set(r, 12 - c, true); set(12 - r, c, true);
  }
  set(1, 1, false); set(1, 11, false); set(11, 1, false);
  // borders around corners
  for (let i = 0; i < 3; i++) {
    set(0, 3 + i, false); set(3, 0 + i, false); set(3, 12 - i, false);
    set(12 - 3, 0 + i, false); set(0 + i, 12 - 3, false); set(12, 3 + i, false);
  }
  return (
    <div className="wf-qr" style={{ width: size, maxWidth: "100%", margin: "0 auto" }}>
      {arr.map((on, i) => (
        <i key={i} style={{ opacity: on ? 1 : 0 }} />
      ))}
    </div>
  );
}

export { Home, QrCode, MapPin, Clock, User, Bell, ChevronRight, ArrowLeft, HelpCircle, Search, Filter, Plus, Check, Fuel, Car, X, Menu, AlertTriangle, MessageSquare, Phone, Globe, LogOut, Info, Signal, Wifi, Battery };
