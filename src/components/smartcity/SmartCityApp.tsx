import React, { useState, useEffect } from 'react';
import { PaystackModal } from '../common/PaystackModal.tsx';
import { 
  Building, Sun, Trees, Droplets, MapPin, Download, 
  Check, ChevronRight, Lock, Sparkles, Compass, ShieldCheck,
  Zap, School, Cross, ShoppingBag, Eye, Layers, RefreshCw
} from 'lucide-react';
import { SmartCityMetric } from '../../types/index.ts';

interface SmartCityAppProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const SmartCityApp: React.FC<SmartCityAppProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  // DEMO NO TYPING: Drone flyover / autonomous map lighting sequence
  const [activeNode, setActiveNode] = useState(0);
  const [droneAltitude, setDroneAltitude] = useState(450);

  const demoSectors = [
    { name: '4-Lane Arterial Highway & Ring Road Corridors', icon: Compass, color: '#0284c7', stats: '14.2 km paved corridor' },
    { name: '5.2 Megawatt Solar Photovoltaic & Microgrid Substation', icon: Sun, color: '#f59e0b', stats: '100% renewable power autonomy' },
    { name: 'Civic Healthcare Precinct (120-Bed Hospital & Helipad)', icon: Cross, color: '#ef4444', stats: 'Serving 25,000 residents' },
    { name: 'K-12 STEM Innovation Academy & Municipal Sports Complex', icon: School, color: '#8b5cf6', stats: '1,800 student capacity' },
    { name: 'Commercial Agri-Marketplace & Wholesale Freezone Depot', icon: ShoppingBag, color: '#10b981', stats: '64 retail & logistics bays' },
  ];

  // Auto-cycling active sector in demo every 4 seconds
  useEffect(() => {
    if (isUnlocked) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % demoSectors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isUnlocked, demoSectors.length]);

  // Altitude jitter for drone flyover HUD
  useEffect(() => {
    if (isUnlocked) return;
    const timer = setInterval(() => {
      setDroneAltitude((prev) => 440 + Math.floor(Math.random() * 25));
    }, 1200);
    return () => clearInterval(timer);
  }, [isUnlocked]);

  // REAL AFTER PAYMENT (Unlocked Mode)
  const [landAcres, setLandAcres] = useState(50);
  const [zoningType, setZoningType] = useState<'mixed' | 'eco-gated' | 'industrial-freezone'>('mixed');
  const [activeLayer, setActiveLayer] = useState<'all' | 'roads' | 'zoning' | 'utilities' | 'drainage'>('all');
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  // Dynamic metrics calculated based on land size slider
  const metrics: SmartCityMetric = {
    acres: landAcres,
    residentialPlots: Math.round(landAcres * 5.2), // ~5 plots per acre with open space & roads
    commercialPlots: Math.round(landAcres * 0.45),
    populationCapacity: Math.round(landAcres * 22),
    solarCapacityMW: Number((landAcres * 0.08).toFixed(1)),
    roadNetworkKm: Number((landAcres * 0.28).toFixed(1)),
    estimatedInfraCostUSD: Math.round(landAcres * 32000), // $32k per acre infrastructure
    projectedLandGDVUSD: Math.round(landAcres * 98000), // $98k per acre GDV after master subdivision
  };

  const handleDownloadMasterPlanPDF = () => {
    setIsExportingPDF(true);
    setTimeout(() => {
      setIsExportingPDF(false);
      setPdfReady(true);
      window.print();
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F4F9FD] text-slate-800 min-h-screen">
      {/* Blue & White Government / Municipal Header */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-sky-200 border border-white/20 mb-2">
              <Building className="w-3.5 h-3.5 text-sky-300" />
              <span>Institutional Spatial AI • Town & Country Planning Directorate Standard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Smart City Planner
            </h1>
            <p className="text-sky-100 text-xs sm:text-sm mt-1">
              Autonomous subdivision, road geometry, subterranean drainage networks, and government-approval Master Plans.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
              <Compass className="w-5 h-5 text-white animate-spin" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-sky-200 font-bold">Drone Telemetry</div>
              <div className="text-sm sm:text-base font-black text-white font-mono">
                Altitude: {droneAltitude}m • <span className="text-sky-200 font-normal">GPS 5°36'N, 0°11'W</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-8">
        {/* ========================================================= */}
        {/* DEMO MODE: STRICTLY NO TYPING, DRONE FLYOVER AUTO-PLAY   */}
        {/* ========================================================= */}
        {!isUnlocked ? (
          <div className="space-y-6">
            {/* Auto-Play Drone Flyover & Light-up Map */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-sky-200 overflow-hidden relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      Automated Drone Radar Flyover
                    </span>
                    <span className="text-xs text-slate-400">• Map lights up by itself</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Smart Municipality Master Subdivision Layout (120-Acre Sector)
                  </h2>
                </div>

                <div className="bg-sky-50 border border-sky-200 px-4 py-2 rounded-xl text-right shrink-0">
                  <div className="text-[10px] uppercase font-bold text-sky-700">Active Scan Sector</div>
                  <div className="text-sm font-black text-sky-900">
                    {demoSectors[activeNode].name}
                  </div>
                </div>
              </div>

              {/* Tactical Blueprint Map Canvas that lights up */}
              <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-sky-300 bg-[#091e36] shadow-inner">
                {/* SVG Smart City Grid with glowing nodes */}
                <svg viewBox="0 0 1000 600" className="w-full h-full">
                  <defs>
                    <radialGradient id="droneGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </radialGradient>
                    <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="0.8" />
                    </pattern>
                  </defs>

                  <rect width="1000" height="600" fill="#0b1b2d" />
                  <rect width="1000" height="600" fill="url(#cityGrid)" />

                  {/* Curving River / Storm Drainage Waterway */}
                  <path
                    d="M 0 500 Q 250 420 500 520 T 1000 440"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="28"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <text x="420" y="525" fill="#bae6fd" fontSize="12" fontWeight="bold">STORM CULVERT DRAINAGE</text>

                  {/* Ring Highway & Arterial Roads (Glowing White/Blue) */}
                  <circle cx="500" cy="300" r="220" fill="none" stroke="#38bdf8" strokeWidth="6" strokeDasharray="12 6" />
                  <line x1="100" y1="300" x2="900" y2="300" stroke="#f8fafc" strokeWidth="8" />
                  <line x1="500" y1="80" x2="500" y2="520" stroke="#f8fafc" strokeWidth="8" />

                  {/* Residential Cluster Zones */}
                  {[
                    { x: 220, y: 160, label: 'RESIDENTIAL CLUSTER A (120 PLOTS)', lit: activeNode === 0 },
                    { x: 650, y: 160, label: 'RESIDENTIAL CLUSTER B (140 PLOTS)', lit: activeNode === 0 },
                    { x: 220, y: 380, label: 'ECO-RESIDENTIAL C (90 PLOTS)', lit: activeNode === 0 },
                  ].map((zone, i) => (
                    <g key={i}>
                      <rect
                        x={zone.x - 70}
                        y={zone.y - 40}
                        width="180"
                        height="90"
                        rx="8"
                        fill={zone.lit ? '#0369a1' : '#1e293b'}
                        stroke="#38bdf8"
                        strokeWidth="2"
                        opacity={zone.lit ? 0.9 : 0.6}
                      />
                      <text x={zone.x - 60} y={zone.y + 10} fill="#f8fafc" fontSize="10" fontWeight="bold">
                        {zone.label}
                      </text>
                    </g>
                  ))}

                  {/* Solar Farm Sector (Lights up when node === 1) */}
                  <g>
                    <rect
                      x="740"
                      y="340"
                      width="190"
                      height="120"
                      rx="8"
                      fill={activeNode === 1 ? '#b45309' : '#1e293b'}
                      stroke="#f59e0b"
                      strokeWidth={activeNode === 1 ? '4' : '2'}
                    />
                    <text x="760" y="380" fill="#fef3c7" fontSize="11" fontWeight="bold">☀️ 5.2MW SOLAR SUBSTATION</text>
                    <text x="760" y="405" fill="#fde68a" fontSize="9">GRID BATTERY STORAGE</text>
                  </g>

                  {/* Hospital Center (Lights up when node === 2) */}
                  <g>
                    <rect
                      x="420"
                      y="150"
                      width="160"
                      height="90"
                      rx="8"
                      fill={activeNode === 2 ? '#b91c1c' : '#1e293b'}
                      stroke="#ef4444"
                      strokeWidth={activeNode === 2 ? '4' : '2'}
                    />
                    <text x="440" y="190" fill="#fee2e2" fontSize="11" fontWeight="bold">🏥 MUNICIPAL HOSPITAL</text>
                    <text x="440" y="210" fill="#fca5a5" fontSize="9">120 BEDS • HELIPORT</text>
                  </g>

                  {/* STEM Academy & School (Lights up when node === 3) */}
                  <g>
                    <rect
                      x="380"
                      y="350"
                      width="180"
                      height="90"
                      rx="8"
                      fill={activeNode === 3 ? '#6d28d9' : '#1e293b'}
                      stroke="#a855f7"
                      strokeWidth={activeNode === 3 ? '4' : '2'}
                    />
                    <text x="400" y="390" fill="#f3e8ff" fontSize="11" fontWeight="bold">🎓 STEM ACADEMY</text>
                    <text x="400" y="410" fill="#d8b4fe" fontSize="9">K-12 • SPORTS GROUND</text>
                  </g>

                  {/* Central Market & Commercial Plaza (Lights up when node === 4) */}
                  <g>
                    <circle
                      cx="500"
                      cy="300"
                      r="45"
                      fill={activeNode === 4 ? '#047857' : '#0f172a'}
                      stroke="#10b981"
                      strokeWidth={activeNode === 4 ? '5' : '2'}
                    />
                    <text x="475" y="305" fill="#a7f3d0" fontSize="10" fontWeight="bold">CENTRAL</text>
                    <text x="475" y="320" fill="#a7f3d0" fontSize="10" fontWeight="bold">MARKET</text>
                  </g>

                  {/* Animated Radar Pulse circle sweep */}
                  <circle cx="500" cy="300" r="180" fill="url(#droneGlow)" className="animate-pulse" />
                </svg>

                {/* Drone HUD Overlays - NO INPUT FIELDS */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-sky-400/40 rounded-xl p-3 text-sky-200 text-xs font-mono space-y-1">
                  <div className="text-[10px] uppercase text-sky-400 font-bold">Drone Optical Scan</div>
                  <div>Zoning Compliance: <strong>99.8% Certified</strong></div>
                  <div>Hydrological Runoff: <strong>Zero Flood Risk</strong></div>
                  <div>Planned Pop: <strong>14,200 Residents</strong></div>
                </div>

                {/* Live Active Sector HUD Bottom Banner */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-sky-400/30 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping"></span>
                    <span className="text-xs font-bold text-white">
                      Inspecting: {demoSectors[activeNode].name}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-sky-300 font-bold">
                    {demoSectors[activeNode].stats}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-2.5 bg-sky-50 border border-sky-200 rounded-xl text-center text-xs text-sky-900 font-medium">
                🔒 Hands-free aerial demo. Custom land size slider, plot subdivision, drainage CAD generator, and town council approval documents unlock below.
              </div>
            </div>

            {/* PAYWALL CTA BOX */}
            <div className="bg-gradient-to-br from-sky-700 via-sky-600 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto border-2 border-sky-300">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-white text-sky-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Lock className="w-7 h-7 text-sky-700" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Get Master Plan For YOUR Land
                </h3>

                <p className="text-sky-100 text-sm max-w-lg mx-auto">
                  Provide your parcel size (5 to 500+ acres). Our spatial AI autonomously partitions arterial roads, solar microgrids, residential & commercial plots, stormwater drainage, and prepares the official Master Plan PDF for government municipal approval.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPaystackOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 active:scale-95 text-sky-900 hover:text-sky-950 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-sky-950/20 inline-flex items-center justify-center space-x-3 transition-all cursor-pointer border border-sky-200"
                  >
                    <span>Get Master Plan For YOUR Land - $500 via Paystack USD</span>
                    <ChevronRight className="w-5 h-5 text-sky-700" />
                  </button>
                </div>

                <div className="text-xs text-sky-200 font-medium">
                  Accepted by Land Commission & Municipal Assemblies • Certified Surveyor Geometry • Instant Delivery
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* REAL AFTER PAYMENT: CUSTOM LAND SLIDER & GOVERNMENT PLAN  */
          /* ========================================================= */
          <div className="space-y-6">
            {/* Unlocked Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-900 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Smart City Planner — Unlocked ($500 Paid via Paystack USD)</h4>
                  <p className="text-xs text-emerald-700">
                    Parametric master subdivision engine, GIS layer controls, and Government Approval PDF active.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadMasterPlanPDF}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Municipal Approval PDF</span>
              </button>
            </div>

            {/* LAND PARAMETERS SLIDERS */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                  <span>Spatial Planning Parameters</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Auto-Partitioning Engine</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Land Size Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span>Total Parcel Land Size</span>
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-bold font-mono">
                      {landAcres} Acres ({Math.round(landAcres * 4046.86).toLocaleString()} sqm)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="250"
                    step="5"
                    value={landAcres}
                    onChange={(e) => setLandAcres(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>5 Acres (Mini Estate)</span>
                    <span>100 Acres</span>
                    <span>250+ Acres (New City)</span>
                  </div>
                </div>

                {/* Development Zoning Archetype */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">Zoning Model</label>
                  <select
                    value={zoningType}
                    onChange={(e) => setZoningType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="mixed">Mixed-Use Residential, Commercial & Civic (Recommended)</option>
                    <option value="eco-gated">Gated Eco-Community & Luxury Golf Estate</option>
                    <option value="industrial-freezone">Agro-Processing & Industrial Logistics Freezone</option>
                  </select>
                  <p className="text-[11px] text-slate-400">Complies with Local Governance Act & Land Use Planning</p>
                </div>

                {/* Layer Filters */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">GIS Map Layer Toggles</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Layers' },
                      { id: 'roads', label: 'Roads' },
                      { id: 'zoning', label: 'Zoning' },
                      { id: 'utilities', label: 'Solar & Power' },
                      { id: 'drainage', label: 'Drainage' },
                    ].map((layer) => (
                      <button
                        key={layer.id}
                        type="button"
                        onClick={() => setActiveLayer(layer.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          activeLayer === layer.id
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {layer.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* KEY METRICS SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <div className="text-xs font-semibold text-slate-500 uppercase">Saleable Residential Plots</div>
                <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
                  {metrics.residentialPlots.toLocaleString()} <span className="text-xs font-normal text-slate-400">Plots</span>
                </div>
                <div className="text-[11px] text-sky-600 font-medium">Standard 70 x 100 ft parcels</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <div className="text-xs font-semibold text-slate-500 uppercase">Solar Energy Output</div>
                <div className="text-2xl font-black text-amber-600 mt-1 font-mono">
                  {metrics.solarCapacityMW} <span className="text-xs font-normal text-slate-400">Megawatts</span>
                </div>
                <div className="text-[11px] text-amber-700 font-medium">Autonomous clean microgrid</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <div className="text-xs font-semibold text-slate-500 uppercase">Infrastructure CapEx</div>
                <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
                  ${(metrics.estimatedInfraCostUSD / 1000000).toFixed(2)}M <span className="text-xs font-normal text-slate-400">USD</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Paved roads, drains, transformers</div>
              </div>

              <div className="bg-gradient-to-br from-sky-600 to-blue-800 text-white rounded-2xl p-4 shadow-xs">
                <div className="text-xs font-bold text-sky-100 uppercase">Subdivided Land GDV</div>
                <div className="text-2xl font-black text-white mt-1 font-mono">
                  ${(metrics.projectedLandGDVUSD / 1000000).toFixed(2)}M <span className="text-xs font-normal text-sky-200">USD</span>
                </div>
                <div className="text-[11px] text-sky-100 font-semibold">Net 306% Value Creation</div>
              </div>
            </div>

            {/* MASTER PLAN SPECIFICATION BRIEF */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Official Municipal Sub-Division Brief ({landAcres} Acres Development)
                </h3>
                <span className="text-xs font-mono text-slate-500">Document No: OSK-TCPD-2026</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">
                  <div className="font-bold text-slate-800">1. Road Hierarchy & Right of Way</div>
                  <p className="text-slate-600">
                    Dual 24-meter central arterial spine connected to 15-meter secondary collector roads and 10-meter cul-de-sac residential access loops with pre-cast concrete U-drains.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">
                  <div className="font-bold text-slate-800">2. Stormwater & Ecological Buffer</div>
                  <p className="text-slate-600">
                    Gravity-fed stormwater routing discharging into two central natural retention bioretention ponds designed for a 1-in-100-year rainfall intensity.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">
                  <div className="font-bold text-slate-800">3. Civic Social Infrastructure Allocation</div>
                  <p className="text-slate-600">
                    Reservation of 4.2 acres for a primary health outpost, police and fire emergency station, K-12 school reservation, and community open-air green park.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">
                  <div className="font-bold text-slate-800">4. Utilities & Underground Ducting</div>
                  <p className="text-slate-600">
                    Underground conduit trenches reserved for high-voltage electricity lines, fiber-optic telecom ducts, and HDPE water distribution mains with fire hydrants every 200m.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleDownloadMasterPlanPDF}
                  disabled={isExportingPDF}
                  className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-lg flex items-center space-x-2 cursor-pointer transition-all"
                >
                  {isExportingPDF ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Compiling Government Master Plan PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Master Plan PDF for Government Approval</span>
                    </>
                  )}
                </button>
              </div>

              {pdfReady && (
                <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                  ✓ Master Plan PDF generated with official cadastral stamps and opened for printing/saving!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Paystack Checkout Modal */}
      <PaystackModal
        isOpen={isPaystackOpen}
        onClose={() => setIsPaystackOpen(false)}
        onSuccess={() => {
          onUnlock();
        }}
        title="Smart City Planner — Master Plan & Cadastral Subdivision"
        amountUSD={500}
        appName="Smart City Planner"
      />
    </div>
  );
};
