import React from "react";
import { StatusBar, Section, KV, BottomNav, Bell, ChevronRight, Fuel, Car, QrCode, Plus, Check, AlertTriangle } from "@/components/Wf";
import type { ScreenId } from "@/components/Wf";

export function DashboardScreen({ onNav }: { onNav: (id: ScreenId) => void }) {
  return (
    <>
      <StatusBar />
      <div className="px-4 pt-3 pb-1 flex items-center justify-between bg-white border-b border-gray-300">
        <div>
          <p className="wf-cap">Good morning,</p>
          <h2 className="wf-h2">Nimal Perera</h2>
        </div>
        <div className="relative cursor-pointer" onClick={() => onNav("notifications")}>
          <div className="w-10 h-10 wf-block flex items-center justify-center">
            <Bell size={18} />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gray-700 text-white text-[9px] flex items-center justify-center font-bold">3</span>
        </div>
      </div>

      <div className="wf-screen-content pt-2">
        {/* Hero quota card */}
        <div className="wf-box p-4 relative">
          <span className="wf-section-tag">Current Fuel Allocation</span>
          <div className="flex items-start justify-between mt-1">
            <div>
              <p className="wf-cap">Remaining this week</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">20.0</span>
                <span className="wf-cap">Litres · Petrol 92</span>
              </div>
            </div>
            <div className="wf-badge wf-badge-ok"><Check size={11} /> Active</div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between wf-cap mb-1">
              <span>Used 5.0 L of 25.0 L</span>
              <span>80%</span>
            </div>
            <div className="wf-bar"><span style={{ width: "20%" }} /></div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 border-dashed">
            <div>
              <p className="wf-cap">Next eligible refill</p>
              <p className="wf-body font-semibold">Tomorrow · After 6:00 AM</p>
            </div>
            <div className="text-right">
              <p className="wf-cap">Resets on</p>
              <p className="wf-body font-semibold">Mon, Sep 22</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button className="wf-box p-3 flex flex-col items-start gap-2 text-left active:scale-95 transition-transform" onClick={() => onNav("pass")}>
            <div className="w-9 h-9 wf-block-solid flex items-center justify-center text-white"><QrCode size={18} /></div>
            <div>
              <p className="wf-h3">Show Fuel Pass</p>
              <p className="wf-cap">QR code for station</p>
            </div>
          </button>
          <button className="wf-box p-3 flex flex-col items-start gap-2 text-left active:scale-95 transition-transform" onClick={() => onNav("stations")}>
            <div className="w-9 h-9 wf-block-solid flex items-center justify-center text-white"><Fuel size={18} /></div>
            <div>
              <p className="wf-h3">Find Station</p>
              <p className="wf-cap">Nearby &amp; available</p>
            </div>
          </button>
        </div>

        {/* Active vehicle */}
        <Section label="Active Vehicle">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 wf-block flex items-center justify-center flex-shrink-0">
              <Car size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="wf-h3">CAR-1234</p>
              <p className="wf-cap">Toyota Aqua · Petrol 92</p>
            </div>
            <div className="wf-badge wf-badge-ok">Verified</div>
          </div>
          <button className="wf-cap font-semibold text-gray-600 mt-2 flex items-center gap-1" onClick={() => onNav("vehicle")}>
            Manage vehicles <ChevronRight size={14} />
          </button>
        </Section>

        {/* Recent activity */}
        <Section label="Recent Activity">
          <div className="space-y-0">
            <div className="wf-list-row">
              <div className="w-9 h-9 wf-block flex items-center justify-center flex-shrink-0"><Fuel size={15} /></div>
              <div className="flex-1 min-w-0">
                <p className="wf-body font-semibold">10.0 L · Petrol 92</p>
                <p className="wf-cap">Sep 14 · Ceypetco Mahabage</p>
              </div>
              <span className="wf-cap">−10.0 L</span>
            </div>
            <div className="wf-divider" />
            <div className="wf-list-row">
              <div className="w-9 h-9 wf-block flex items-center justify-center flex-shrink-0"><Fuel size={15} /></div>
              <div className="flex-1 min-w-0">
                <p className="wf-body font-semibold">15.0 L · Petrol 92</p>
                <p className="wf-cap">Sep 7 · Ceypetco Kadawatha</p>
              </div>
              <span className="wf-cap">−15.0 L</span>
            </div>
          </div>
          <button className="wf-cap font-semibold text-gray-600 mt-2 flex items-center gap-1" onClick={() => onNav("history")}>
            View all history <ChevronRight size={14} />
          </button>
        </Section>

        {/* Alert */}
        <div className="wf-box p-3 mt-3 border-l-4" style={{ borderLeftColor: "#b45309", borderLeftWidth: 4 }}>
          <div className="flex items-start gap-2">
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#b45309" }} />
            <div className="flex-1">
              <p className="wf-h3">Scheduled maintenance</p>
              <p className="wf-cap">Fuel allocation system will be updated Sep 20, 11 PM–1 AM.</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="dashboard" onNav={onNav} />
    </>
  );
}

export function VehicleScreen({ onNav, onBack }: { onNav: (id: ScreenId) => void; onBack: () => void }) {
  return (
    <>
      <StatusBar />
      <div className="px-4 h-12 flex-shrink-0 bg-white border-b border-gray-300 flex items-center justify-between">
        <button className="wf-cap" onClick={onBack}>‹ Back</button>
        <h2 className="wf-h2">My Vehicles</h2>
        <button className="wf-cap font-semibold flex items-center gap-1"><Plus size={14} /> Add</button>
      </div>

      <div className="wf-screen-content pt-2">
        {/* Primary vehicle card */}
        <div className="wf-box p-4 relative">
          <span className="wf-section-tag">Primary Vehicle</span>
          <div className="flex items-start gap-3 mt-1">
            <div className="w-16 h-16 wf-block wf-x flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="wf-h2">CAR-1234</h3>
                <div className="wf-badge wf-badge-ok"><Check size={10} /> Verified</div>
              </div>
              <p className="wf-cap mt-0.5">Toyota Aqua · 2018</p>
              <p className="wf-cap">Hybrid · Petrol 92</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200 border-dashed">
            <KV k="Chassis No." v="NHP-XXXXX" />
            <KV k="Engine No." v="1NZ-FXE" />
            <KV k="Registered" v="Jan 2023" />
            <KV k="Tank Capacity" v="26 L" />
          </div>
          <div className="flex gap-2 mt-3">
            <button className="wf-btn wf-btn-secondary flex-1 h-10 text-sm">Edit Details</button>
            <button className="wf-btn wf-btn-ghost flex-1 h-10 text-sm border border-gray-300">Set Primary</button>
          </div>
        </div>

        {/* Secondary vehicle — pending */}
        <div className="wf-box p-4 mt-3 relative">
          <span className="wf-section-tag">Secondary Vehicle</span>
          <div className="flex items-start gap-3 mt-1">
            <div className="w-16 h-16 wf-block wf-x flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="wf-h2">VAN-5678</h3>
                <div className="wf-badge wf-badge-warn">Pending</div>
              </div>
              <p className="wf-cap mt-0.5">Toyota HiAce · Diesel</p>
              <p className="wf-cap">Awaiting document verification</p>
            </div>
          </div>
          <button className="wf-cap font-semibold text-gray-600 mt-2 flex items-center gap-1">
            Check status <ChevronRight size={14} />
          </button>
        </div>

        {/* Add new */}
        <button className="wf-box p-4 mt-3 w-full flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <Plus size={20} />
          <span className="wf-h3">Register New Vehicle</span>
        </button>

        {/* Guidance */}
        <Section label="Required Documents">
          <ul className="space-y-2 wf-body text-sm">
            <li className="flex items-start gap-2"><span className="wf-cap">•</span> Vehicle registration certificate (CR book)</li>
            <li className="flex items-start gap-2"><span className="wf-cap">•</span> National Identity Card (NIC)</li>
            <li className="flex items-start gap-2"><span className="wf-cap">•</span> Insurance document (optional, speeds up verification)</li>
          </ul>
        </Section>
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </>
  );
}
