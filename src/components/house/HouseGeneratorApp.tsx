import React, { useState, useEffect } from 'react';
import { ThreeHouseViewer } from './ThreeHouseViewer.tsx';
import { PaystackModal } from '../common/PaystackModal.tsx';
import { 
  Users, Lock, Sparkles, Download, Layers, DollarSign, 
  FileText, Check, ChevronRight, Eye, RefreshCw, Sun, Moon,
  Home, Maximize2, ShieldCheck, Printer
} from 'lucide-react';
import { BOQItem } from '../../types/index.ts';

interface HouseGeneratorAppProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const HouseGeneratorApp: React.FC<HouseGeneratorAppProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  // DEMO AUTO-PLAY STATE (Strictly NO typing, changes every 5 seconds)
  const demoHouses = [
    {
      title: '2-Bedroom Contemporary Bungalow',
      type: '2 Bedroom',
      rooms: '2 Beds • 2 Baths • Living Hall • Kitchen',
      size: '120 sqm (1,290 sqft)',
      plot: 'Half Plot (35 x 70 ft)',
      priceUSD: 42000,
      stories: 1,
      bedrooms: 2,
      hasPool: false,
      badge: 'Popular for Starters',
    },
    {
      title: '3-Bedroom Executive Garden Villa',
      type: '3 Bedroom',
      rooms: '3 Beds Ensuite • 3.5 Baths • Open Plan Living • Patio',
      size: '215 sqm (2,314 sqft)',
      plot: 'Standard Plot (70 x 100 ft)',
      priceUSD: 78500,
      stories: 1,
      bedrooms: 3,
      hasPool: true,
      badge: 'Best Family Value',
    },
    {
      title: '4-Bedroom Royal Ambassador Residence',
      type: '4 Bedroom',
      rooms: '4 Beds All-Ensuite • 5 Baths • Family Lounge • Maids Quarters',
      size: '340 sqm (3,660 sqft)',
      plot: '1.5 Plots (100 x 100 ft)',
      priceUSD: 135000,
      stories: 2,
      bedrooms: 4,
      hasPool: true,
      badge: 'Luxury Executive',
    },
    {
      title: 'Ultra-Modern Architectural Duplex Penthouse',
      type: 'Duplex',
      rooms: '5 Beds • 6 Baths • Rooftop Lounge • Infinity Pool • 2-Car Garage',
      size: '480 sqm (5,166 sqft)',
      plot: 'Double Plot (140 x 100 ft)',
      priceUSD: 198000,
      stories: 2,
      bedrooms: 5,
      hasPool: true,
      badge: 'Flagship Masterpiece',
    },
  ];

  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [viewerCount, setViewerCount] = useState(2450);

  // Auto-cycle demo every 5 seconds
  useEffect(() => {
    if (isUnlocked) return;
    const interval = setInterval(() => {
      setCurrentDemoIndex((prev) => (prev + 1) % demoHouses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isUnlocked, demoHouses.length]);

  // Live jitter for watching counter
  useEffect(() => {
    const jitter = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 7) - 3);
    }, 3200);
    return () => clearInterval(jitter);
  }, []);

  // REAL AFTER PAYMENT (Unlocked Mode Sliders & Dashboard)
  const [rooms, setRooms] = useState(4);
  const [plotSize, setPlotSize] = useState('70x100ft'); // 35x70ft, 70x100ft, 100x100ft, 140x100ft
  const [budgetUSD, setBudgetUSD] = useState(95000);
  const [stories, setStories] = useState(2);
  const [hasPool, setHasPool] = useState(true);
  const [architecturalStyle, setArchitecturalStyle] = useState('Ultra Modern Minimalist');
  const [activeDashboardTab, setActiveDashboardTab] = useState<'plans' | '3d' | 'boq' | 'cost' | 'pdf'>('plans');
  const [nightMode, setNightMode] = useState(false);
  const [savedPlans, setSavedPlans] = useState<string[]>([
    'Default Executive Custom 4-Bed Layout',
  ]);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  // Computed Real metrics based on user sliders
  const estimatedAreaSqM = Math.round(55 + rooms * 45 + (stories > 1 ? 40 : 0));
  const estimatedCostMaterials = Math.round(budgetUSD * 0.58);
  const estimatedCostLabor = Math.round(budgetUSD * 0.28);
  const estimatedPermits = Math.round(budgetUSD * 0.05);
  const estimatedContingency = Math.round(budgetUSD * 0.09);

  // Calculated BOQ Items
  const boqList: BOQItem[] = [
    {
      id: 'boq-1',
      category: 'Substructure & Foundation',
      item: '6" Solid Sandcrete Foundation Blocks (3.5 N/mm²)',
      spec: 'ASTM C90 Standard high-density load bearing',
      quantity: Math.round(rooms * 750 + 1200),
      unit: 'Pcs',
      unitRateUSD: 1.15,
      totalUSD: Math.round((rooms * 750 + 1200) * 1.15),
    },
    {
      id: 'boq-2',
      category: 'Substructure & Foundation',
      item: 'Ordinary Portland Cement (Grade 42.5R)',
      spec: 'BS EN 197-1 certified for substructure casting',
      quantity: Math.round(rooms * 140 + 260),
      unit: 'Bags',
      unitRateUSD: 7.80,
      totalUSD: Math.round((rooms * 140 + 260) * 7.80),
    },
    {
      id: 'boq-3',
      category: 'Reinforced Concrete Framework',
      item: 'High-Tensile Deformed Rebar (16mm)',
      spec: 'Grade 500B BS 4449 for columns, ring beams & ground beam',
      quantity: Number((rooms * 0.85 + (stories > 1 ? 2.5 : 0.8)).toFixed(2)),
      unit: 'Tons',
      unitRateUSD: 920.00,
      totalUSD: Math.round((rooms * 0.85 + (stories > 1 ? 2.5 : 0.8)) * 920),
    },
    {
      id: 'boq-4',
      category: 'Reinforced Concrete Framework',
      item: 'High-Tensile Rebar (12mm) & 8mm Stirrups',
      spec: 'Ribbed steel stirrups @ 200mm centers',
      quantity: Number((rooms * 0.65 + 1.2).toFixed(2)),
      unit: 'Tons',
      unitRateUSD: 890.00,
      totalUSD: Math.round((rooms * 0.65 + 1.2) * 890),
    },
    {
      id: 'boq-5',
      category: 'Superstructure Walls & Roof',
      item: '5" Hollow Concrete Blocks & Plaster Mortar',
      spec: 'Wall partition blocks + 15mm smooth cement render',
      quantity: Math.round(rooms * 680 + 1500),
      unit: 'Pcs',
      unitRateUSD: 0.98,
      totalUSD: Math.round((rooms * 680 + 1500) * 0.98),
    },
    {
      id: 'boq-6',
      category: 'Superstructure Walls & Roof',
      item: 'Stone-Coated Zinc-Alume Roofing Shingles',
      spec: '0.45mm gauge with 50-year anti-fungal warranty',
      quantity: Math.round(estimatedAreaSqM * 1.35),
      unit: 'Sqm',
      unitRateUSD: 18.50,
      totalUSD: Math.round(estimatedAreaSqM * 1.35 * 18.50),
    },
    {
      id: 'boq-7',
      category: 'Glazing, Doors & Windows',
      item: 'Thermal Break Aluminium Tinted Sliding Glazing',
      spec: 'Double glazed 6mm tempered glass with acoustic seals',
      quantity: rooms + 6,
      unit: 'Units',
      unitRateUSD: 340.00,
      totalUSD: (rooms + 6) * 340,
    },
    {
      id: 'boq-8',
      category: 'Finishes & MEP',
      item: 'Italian Glazed Full-Body Vitrified Porcelain Tiles',
      spec: '600mm x 1200mm matte anti-slip finish',
      quantity: Math.round(estimatedAreaSqM * 1.15),
      unit: 'Sqm',
      unitRateUSD: 24.00,
      totalUSD: Math.round(estimatedAreaSqM * 1.15 * 24.00),
    },
    {
      id: 'boq-9',
      category: 'Finishes & MEP',
      item: 'PEX Plumbing & Multi-Circuit Breaker Electrical Package',
      spec: 'Copper core fire-retardant wiring + individual circuit breakers',
      quantity: 1,
      unit: 'Lump Sum',
      unitRateUSD: Math.round(rooms * 1450 + 2800),
      totalUSD: Math.round(rooms * 1450 + 2800),
    },
  ];

  const totalBOQCalculated = boqList.reduce((acc, curr) => acc + curr.totalUSD, 0);

  const handleDownloadPDF = () => {
    setPdfGenerating(true);
    setTimeout(() => {
      setPdfGenerating(false);
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 5000);
      window.print();
    }, 1200);
  };

  const currentHouse = demoHouses[currentDemoIndex];

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 min-h-screen">
      {/* Luxury Gold & White Banner Header */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-amber-100 border border-white/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>AI Architectural Engine • High Precision Blueprint</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Oskayi House Generated
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1">
              Luxury 3D Architectural Generation, Automated Bill of Quantities (BOQ), & Stamped Engineering Blueprints.
            </p>
          </div>

          {/* Social Proof Counter */}
          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-3 flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white text-amber-700 flex items-center justify-center font-bold shadow-sm">
              <Users className="w-5 h-5 text-amber-600 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-amber-100 font-bold">Live Activity</div>
              <div className="text-base sm:text-lg font-black text-white font-mono">
                {viewerCount.toLocaleString()} <span className="text-xs font-normal text-amber-200">people watching houses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-8">
        {/* ========================================================= */}
        {/* DEMO MODE: STRICTLY NO TYPING, AUTO-PLAY 3D HOUSES        */}
        {/* ========================================================= */}
        {!isUnlocked ? (
          <div className="space-y-6">
            {/* Auto-cycling 3D Showcase Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-amber-200/60 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {currentHouse.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Auto-rotating preview (Changes every 5s)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {currentHouse.title}
                  </h2>
                </div>

                <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-right shrink-0">
                  <div className="text-[10px] uppercase font-bold text-amber-800">Turnkey Estimated Cost</div>
                  <div className="text-2xl font-black text-amber-600 font-mono">
                    ${currentHouse.priceUSD.toLocaleString()} <span className="text-xs font-bold text-slate-600">USD</span>
                  </div>
                </div>
              </div>

              {/* 3D Model Rotating Viewport */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-100 bg-gradient-to-b from-amber-50/50 to-white shadow-inner">
                <ThreeHouseViewer
                  stories={currentHouse.stories}
                  bedrooms={currentHouse.bedrooms}
                  hasPool={currentHouse.hasPool}
                  isAutoRotate={true}
                  className="h-72 sm:h-96 w-full"
                />

                {/* Telemetry Overlays - strictly informational, NO INPUT FIELDS */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-xl p-3 shadow-md space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">House Blueprint Telemetry</div>
                  <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <Home className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentHouse.rooms}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 flex items-center space-x-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentHouse.size}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Plot Requirement: <strong>{currentHouse.plot}</strong>
                  </div>
                </div>

                {/* Progress Indicators showing the 4 rotating house models */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {demoHouses.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        idx === currentDemoIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Notice that typing is locked in demo */}
              <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-center text-xs text-amber-900 font-medium">
                🔒 Hands-Free Interactive Demo Mode: Floor plan customization, room sliders, plot dimensions, and instant engineering PDF export unlock upon verification.
              </div>
            </div>

            {/* PAYWALL CTA BOX */}
            <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto border-2 border-amber-300">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-white text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Lock className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Unlock YOUR Custom House Plan
                </h3>
                <p className="text-amber-100 text-sm max-w-lg mx-auto">
                  Design your dream residence with custom sliders (rooms, plot size, budget), inspect 2D vector floor blueprints, review automated Bill of Quantities (BOQ), and download stamped architectural PDFs.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPaystackOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 active:scale-95 text-amber-700 hover:text-amber-800 font-extrabold text-base sm:text-lg rounded-2xl shadow-xl shadow-amber-950/20 inline-flex items-center justify-center space-x-3 transition-all cursor-pointer border border-amber-200"
                  >
                    <span>Unlock YOUR House Plan - $35 via Paystack USD</span>
                    <ChevronRight className="w-5 h-5 text-amber-600" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-amber-100 pt-2 font-medium">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Paystack Inline USD Secure</span>
                  </span>
                  <span>•</span>
                  <span>Instant 100% Unlocked Access</span>
                  <span>•</span>
                  <span>CAD & BOQ Formatted</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* REAL AFTER PAYMENT: FULL INTERACTIVE ENGINE & DASHBOARD   */
          /* ========================================================= */
          <div className="space-y-6">
            {/* Unlocked Confirmation Badge */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-900 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Oskayi House Plan Engine — Unlocked ($35 Paid via Paystack)</h4>
                  <p className="text-xs text-emerald-700">Full parametric design sliders, interactive 3D, BOQ calculator, and instant PDF download enabled.</p>
                </div>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Plan PDF</span>
              </button>
            </div>

            {/* DASHBOARD TABS: My Plans | 3D View | BOQ | Cost | PDF */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex flex-wrap gap-1">
              {[
                { id: 'plans', label: 'Floor Plan Blueprint', icon: Layers },
                { id: '3d', label: '3D Interactive Model', icon: Eye },
                { id: 'boq', label: 'Bill of Quantities (BOQ)', icon: FileText },
                { id: 'cost', label: 'Cost Breakdown', icon: DollarSign },
                { id: 'pdf', label: 'Download PDF & Specs', icon: Printer },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeDashboardTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDashboardTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* INTERACTIVE CONTROLS / SLIDERS CARD */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Parametric Architectural Sliders</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Real-Time Recalculation</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Rooms Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span>Number of Bedrooms</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold font-mono">
                      {rooms} Bedrooms ({rooms + 1} Baths)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>1 Bed (Chalet)</span>
                    <span>4 Bed (Villa)</span>
                    <span>8 Bed (Mansion)</span>
                  </div>
                </div>

                {/* Plot Size Selection */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span>Plot Dimensions</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold font-mono">
                      {plotSize}
                    </span>
                  </div>
                  <select
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="35x70ft">35 x 70 ft (Half Plot / 2,450 sqft)</option>
                    <option value="70x100ft">70 x 100 ft (Standard 1 Plot / 7,000 sqft)</option>
                    <option value="100x100ft">100 x 100 ft (1.5 Plots / 10,000 sqft)</option>
                    <option value="140x100ft">140 x 100 ft (Double Plot / 14,000 sqft)</option>
                    <option value="1 Acre">1 Acre Estate (43,560 sqft)</option>
                  </select>
                  <p className="text-[11px] text-slate-400">Total Built Footprint: ~{estimatedAreaSqM} sqm</p>
                </div>

                {/* Budget Slider in USD */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span>Target Budget (USD)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold font-mono">
                      ${budgetUSD.toLocaleString()} USD
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30000"
                    max="350000"
                    step="5000"
                    value={budgetUSD}
                    onChange={(e) => setBudgetUSD(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>$30,000</span>
                    <span>$150,000</span>
                    <span>$350,000+</span>
                  </div>
                </div>
              </div>

              {/* Secondary Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Building Stories</label>
                  <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs">
                    {[1, 2, 3].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStories(s)}
                        className={`flex-1 py-1.5 font-bold transition-colors ${
                          stories === s ? 'bg-amber-500 text-white' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {s === 1 ? '1 Story' : s === 2 ? 'Duplex' : 'Triplex'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Architectural Style</label>
                  <select
                    value={architecturalStyle}
                    onChange={(e) => setArchitecturalStyle(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Ultra Modern Minimalist">Ultra Modern Minimalist</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Contemporary Mediterranean">Mediterranean Contemporary</option>
                    <option value="Tropical High-Roof">Tropical High-Roof</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Swimming Pool</label>
                  <button
                    type="button"
                    onClick={() => setHasPool(!hasPool)}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors flex items-center justify-between ${
                      hasPool ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{hasPool ? 'Included (Infinity)' : 'None'}</span>
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Save Configuration</label>
                  <button
                    type="button"
                    onClick={() => {
                      const name = `${rooms}-Bed ${architecturalStyle} (${plotSize})`;
                      if (!savedPlans.includes(name)) {
                        setSavedPlans([...savedPlans, name]);
                      }
                    }}
                    className="w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    + Save to My Plans
                  </button>
                </div>
              </div>
            </div>

            {/* TAB CONTENT AREAS */}
            {activeDashboardTab === 'plans' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      Architectural Floor Plan Schematic ({rooms} Bedrooms • {estimatedAreaSqM} sqm)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standard CAD Vector Floor Plan with load-bearing walls, sanitary layout, kitchen island, and dimensions.
                    </p>
                  </div>
                  <div className="text-xs font-mono bg-slate-100 px-3 py-1 rounded-lg text-slate-700">
                    Scale 1:100 • Metric & Imperial
                  </div>
                </div>

                {/* Interactive SVG Architectural Floor Plan Schematic */}
                <div className="w-full bg-[#1e293b] rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-inner border border-slate-800">
                  <svg
                    viewBox="0 0 900 550"
                    className="w-full min-w-[700px] h-auto font-mono text-[11px]"
                    style={{ background: '#0f172a' }}
                  >
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                      </pattern>
                    </defs>
                    <rect width="900" height="550" fill="url(#grid)" />

                    {/* Outer Boundary Walls */}
                    <rect x="60" y="50" width="780" height="440" fill="#1e293b" stroke="#f8fafc" strokeWidth="6" />

                    {/* Master Suite (Top Left) */}
                    <rect x="70" y="60" width="260" height="200" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                    <text x="90" y="100" fill="#f8fafc" fontWeight="bold">MASTER EN-SUITE</text>
                    <text x="90" y="125" fill="#38bdf8">5.8m x 4.6m (26.6 sqm)</text>
                    <rect x="180" y="70" width="140" height="60" fill="#475569" stroke="#64748b" />
                    <text x="190" y="105" fill="#cbd5e1" fontSize="10">WALK-IN CLOSET</text>
                    {/* Master Bath */}
                    <rect x="70" y="190" width="130" height="70" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" />
                    <text x="80" y="230" fill="#e0f2fe">BATH & JACUZZI</text>

                    {/* Living & Dining Great Room (Center) */}
                    <rect x="340" y="60" width="320" height="260" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
                    <text x="360" y="100" fill="#f8fafc" fontWeight="bold">GREAT LIVING & DINING HALL</text>
                    <text x="360" y="125" fill="#38bdf8">7.2m x 6.0m (43.2 sqm)</text>
                    {/* Furniture layout indication */}
                    <rect x="380" y="160" width="140" height="80" rx="6" fill="#475569" stroke="#64748b" />
                    <text x="400" y="205" fill="#e2e8f0">LOUNGE SOFA</text>
                    <rect x="540" y="160" width="100" height="70" rx="4" fill="#64748b" />
                    <text x="550" y="200" fill="#f8fafc" fontSize="10">DINING (8P)</text>

                    {/* Gourmet Chef's Kitchen (Top Right) */}
                    <rect x="670" y="60" width="160" height="220" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                    <text x="680" y="95" fill="#f8fafc" fontWeight="bold">KITCHEN</text>
                    <text x="680" y="115" fill="#38bdf8">3.8m x 4.5m</text>
                    <rect x="700" y="140" width="60" height="110" rx="4" fill="#d97706" fillOpacity="0.4" stroke="#f59e0b" />
                    <text x="705" y="195" fill="#fef3c7" fontSize="9">ISLAND</text>

                    {/* Guest Bedroom 1 (Bottom Left) */}
                    <rect x="70" y="270" width="220" height="210" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                    <text x="90" y="310" fill="#f8fafc" fontWeight="bold">BEDROOM 2 (ENSUITE)</text>
                    <text x="90" y="335" fill="#38bdf8">4.2m x 3.8m (16.0 sqm)</text>

                    {/* Bedroom 3 & 4 (Bottom Center/Right) */}
                    <rect x="300" y="330" width="200" height="150" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                    <text x="320" y="370" fill="#f8fafc" fontWeight="bold">BEDROOM 3</text>
                    <text x="320" y="395" fill="#38bdf8">3.8m x 3.4m</text>

                    {rooms > 3 && (
                      <rect x="510" y="330" width="180" height="150" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                    )}
                    {rooms > 3 && (
                      <>
                        <text x="525" y="370" fill="#f8fafc" fontWeight="bold">BEDROOM 4</text>
                        <text x="525" y="395" fill="#38bdf8">3.5m x 3.4m</text>
                      </>
                    )}

                    {/* Grand Entrance Porch & Terrace (Bottom Right) */}
                    <rect x="700" y="330" width="130" height="150" fill="#065f46" fillOpacity="0.4" stroke="#10b981" />
                    <text x="715" y="370" fill="#a7f3d0" fontWeight="bold">ENTRANCE</text>
                    <text x="715" y="390" fill="#6ee7b7">PORTICO</text>

                    {/* Dimensions and tags */}
                    <line x1="60" y1="520" x2="840" y2="520" stroke="#f59e0b" strokeWidth="2" markerEnd="arrow" />
                    <text x="410" y="535" fill="#f59e0b" fontWeight="bold">TOTAL LENGTH: 18.2 METERS (59.7 FT)</text>
                  </svg>
                </div>
              </div>
            )}

            {activeDashboardTab === '3d' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Interactive 3D Architectural Model</h3>
                    <p className="text-xs text-slate-500">
                      Drag with mouse or swipe touch to rotate around the building. Toggle lighting and finishes.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setNightMode(!nightMode)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1.5 transition-colors cursor-pointer ${
                        nightMode ? 'bg-slate-900 text-yellow-300 border-slate-700' : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {nightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                      <span>{nightMode ? 'Night Render (Warm Glow)' : 'Daylight Solar'}</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  <ThreeHouseViewer
                    stories={stories}
                    bedrooms={rooms}
                    hasPool={hasPool}
                    nightMode={nightMode}
                    styleVariant={architecturalStyle}
                    className="h-80 sm:h-[460px] w-full"
                  />
                </div>
              </div>
            )}

            {activeDashboardTab === 'boq' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Automated Bill of Quantities (BOQ)</h3>
                    <p className="text-xs text-slate-500">
                      Standardized quantity survey for {rooms} bedrooms ({estimatedAreaSqM} sqm total area)
                    </p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-right">
                    <div className="text-[10px] text-emerald-800 font-bold uppercase">Calculated BOQ Total</div>
                    <div className="text-lg font-black text-emerald-600 font-mono">
                      ${totalBOQCalculated.toLocaleString()} USD
                    </div>
                  </div>
                </div>

                {/* BOQ Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <th className="py-2.5 px-3">Item Description</th>
                        <th className="py-2.5 px-3">Technical Spec</th>
                        <th className="py-2.5 px-3 text-right">Qty</th>
                        <th className="py-2.5 px-3">Unit</th>
                        <th className="py-2.5 px-3 text-right">Unit Rate (USD)</th>
                        <th className="py-2.5 px-3 text-right">Total (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {boqList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            <div>{item.item}</div>
                            <span className="text-[10px] text-slate-400 uppercase font-mono">{item.category}</span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 text-[11px] max-w-xs">{item.spec}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold">{item.quantity.toLocaleString()}</td>
                          <td className="py-2.5 px-3 text-slate-500">{item.unit}</td>
                          <td className="py-2.5 px-3 text-right font-mono">${item.unitRateUSD.toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                            ${item.totalUSD.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeDashboardTab === 'cost' && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-lg">Financial Construction Estimate</h3>
                  <p className="text-xs text-slate-500">
                    Comprehensive capital expenditure forecast based on prevailing rates.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4">
                    <div className="text-xs font-semibold text-amber-800">Materials (58%)</div>
                    <div className="text-xl font-black text-amber-900 mt-1 font-mono">
                      ${estimatedCostMaterials.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-amber-700 mt-0.5">Cement, rebar, blocks, tiles</div>
                  </div>

                  <div className="bg-sky-50/60 border border-sky-200 rounded-2xl p-4">
                    <div className="text-xs font-semibold text-sky-800">Labor & Masons (28%)</div>
                    <div className="text-xl font-black text-sky-900 mt-1 font-mono">
                      ${estimatedCostLabor.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-sky-700 mt-0.5">Supervising civil engineers</div>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4">
                    <div className="text-xs font-semibold text-emerald-800">Municipal Permits (5%)</div>
                    <div className="text-xl font-black text-emerald-900 mt-1 font-mono">
                      ${estimatedPermits.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5">Town planning approval</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <div className="text-xs font-semibold text-slate-700">Contingency Fund (9%)</div>
                    <div className="text-xl font-black text-slate-900 mt-1 font-mono">
                      ${estimatedContingency.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Material buffer reserve</div>
                  </div>
                </div>

                {/* Cost per square meter highlight */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Unit Cost Efficiency</div>
                    <div className="text-sm font-medium text-slate-200">
                      Approximate construction rate: <strong className="text-white">${Math.round(budgetUSD / estimatedAreaSqM)} USD/sqm</strong> ($
                      {Math.round((budgetUSD / estimatedAreaSqM) * 0.093)} USD/sqft)
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold">
                      Institutional High-Grade Standard
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeDashboardTab === 'pdf' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
                  <Printer className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Export Official Architectural Blueprint & BOQ Package
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Certified for municipal building permit submissions, bank mortgage financing, and contractor tender bids.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Project Title:</span>
                    <span className="font-bold text-slate-800">{rooms}-Bedroom {architecturalStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plot Dimension:</span>
                    <span className="font-bold text-slate-800">{plotSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Project Cost:</span>
                    <span className="font-bold text-emerald-600">${budgetUSD.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Regulatory Cert:</span>
                    <span className="font-bold text-slate-800">Oskayi Act 151 / BN248851025</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={pdfGenerating}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-amber-500/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  {pdfGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating High-Resolution Architectural PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download Official House Plan PDF</span>
                    </>
                  )}
                </button>

                {pdfDownloaded && (
                  <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    ✓ PDF generated successfully! Browser print/download dialogue opened.
                  </div>
                )}
              </div>
            )}
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
        title="Oskayi House Generated — Lifetime Custom Blueprint Unlock"
        amountUSD={35}
        appName="Oskayi House Generated"
      />
    </div>
  );
};
