import React from "react";
import { StatusBar, Section, KV, BottomNav, Bell, ChevronRight, Fuel, Check, AlertTriangle, HelpCircle, MessageSquare, Phone, ChevronRight as Chevron, User, Car, Globe, LogOut, Info } from "@/components/Wf";
import type { ScreenId } from "@/components/Wf";

const TXNS = [
  { date: "Sep 14, 2026 · 3:20 PM", station: "Ceypetco — Mahabage", fuel: "Petrol 92", qty: "10.0 L", remaining: "20.0 L", status: "Completed" },
  { date: "Sep 7, 2026 · 1:10 PM", station: "Ceypetco — Kadawatha", fuel: "Petrol 92", qty: "15.0 L", remaining: "25.0 L", status: "Completed" },
  { date: "Aug 31, 2026 · 5:45 PM", station: "Lanka IOC — Wattala", fuel: "Petrol 92", qty: "20.0 L", remaining: "25.0 L", status: "Completed" },
  { date: "Aug 24, 2026 · 9:00 AM", station: "Ceypetco — Mahabage", fuel: "Petrol 92", qty: "25.0 L", remaining: "0.0 L", status: "Completed" },
];

export function HistoryScreen({ onNav }: { onNav: (id: ScreenId) => void }) {
  const [tab, setTab] = React.useState("all");
  return (
    <>
      <StatusBar />
      <div className="px-4 h-12 flex-shrink-0 bg-white border-b border-gray-300 flex items-center justify-between">
        <h2 className="wf-h2">Transaction History</h2>
        <button className="wf-cap font-semibold">Export</button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-300 px-4">
        <div className="wf-tab" data-on={tab === "all"} onClick={() => setTab("all")}>All</div>
        <div className="wf-tab" data-on={tab === "month"} onClick={() => setTab("month")}>This Month</div>
        <div className="wf-tab" data-on={tab === "week"} onClick={() => setTab("week")}>This Week</div>
      </div>

      <div className="wf-screen-content pt-2">
        {/* Summary */}
        <div className="wf-box p-3 relative">
          <span className="wf-section-tag">Summary — September</span>
          <div className="grid grid-cols-3 gap-2 mt-1 text-center">
            <div>
              <p className="text-lg font-bold">70<span className="text-xs"> L</span></p>
              <p className="wf-cap">Total dispensed</p>
            </div>
            <div className="border-x border-gray-200">
              <p className="text-lg font-bold">4</p>
              <p className="wf-cap">Refills</p>
            </div>
            <div>
              <p className="text-lg font-bold">LKR 17k</p>
              <p className="wf-cap">Est. spend</p>
            </div>
          </div>
        </div>

        {/* Transaction list */}
        {TXNS.map((t, i) => (
          <React.Fragment key={i}>
            <div className="wf-box p-3 mt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 wf-block flex items-center justify-center flex-shrink-0"><Fuel size={18} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="wf-h3 truncate">{t.station}</p>
                    <span className="wf-badge wf-badge-ok">{t.status}</span>
                  </div>
                  <p className="wf-cap mt-0.5">{t.date}</p>
                  <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-200 border-dashed">
                    <KV k="Fuel" v={t.fuel} />
                    <KV k="Quantity" v={t.qty} />
                    <KV k="Remaining" v={t.remaining} />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* Load more */}
        <button className="wf-btn wf-btn-ghost w-full h-10 mt-2 text-sm border border-gray-300 rounded-xl">
          Load older transactions
        </button>
      </div>
      <BottomNav active="history" onNav={onNav} />
    </>
  );
}

const NOTIFS = [
  { type: "allocation", title: "Weekly fuel allocation updated", body: "Your new quota of 25.0L Petrol 92 is now available.", time: "2h ago", icon: "fuel", badge: "ok" },
  { type: "reminder", title: "Refill reminder", body: "You have 20L remaining. Eligible for refill tomorrow after 6 AM.", time: "5h ago", icon: "bell", badge: "warn" },
  { type: "system", title: "Scheduled maintenance", body: "System will be unavailable Sep 20, 11 PM–1 AM.", time: "1d ago", icon: "info", badge: "muted" },
  { type: "alert", title: "Station out of stock", body: "Ceypetco Kadawatha is currently out of Petrol 92.", time: "1d ago", icon: "alert", badge: "alert" },
];

export function NotificationsScreen({ onNav, onBack }: { onNav: (id: ScreenId) => void; onBack: () => void }) {
  return (
    <>
      <StatusBar />
      <div className="px-4 h-12 flex-shrink-0 bg-white border-b border-gray-300 flex items-center justify-between">
        <button className="wf-cap" onClick={onBack}>‹ Back</button>
        <h2 className="wf-h2">Notifications</h2>
        <button className="wf-cap font-semibold">Mark all read</button>
      </div>

      <div className="wf-screen-content pt-2">
        <p className="wf-label mb-1">4 notifications · 3 unread</p>
        {NOTIFS.map((n, i) => (
          <div key={i} className={`wf-box p-3 mt-2 flex items-start gap-3 ${i < 3 ? "border-l-4" : ""}`} style={i < 3 ? { borderLeftColor: "#374151", borderLeftWidth: 4 } : {}}>
            <div className="w-10 h-10 wf-block flex items-center justify-center flex-shrink-0">
              {n.icon === "fuel" && <Fuel size={18} />}
              {n.icon === "bell" && <Bell size={18} />}
              {n.icon === "info" && <Info size={18} />}
              {n.icon === "alert" && <AlertTriangle size={18} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="wf-h3">{n.title}</p>
                <span className={`wf-badge wf-badge-${n.badge}`}>{n.type}</span>
              </div>
              <p className="wf-cap mt-0.5">{n.body}</p>
              <p className="wf-cap mt-1 text-gray-400">{n.time}</p>
            </div>
          </div>
        ))}
        <button className="wf-btn wf-btn-ghost w-full h-10 mt-3 text-sm">
          View all announcements
        </button>
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </>
  );
}

export function ProfileScreen({ onNav, onBack }: { onNav: (id: ScreenId) => void; onBack: () => void }) {
  return (
    <>
      <StatusBar />
      <div className="px-4 h-12 flex-shrink-0 bg-white border-b border-gray-300 flex items-center justify-between">
        <button className="wf-cap" onClick={onBack}>‹ Back</button>
        <h2 className="wf-h2">Profile &amp; Settings</h2>
        <span className="w-12" />
      </div>

      <div className="wf-screen-content pt-2">
        {/* User card */}
        <div className="wf-box p-4 flex items-center gap-3 relative">
          <span className="wf-section-tag">Account</span>
          <div className="w-14 h-14 wf-block-solid rounded-full flex items-center justify-center text-white">
            <User size={24} />
          </div>
          <div className="flex-1">
            <h3 className="wf-h2">Nimal Perera</h3>
            <p className="wf-cap">+94 71 234 5678</p>
            <p className="wf-cap">NIC: 198523401789</p>
          </div>
        </div>

        {/* Vehicles */}
        <Section label="My Vehicles">
          <div className="wf-list-row">
            <div className="w-9 h-9 wf-block flex items-center justify-center flex-shrink-0"><Car size={16} /></div>
            <div className="flex-1">
              <p className="wf-body font-semibold">CAR-1234 · Toyota Aqua</p>
              <p className="wf-cap">Primary · Verified</p>
            </div>
            <Chevron size={18} className="text-gray-400" />
          </div>
          <div className="wf-divider" />
          <div className="wf-list-row">
            <div className="w-9 h-9 wf-block flex items-center justify-center flex-shrink-0"><Car size={16} /></div>
            <div className="flex-1">
              <p className="wf-body font-semibold">VAN-5678 · Toyota HiAce</p>
              <p className="wf-cap">Pending verification</p>
            </div>
            <Chevron size={18} className="text-gray-400" />
          </div>
          <button className="wf-cap font-semibold text-gray-600 mt-2 flex items-center gap-1" onClick={() => onNav("vehicle")}>
            Manage vehicles <ChevronRight size={14} />
          </button>
        </Section>

        {/* Preferences */}
        <Section label="Preferences">
          <div className="space-y-0">
            <div className="wf-list-row">
              <Globe size={18} className="flex-shrink-0 text-gray-500" />
              <span className="flex-1 wf-body">Language</span>
              <span className="wf-cap font-semibold">English</span>
              <Chevron size={18} className="text-gray-400" />
            </div>
            <div className="wf-divider" />
            <div className="wf-list-row">
              <Bell size={18} className="flex-shrink-0 text-gray-500" />
              <span className="flex-1 wf-body">Notifications</span>
              <span className="wf-cap font-semibold">On</span>
              <Chevron size={18} className="text-gray-400" />
            </div>
          </div>
        </Section>

        {/* Support */}
        <Section label="Support">
          <button className="wf-list-row w-full text-left" onClick={() => onNav("help")}>
            <HelpCircle size={18} className="flex-shrink-0 text-gray-500" />
            <span className="flex-1 wf-body">Help &amp; Support</span>
            <Chevron size={18} className="text-gray-400" />
          </button>
        </Section>

        {/* Logout */}
        <button className="wf-btn wf-btn-secondary w-full h-12 mt-4 flex items-center justify-center gap-2" style={{ color: "#991b1b", borderColor: "#d4b0b0" }}>
          <LogOut size={18} /> Log Out
        </button>

        <p className="text-center wf-cap mt-3">National Fuel Pass v2.0 · Concept</p>
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </>
  );
}

const FAQS = [
  "How do I register my vehicle?",
  "Why is my fuel quota different this week?",
  "What if the QR code doesn't scan at the station?",
  "Can I transfer my fuel quota to another vehicle?",
  "How is fuel allocation calculated?",
  "What do I do if a station refuses my Fuel Pass?",
];

export function HelpScreen({ onNav, onBack }: { onNav: (id: ScreenId) => void; onBack: () => void }) {
  const [open, setOpen] = React.useState(0);
  return (
    <>
      <StatusBar />
      <div className="px-4 h-12 flex-shrink-0 bg-white border-b border-gray-300 flex items-center justify-between">
        <button className="wf-cap" onClick={onBack}>‹ Back</button>
        <h2 className="wf-h2">Help &amp; Support</h2>
        <span className="w-12" />
      </div>

      <div className="wf-screen-content pt-2">
        {/* Search */}
        <div className="flex items-center gap-2 wf-input">
          <HelpCircle size={18} className="text-gray-400" />
          <input placeholder="Search help topics…" className="flex-1 bg-transparent outline-none text-sm" />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button className="wf-box p-3 flex flex-col items-start gap-2 text-left">
            <div className="w-9 h-9 wf-block-solid flex items-center justify-center text-white"><Phone size={18} /></div>
            <div>
              <p className="wf-h3">Call Support</p>
              <p className="wf-cap">Hotline 1900</p>
            </div>
          </button>
          <button className="wf-box p-3 flex flex-col items-start gap-2 text-left">
            <div className="w-9 h-9 wf-block-solid flex items-center justify-center text-white"><MessageSquare size={18} /></div>
            <div>
              <p className="wf-h3">Report Issue</p>
              <p className="wf-cap">Submit a complaint</p>
            </div>
          </button>
        </div>

        {/* FAQ */}
        <Section label="Frequently Asked Questions">
          <div className="space-y-0">
            {FAQS.map((q, i) => (
              <div key={i}>
                <button className="wf-list-row w-full text-left" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className={`text-sm flex-1 ${open === i ? "font-semibold" : "font-normal"}`}>{q}</span>
                  <Chevron size={16} className={`text-gray-400 transition-transform ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && (
                  <div className="wf-block p-3 mb-2 text-sm wf-body">
                    <p>This is placeholder answer text for the wireframe. It explains the process in simple, plain language suitable for users of all literacy levels, with short sentences and clear steps.</p>
                  </div>
                )}
                {i < FAQS.length - 1 && <div className="wf-divider" />}
              </div>
            ))}
          </div>
        </Section>

        {/* Common problems */}
        <Section label="Common Problems">
          <ul className="space-y-2 wf-body text-sm">
            <li className="flex items-start gap-2"><span className="wf-cap">•</span> QR code not scanning → Ask attendant to enter vehicle number manually</li>
            <li className="flex items-start gap-2"><span className="wf-cap">•</span> Wrong quota shown → Pull to refresh, or log out and back in</li>
            <li className="flex items-start gap-2"><span className="wf-cap">•</span> No SMS received → Check signal, or use NIC login option</li>
          </ul>
        </Section>
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </>
  );
}
