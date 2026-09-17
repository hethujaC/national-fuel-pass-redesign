import React from "react";
import { StatusBar, Section, KV, BottomNav, QrPattern, Search, Filter, ChevronRight, Check, Fuel, Car, Clock, MapPin } from "@/components/Wf";
import type { ScreenId } from "@/components/Wf";

export function PassScreen({ onNav }: { onNav: (id: ScreenId) => void }) {
  return (
    <>
      <StatusBar />
      <div className="px-4 h-12 flex-shrink-0 bg-white border-b border-gray-300 flex items-center justify-between">
        <h2 className="wf-h2">Fuel Pass</h2>
        <div className="wf-badge wf-badge-ok"><Check size={11} /> Valid</div>
      </div>

      <div className="wf-screen-content pt-3">
        {/* QR Card — primary */}
        <div className="wf-box p-5 relative">
          <span className="wf-section-tag">Present at Station</span>
          <p className="wf-cap text-center mt-1">Show this QR code to the fuel station attendant</p>

          <div className="my-4 flex justify-center">
            <QrPattern size={210} />
          </div>

          <div className="text-center">
            <p className="wf-label">Vehicle Number</p>
            <p className="text-2xl font-bold tracking-wider mt-1">CAR - 1234</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-200 border-dashed">
            <KV k="Fuel Type" v="Petrol 92" />
            <KV k="Quota" v="25.0 L / week" />
            <KV k="Remaining" v="20.0 L" />
            <KV k="Valid Until" v="Sep 22, 2026" />
          </div>
        </div>

        {/* Instructions */}
        <Section label="How to Use">
          <ol className="space-y-2.5">
            <li className="flex gap-2.5">
              <span className="w-5 h-5 wf-block-solid flex items-center justify-center text-white text-[10px] font-bold rounded flex-shrink-0">1</span>
              <span className="wf-body text-sm">Open this screen before arriving at the station</span>
            </li>
            <li className="flex gap-2.5">
              <span className="w-5 h-5 wf-block-solid flex items-center justify-center text-white text-[10px] font-bold rounded flex-shrink-0">2</span>
              <span className="wf-body text-sm">Show the QR code to the attendant</span>
            </li>
            <li className="flex gap-2.5">
              <span className="w-5 h-5 wf-block-solid flex items-center justify-center text-white text-[10px] font-bold rounded flex-shrink-0">3</span>
              <span className="wf-body text-sm">Confirm the fuel amount before pumping</span>
            </li>
            <li className="flex gap-2.5">
              <span className="w-5 h-5 wf-block-solid flex items-center justify-center text-white text-[10px] font-bold rounded flex-shrink-0">4</span>
              <span className="wf-body text-sm">Your quota updates automatically after refilling</span>
            </li>
          </ol>
        </Section>

        {/* Offline note */}
        <div className="wf-box p-3 mt-3 flex items-center gap-2">
          <div className="w-8 h-8 wf-block flex items-center justify-center flex-shrink-0"><Clock size={16} /></div>
          <p className="wf-cap">Pass works offline. Code refreshes every 30 minutes for security.</p>
        </div>

        <button className="wf-btn wf-btn-secondary w-full h-11 mt-3 text-sm">
          Download Pass (PDF)
        </button>
      </div>
      <BottomNav active="pass" onNav={onNav} />
    </>
  );
}

const STATIONS = [
  { name: "Ceypetco — Mahabage", dist: "1.2 km", fuel: "Petrol 92 · Diesel", status: "Available", wait: "5 min", badge: "ok" },
  { name: "Lanka IOC — Wattala", dist: "2.8 km", fuel: "Petrol 92 · 95", status: "Limited", wait: "20 min", badge: "warn" },
  { name: "Ceypetco — Kadawatha", dist: "4.5 km", fuel: "Diesel only", status: "Out of stock", wait: "—", badge: "alert" },
  { name: "Lanka IOC — Kelaniya", dist: "5.1 km", fuel: "Petrol 92 · 95 · Diesel", status: "Available", wait: "10 min", badge: "ok" },
];

export function StationsScreen({ onNav }: { onNav: (id: ScreenId) => void }) {
  const [filter, setFilter] = React.useState("all");
  const chips = [
    { id: "all", label: "All" },
    { id: "petrol", label: "Petrol 92" },
    { id: "petrol95", label: "Petrol 95" },
    { id: "diesel", label: "Diesel" },
    { id: "open", label: "Open Now" },
  ];
  return (
    <>
      <StatusBar />
      <div className="px-4 h-12 flex-shrink-0 bg-white border-b border-gray-300 flex items-center justify-between">
        <h2 className="wf-h2">Fuel Stations</h2>
        <button className="wf-cap font-semibold flex items-center gap-1"><Filter size={14} /> Filter</button>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 bg-white border-b border-gray-300 pb-3">
        <div className="flex items-center gap-2 wf-input">
          <Search size={18} className="text-gray-400" />
          <input placeholder="Search station or area" className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <div className="wf-scroll-x mt-2">
          {chips.map((c) => (
            <span key={c.id} className="wf-chip" data-on={filter === c.id} onClick={() => setFilter(c.id)}>{c.label}</span>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="px-4 pt-3">
        <div className="wf-stripe h-36 relative flex items-center justify-center">
          <span className="wf-cap bg-white/70 px-2 rounded">Map placeholder — user location + station pins</span>
          <div className="absolute w-3 h-3 rounded-full bg-gray-700 ring-4 ring-gray-300" style={{ top: "40%", left: "45%" }} />
        </div>
      </div>

      <div className="wf-screen-content pt-1">
        <p className="wf-label px-1 mb-1">{STATIONS.length} stations nearby · sorted by distance</p>

        {STATIONS.map((s, i) => (
          <React.Fragment key={i}>
            <div className="wf-box p-3 mt-2 flex items-start gap-3">
              <div className="w-10 h-10 wf-block flex items-center justify-center flex-shrink-0">
                <Fuel size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="wf-h3 truncate">{s.name}</p>
                <p className="wf-cap">{s.fuel}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="wf-cap flex items-center gap-1"><MapPin size={12} /> {s.dist}</span>
                  <span className="wf-cap flex items-center gap-1"><Clock size={12} /> Wait ~{s.wait}</span>
                </div>
              </div>
              <div className={`wf-badge wf-badge-${s.badge}`}>{s.status}</div>
            </div>
            {i < STATIONS.length - 1 && <div className="wf-connector" />}
          </React.Fragment>
        ))}

        <button className="wf-btn wf-btn-secondary w-full h-11 mt-3 text-sm flex items-center justify-center gap-1">
          View all on map <ChevronRight size={16} />
        </button>
      </div>
      <BottomNav active="stations" onNav={onNav} />
    </>
  );
}
