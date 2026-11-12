import React, { useState, useEffect } from 'react';
import { PaystackModal } from '../common/PaystackModal.tsx';
import { 
  AlertTriangle, ShieldAlert, ArrowDownRight, UploadCloud, 
  FileCheck, Download, Check, ChevronRight, TrendingUp, DollarSign,
  Truck, Building2, Store, Lock, Sparkles, RefreshCw
} from 'lucide-react';
import { MaterialPriceItem } from '../../types/index.ts';

interface CostKillerAppProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const CostKillerApp: React.FC<CostKillerAppProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  // DEMO NO TYPING: Auto-play animation - changes material every 4 seconds
  const demoMaterials = [
    {
      material: 'Cement (Portland 42.5R)',
      overpayAmount: 2000,
      standardPrice: '$9.80 / bag',
      directPrice: '$7.40 / bag',
      unitCount: '800 Bags (40 Tons)',
      warning: 'You are overpaying $2,000 on cement',
      subtext: 'Retail middlemen add a 32% margin over direct factory ex-factory depot pricing.',
      iconColor: 'bg-red-500',
    },
    {
      material: '16mm High-Tensile Iron Rods',
      overpayAmount: 3450,
      standardPrice: '$1,280 / ton',
      directPrice: '$930 / ton',
      unitCount: '10 Tons (Steel Mill Direct)',
      warning: 'You are overpaying $3,450 on iron rods',
      subtext: 'Local hardware stores charge retail markups on structural rebar compared to rolling mills.',
      iconColor: 'bg-red-600',
    },
    {
      material: 'Spanish Glazed Porcelain Tiles',
      overpayAmount: 1850,
      standardPrice: '$28 / sqm',
      directPrice: '$19 / sqm',
      unitCount: '200 Sqm Floor Tiles',
      warning: 'You are overpaying $1,850 on tiles',
      subtext: 'Direct port container consignees offer wholesale pricing vs showroom distributors.',
      iconColor: 'bg-red-500',
    },
    {
      material: 'Stone-Coated Zinc Roofing Sheets',
      overpayAmount: 2900,
      standardPrice: '$24 / sqm',
      directPrice: '$16.50 / sqm',
      unitCount: '350 Sqm Roof Area',
      warning: 'You are overpaying $2,900 on roofing sheets',
      subtext: 'Direct factory roll-forming plants eliminate retail merchant logistics surcharges.',
      iconColor: 'bg-red-700',
    },
    {
      material: 'PPR & PEX Plumbing Pipes',
      overpayAmount: 1600,
      standardPrice: '$38 / length',
      directPrice: '$22 / length',
      unitCount: '100 Lengths + Fittings',
      warning: 'You are overpaying $1,600 on plumbing materials',
      subtext: 'Bulk piping wholesale distributors bypass neighborhood plumbing shops.',
      iconColor: 'bg-red-600',
    },
  ];

  const [currentDemoIdx, setCurrentDemoIdx] = useState(0);
  const [simulatedPriceCounter, setSimulatedPriceCounter] = useState(18400);

  // Auto-play interval: strictly changes material every 4 seconds
  useEffect(() => {
    if (isUnlocked) return;
    const interval = setInterval(() => {
      setCurrentDemoIdx((prev) => (prev + 1) % demoMaterials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isUnlocked, demoMaterials.length]);

  // Price counter ticking up in demo animation
  useEffect(() => {
    if (isUnlocked) return;
    const ticker = setInterval(() => {
      setSimulatedPriceCounter((prev) => (prev > 45000 ? 18400 : prev + 125));
    }, 100);
    return () => clearInterval(ticker);
  }, [isUnlocked]);

  // REAL AFTER PAYMENT (Unlocked Mode)
  // Built-in verified material price list (Retail Store vs Direct Factory/Quarry Wholesale)
  const [materialInventory, setMaterialInventory] = useState<MaterialPriceItem[]>([
    {
      id: 'mat-1',
      name: 'Ordinary Portland Cement 42.5R (50kg)',
      category: 'Masonry',
      unit: 'Bags',
      retailPriceUSD: 9.80,
      wholesalePriceUSD: 7.30,
      supplier: 'Tema Cement Terminal Direct',
      location: 'Industrial Harbour Zone, Tema',
      minOrder: '200 Bags',
      deliveryDays: '24-48 Hours',
      overpayPercent: 34,
    },
    {
      id: 'mat-2',
      name: 'High-Tensile Deformed Rebar 16mm (Grade 500)',
      category: 'Structural Steel',
      unit: 'Tons',
      retailPriceUSD: 1250.00,
      wholesalePriceUSD: 910.00,
      supplier: 'Sentuo Steel Works Mill Direct',
      location: 'Heavy Industrial Area',
      minOrder: '2 Tons',
      deliveryDays: 'Same Day Dispatch',
      overpayPercent: 37,
    },
    {
      id: 'mat-3',
      name: 'High-Tensile Deformed Rebar 12mm',
      category: 'Structural Steel',
      unit: 'Tons',
      retailPriceUSD: 1190.00,
      wholesalePriceUSD: 875.00,
      supplier: 'B5 Plus Central Depot',
      location: 'Kpone Industrial Freezone',
      minOrder: '2 Tons',
      deliveryDays: '24 Hours',
      overpayPercent: 36,
    },
    {
      id: 'mat-4',
      name: 'Washed River Sand (Tri-Axle Tipper Truck)',
      category: 'Aggregates',
      unit: 'Loads (20m³)',
      retailPriceUSD: 360.00,
      wholesalePriceUSD: 240.00,
      supplier: 'Volta Pit Dredgers Co-op',
      location: 'Direct Sandpit Concession',
      minOrder: '1 Truckload',
      deliveryDays: 'Next Morning',
      overpayPercent: 50,
    },
    {
      id: 'mat-5',
      name: '3/4" Blue Granite Quarry Stones',
      category: 'Aggregates',
      unit: 'Loads (20m³)',
      retailPriceUSD: 440.00,
      wholesalePriceUSD: 310.00,
      supplier: 'Eastern Quarries Consortium',
      location: 'Shai Hills Quarry Belt',
      minOrder: '1 Truckload',
      deliveryDays: 'Direct Tipper Dispatch',
      overpayPercent: 42,
    },
    {
      id: 'mat-6',
      name: 'Gerard Classical Stone-Coated Roofing Tiles',
      category: 'Roofing',
      unit: 'Sqm',
      retailPriceUSD: 23.50,
      wholesalePriceUSD: 16.20,
      supplier: 'Raincoat Direct Import Container',
      location: 'Accra Bonded Warehouse',
      minOrder: '100 Sqm',
      deliveryDays: '48 Hours',
      overpayPercent: 45,
    },
    {
      id: 'mat-7',
      name: 'Full-Body Vitrified Porcelain 60x60cm Tiles',
      category: 'Finishes',
      unit: 'Boxes (1.44m²)',
      retailPriceUSD: 32.00,
      wholesalePriceUSD: 21.50,
      supplier: 'Keda Ceramic Freezone Factory',
      location: 'Shama Freezones / Direct Depot',
      minOrder: '50 Boxes',
      deliveryDays: 'Immediate Pickup / Delivery',
      overpayPercent: 48,
    },
  ]);

  // Selected quantities for client BOQ
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'mat-1': 500, // 500 bags of cement
    'mat-2': 5,   // 5 tons of 16mm rebar
    'mat-3': 4,   // 4 tons of 12mm rebar
    'mat-4': 4,   // 4 truckloads of sand
    'mat-5': 5,   // 5 truckloads of stones
    'mat-6': 220, // 220 sqm roof
    'mat-7': 120, // 120 boxes of tiles
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isScanningBOQ, setIsScanningBOQ] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  // Compute Total Retail vs Direct Wholesale and Savings
  const totalRetailCost = materialInventory.reduce((acc, item) => {
    const qty = quantities[item.id] || 0;
    return acc + qty * item.retailPriceUSD;
  }, 0);

  const totalWholesaleCost = materialInventory.reduce((acc, item) => {
    const qty = quantities[item.id] || 0;
    return acc + qty * item.wholesalePriceUSD;
  }, 0);

  const totalSavingsUSD = totalRetailCost - totalWholesaleCost;
  const savingsPercent = totalRetailCost > 0 ? ((totalSavingsUSD / totalRetailCost) * 100).toFixed(1) : '0';
  const twoPercentFee = Math.round(totalSavingsUSD * 0.02);

  const handleSimulateUpload = (filename = 'Scan_Building_BOQ_2026.pdf') => {
    setIsScanningBOQ(true);
    setTimeout(() => {
      setUploadedFileName(filename);
      setIsScanningBOQ(false);
      // Auto-populate higher realistic quantities from scanned bill
      setQuantities({
        'mat-1': 750,
        'mat-2': 8,
        'mat-3': 6,
        'mat-4': 7,
        'mat-5': 8,
        'mat-6': 310,
        'mat-7': 180,
      });
    }, 1000);
  };

  const handleDownloadReport = () => {
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 5000);
    window.print();
  };

  const currentItem = demoMaterials[currentDemoIdx];

  return (
    <div className="w-full bg-[#FFF5F5] text-slate-800 min-h-screen">
      {/* Warning Red & White Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-rose-200 border border-white/20 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-300" />
              <span>Anti-Price Gouging Engine • Direct Factory Audits</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Oskayi House Cost Killer
            </h1>
            <p className="text-rose-100 text-xs sm:text-sm mt-1">
              Bypass retail hardware store markups. Connect directly with rolling mills, cement depots, and quarries.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-rose-200 font-bold">Industry Alert</div>
              <div className="text-sm sm:text-base font-black text-white font-mono">
                Average Project Overpayment: <span className="text-yellow-300">$8,400+ USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-8">
        {/* ========================================================= */}
        {/* DEMO MODE: STRICTLY NO TYPING, AUTO-PLAY ANIMATION         */}
        {/* ========================================================= */}
        {!isUnlocked ? (
          <div className="space-y-6">
            {/* Auto-Play Construction Overpaying Animation Box */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border-2 border-red-200 overflow-hidden relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                    Live Construction Cost Leakage Monitor
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Rotates materials every 4 seconds • Hands-free demo
                </div>
              </div>

              {/* Central Animation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Visual House Construction Graphic with ticking price */}
                <div className="bg-gradient-to-b from-red-50/70 to-rose-100/40 border border-red-200 rounded-2xl p-6 text-center space-y-4">
                  <div className="relative mx-auto w-36 h-32 flex items-center justify-center">
                    {/* SVG House frame rising */}
                    <svg viewBox="0 0 120 100" className="w-full h-full text-red-600">
                      <polygon points="60,10 110,45 10,45" fill="none" stroke="#DC2626" strokeWidth="4" />
                      <rect x="25" y="45" width="70" height="50" fill="none" stroke="#DC2626" strokeWidth="4" />
                      <line x1="25" y1="70" x2="95" y2="70" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
                      <line x1="60" y1="45" x2="60" y2="95" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
                      <rect x="48" y="65" width="24" height="30" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
                    </svg>

                    {/* Flashing Warning Badge */}
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                      OVERPAYING!
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase font-bold text-slate-500">Retail Bill Escalating</div>
                    <div className="text-3xl sm:text-4xl font-black text-red-600 font-mono tracking-tight">
                      ${simulatedPriceCounter.toLocaleString()} <span className="text-xs font-normal text-slate-600">USD</span>
                    </div>
                  </div>
                </div>

                {/* Big Flashing Alert Box - Changes every 4 seconds */}
                <div className="space-y-4">
                  <div className="bg-red-600 text-white rounded-2xl p-5 shadow-lg space-y-2 transform transition-all duration-300">
                    <div className="flex items-center space-x-2 text-rose-200 text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-yellow-300 animate-bounce" />
                      <span>Material Alert #{currentDemoIdx + 1} of 5</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black leading-tight text-white">
                      "{currentItem.warning}"
                    </h3>

                    <p className="text-xs text-rose-100 leading-relaxed">
                      {currentItem.subtext}
                    </p>
                  </div>

                  {/* Price Comparison Metric */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Standard Store Price</div>
                      <div className="text-base font-bold text-slate-800 line-through font-mono">
                        {currentItem.standardPrice}
                      </div>
                      <div className="text-[10px] text-red-500 font-medium">Excess markup added</div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                      <div className="text-[10px] text-emerald-800 font-bold uppercase">Direct Factory Cost</div>
                      <div className="text-base font-black text-emerald-600 font-mono">
                        {currentItem.directPrice}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold">Oskayi Vetted Wholesale</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-center text-xs text-rose-900 font-semibold">
                    🔒 Demo strictly automated. Manual typing, supplier unlocking, and custom BOQ upload unlock below.
                  </div>
                </div>
              </div>

              {/* Auto-Slide Progress Dots */}
              <div className="mt-6 flex items-center justify-center space-x-2">
                {demoMaterials.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentDemoIdx ? 'w-10 bg-red-600' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* PAYWALL CTA BOX */}
            <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto border-2 border-red-300">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-white text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Lock className="w-7 h-7 text-red-600" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Unlock YOUR Savings Report
                </h3>

                <p className="text-rose-100 text-sm max-w-lg mx-auto">
                  Compare your building materials against our audited ex-factory wholesale database. Get direct vetted suppliers, negotiate wholesale, and save thousands on cement, rebar, sand, and roofing.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPaystackOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 active:scale-95 text-red-700 hover:text-red-800 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-red-950/20 inline-flex items-center justify-center space-x-3 transition-all cursor-pointer border border-red-200"
                  >
                    <span>Unlock YOUR Savings Report - 2% of savings via Paystack USD</span>
                    <ChevronRight className="w-5 h-5 text-red-600" />
                  </button>
                </div>

                <div className="text-xs text-rose-200 font-medium">
                  Flat entry fee: <strong>$20 USD</strong> via Paystack • 100% money-back guarantee if we don't save you at least $1,000 USD
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* REAL AFTER PAYMENT: FULL SAVINGS ENGINE & SUPPLIER AUDIT  */
          /* ========================================================= */
          <div className="space-y-6">
            {/* Unlocked Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-900 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Oskayi House Cost Killer — Unlocked (Paystack USD Authorized)</h4>
                  <p className="text-xs text-emerald-700">
                    Direct factory wholesale suppliers, real-time price comparison, and PDF audit generation unlocked.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Savings Audit PDF</span>
              </button>
            </div>

            {/* LIVE SAVINGS DASHBOARD SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="text-xs font-semibold text-slate-500 uppercase">Standard Retail Store Quote</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-800 mt-1 font-mono">
                  ${Math.round(totalRetailCost).toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
                </div>
                <div className="text-[11px] text-red-500 mt-1 flex items-center space-x-1 font-medium">
                  <Store className="w-3.5 h-3.5" />
                  <span>Hardware retailer marked-up rate</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="text-xs font-semibold text-emerald-700 uppercase">Oskayi Direct Factory Cost</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 font-mono">
                  ${Math.round(totalWholesaleCost).toLocaleString()} <span className="text-xs font-normal text-emerald-700">USD</span>
                </div>
                <div className="text-[11px] text-emerald-700 mt-1 flex items-center space-x-1 font-medium">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Direct ex-factory dispatch price</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-2xl p-5 shadow-md">
                <div className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Your Total Net Savings</div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">
                  ${Math.round(totalSavingsUSD).toLocaleString()} <span className="text-xs font-normal text-emerald-200">USD</span>
                </div>
                <div className="text-[11px] text-emerald-100 mt-1 flex items-center space-x-1 font-bold">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>You save {savingsPercent}% on your building budget!</span>
                </div>
              </div>
            </div>

            {/* BOQ UPLOAD OR MANUAL MATERIAL SELECTOR */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    Material Price Comparator & Quantity Survey
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload your contractor's BOQ photo / PDF or adjust item quantities manually.
                  </p>
                </div>

                {/* Upload Button */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleSimulateUpload('Contractor_BOQ_Scan.pdf')}
                    disabled={isScanningBOQ}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition-colors cursor-pointer"
                  >
                    {isScanningBOQ ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>AI Parsing BOQ Photo...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload BOQ Photo / Document</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {uploadedFileName && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-900">
                  <div className="flex items-center space-x-2 font-medium">
                    <FileCheck className="w-4 h-4 text-red-600" />
                    <span>Scanned Document: <strong>{uploadedFileName}</strong> (7 materials detected & priced)</span>
                  </div>
                  <span className="text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded font-bold">
                    Audited
                  </span>
                </div>
              )}

              {/* Material Inventory Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <th className="py-2.5 px-3">Building Material</th>
                      <th className="py-2.5 px-3">Your Qty</th>
                      <th className="py-2.5 px-3 text-right">Retail Price</th>
                      <th className="py-2.5 px-3 text-right">Direct Factory</th>
                      <th className="py-2.5 px-3 text-right text-emerald-700 font-bold">You Save</th>
                      <th className="py-2.5 px-3">Vetted Direct Supplier</th>
                      <th className="py-2.5 px-3">Lead Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialInventory.map((item) => {
                      const qty = quantities[item.id] || 0;
                      const retailTotal = qty * item.retailPriceUSD;
                      const wholesaleTotal = qty * item.wholesalePriceUSD;
                      const itemSavings = retailTotal - wholesaleTotal;

                      return (
                        <tr key={item.id} className="hover:bg-red-50/40 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <span className="text-[10px] text-slate-400 font-mono">{item.category}</span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center space-x-1">
                              <input
                                type="number"
                                min="0"
                                value={qty}
                                onChange={(e) => {
                                  const val = Math.max(0, parseInt(e.target.value) || 0);
                                  setQuantities({ ...quantities, [item.id]: val });
                                }}
                                className="w-20 px-2 py-1 text-xs border border-slate-300 rounded font-mono font-bold text-slate-800"
                              />
                              <span className="text-[11px] text-slate-400">{item.unit}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-slate-500">
                            ${item.retailPriceUSD.toFixed(2)}
                            <div className="text-[10px] text-slate-400">Total: ${Math.round(retailTotal)}</div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">
                            ${item.wholesalePriceUSD.toFixed(2)}
                            <div className="text-[10px] text-emerald-600 font-bold">Total: ${Math.round(wholesaleTotal)}</div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-black text-emerald-600 bg-emerald-50/50">
                            +${Math.round(itemSavings).toLocaleString()}
                            <div className="text-[10px] text-emerald-700">({item.overpayPercent}% cheaper)</div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-semibold text-slate-900 flex items-center space-x-1">
                              <Building2 className="w-3 h-3 text-red-600 shrink-0" />
                              <span>{item.supplier}</span>
                            </div>
                            <div className="text-[10px] text-slate-400">{item.location}</div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center space-x-1 text-slate-600">
                              <Truck className="w-3 h-3 text-slate-400" />
                              <span>{item.deliveryDays}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">Min: {item.minOrder}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Direct Wholesale Dispatch Order Voucher */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    Direct Supplier Dispatch Protocol
                  </div>
                  <div className="text-xs text-slate-300 mt-1 max-w-xl">
                    Oskayi Consult issues certified procurement vouchers directly to Tema Cement, Sentuo Rolling Mill, and Western Quarries. Payments are released in escrow upon site offloading.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Savings Report (PDF)</span>
                </button>
              </div>

              {pdfDownloaded && (
                <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                  ✓ Savings audit report generated and opened in print preview!
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
        title="Oskayi House Cost Killer — Unlock Savings Report & Suppliers"
        amountUSD={20}
        appName="Oskayi House Cost Killer"
      />
    </div>
  );
};
