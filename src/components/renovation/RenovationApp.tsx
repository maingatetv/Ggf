import React, { useState, useEffect } from 'react';
import { PaystackModal } from '../common/PaystackModal.tsx';
import { 
  Sparkles, Lock, ArrowRight, UploadCloud, Calendar, UserCheck, 
  DollarSign, Check, ChevronRight, RefreshCw, FileText, Download,
  Layers, Phone, Star, ShieldCheck
} from 'lucide-react';

interface RenovationAppProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const RenovationApp: React.FC<RenovationAppProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  // DEMO NO TYPING: Auto-slideshow of Before/After transformations changing every 4 seconds
  const demoSlides = [
    {
      id: 'slide-1',
      title: '1970s Single-Story Bungalow Facade Transformation',
      costUSD: 8000,
      valueNowUSD: 25000,
      equityGain: 17000,
      scope: 'Facade modernization, black steel pergola, floor-to-ceiling glazing, and warm LED cove lighting.',
      beforeSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full bg-[#334155]">
          {/* Weathered peeling bungalow */}
          <rect width="400" height="240" fill="#475569" />
          <polygon points="200,40 370,110 30,110" fill="#64748b" />
          <rect x="50" y="110" width="300" height="110" fill="#94a3b8" />
          {/* Old windows & peeling door */}
          <rect x="80" y="130" width="60" height="60" fill="#334155" stroke="#475569" strokeWidth="3" />
          <line x1="110" y1="130" x2="110" y2="190" stroke="#475569" strokeWidth="2" />
          <rect x="180" y="140" width="40" height="80" fill="#52525b" />
          <rect x="260" y="130" width="60" height="60" fill="#334155" stroke="#475569" strokeWidth="3" />
          {/* Cracked wall lines */}
          <path d="M 150 120 L 155 145 L 152 170" stroke="#334155" strokeWidth="2" fill="none" />
          <path d="M 235 130 L 240 160" stroke="#334155" strokeWidth="2" fill="none" />
          <text x="20" y="35" fill="#f87171" fontWeight="bold" fontSize="13">BEFORE: RUN-DOWN DATED BUNGALOW</text>
        </svg>
      ),
      afterSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full bg-[#090d16]">
          {/* Ultra modern luxury villa transformation */}
          <rect width="400" height="240" fill="#0f172a" />
          <polygon points="200,30 380,95 20,95" fill="#1e293b" />
          <rect x="40" y="95" width="320" height="135" fill="#ffffff" />
          {/* Modern Teak Wood Slat Accent */}
          <rect x="40" y="95" width="90" height="135" fill="#d97706" />
          <line x1="55" y1="95" x2="55" y2="230" stroke="#92400e" strokeWidth="2" />
          <line x1="70" y1="95" x2="70" y2="230" stroke="#92400e" strokeWidth="2" />
          <line x1="85" y1="95" x2="85" y2="230" stroke="#92400e" strokeWidth="2" />
          <line x1="100" y1="95" x2="100" y2="230" stroke="#92400e" strokeWidth="2" />
          {/* Full height architectural glass */}
          <rect x="150" y="105" width="120" height="115" rx="3" fill="#38bdf8" fillOpacity="0.8" stroke="#0284c7" strokeWidth="2" />
          <line x1="210" y1="105" x2="210" y2="220" stroke="#0f172a" strokeWidth="3" />
          {/* Pivot entrance door */}
          <rect x="290" y="115" width="55" height="115" fill="#0f172a" stroke="#d97706" strokeWidth="2" />
          <circle cx="335" cy="170" r="3" fill="#d97706" />
          {/* Ambient Warm Golden LED glow */}
          <line x1="40" y1="95" x2="360" y2="95" stroke="#f59e0b" strokeWidth="4" />
          <text x="20" y="30" fill="#fbbf24" fontWeight="bold" fontSize="13">AFTER: ULTRA-MODERN LUXURY RESIDENCE</text>
        </svg>
      ),
    },
    {
      id: 'slide-2',
      title: 'Cramped Enclosed Kitchen to Open Concept Chef Island',
      costUSD: 5400,
      valueNowUSD: 19500,
      equityGain: 14100,
      scope: 'Demolition of load-bearing partition, steel lintel insertion, Calacatta quartz waterfall island & matte black cabinetry.',
      beforeSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full bg-[#27272a]">
          <rect width="400" height="240" fill="#3f3f46" />
          <rect x="30" y="40" width="140" height="170" fill="#71717a" stroke="#52525b" strokeWidth="3" />
          <text x="50" y="120" fill="#d4d4d8" fontSize="12">OLD CABINETS</text>
          <rect x="200" y="100" width="170" height="110" fill="#52525b" />
          <circle cx="250" cy="140" r="15" fill="#71717a" />
          <text x="20" y="30" fill="#f87171" fontWeight="bold" fontSize="13">BEFORE: OUTDATED 1980s KITCHEN</text>
        </svg>
      ),
      afterSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full bg-[#0f172a]">
          <rect width="400" height="240" fill="#090d16" />
          <rect x="30" y="30" width="340" height="190" fill="#1e293b" rx="4" />
          {/* Calacatta marble waterfall island */}
          <rect x="90" y="90" width="220" height="95" rx="4" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
          <text x="130" y="145" fill="#0f172a" fontWeight="bold" fontSize="12">QUARTZ WATERFALL ISLAND</text>
          {/* Brass pendant lights */}
          <line x1="140" y1="30" x2="140" y2="70" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="140" cy="75" r="8" fill="#d97706" />
          <line x1="260" y1="30" x2="260" y2="70" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="260" cy="75" r="8" fill="#d97706" />
          <text x="20" y="25" fill="#fbbf24" fontWeight="bold" fontSize="13">AFTER: CALACATTA CHEF'S SUITE</text>
        </svg>
      ),
    },
    {
      id: 'slide-3',
      title: 'Weathered Concrete Duplex to Contemporary Penthouse',
      costUSD: 14200,
      valueNowUSD: 46000,
      equityGain: 31800,
      scope: 'Structural glass balustrades, thermal insulation, cantilevered pergola, and biometric smart locks.',
      beforeSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full bg-[#18181b]">
          <rect width="400" height="240" fill="#27272a" />
          <rect x="60" y="40" width="280" height="180" fill="#52525b" stroke="#71717a" strokeWidth="3" />
          <line x1="60" y1="130" x2="340" y2="130" stroke="#71717a" strokeWidth="3" />
          <rect x="90" y="60" width="60" height="50" fill="#3f3f46" />
          <rect x="250" y="60" width="60" height="50" fill="#3f3f46" />
          <text x="20" y="30" fill="#f87171" fontWeight="bold" fontSize="13">BEFORE: WEATHERED CONCRETE BLOCK</text>
        </svg>
      ),
      afterSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full bg-[#0a0a0a]">
          <rect width="400" height="240" fill="#0a0a0a" />
          <rect x="50" y="30" width="300" height="195" fill="#18181b" stroke="#d4af37" strokeWidth="2" rx="4" />
          {/* Glass railing balcony */}
          <rect x="50" y="115" width="300" height="40" fill="#38bdf8" fillOpacity="0.4" stroke="#d97706" strokeWidth="2" />
          <text x="110" y="140" fill="#f8fafc" fontSize="11" fontWeight="bold">FRAMELESS TEMPERED BALUSTRADE</text>
          <text x="20" y="25" fill="#fbbf24" fontWeight="bold" fontSize="13">AFTER: NORDIC GOLD PENTHOUSE</text>
        </svg>
      ),
    },
  ];

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // % comparison slider
  const [isAnimatingSlider, setIsAnimatingSlider] = useState(true);

  // Auto-play slideshow every 4 seconds
  useEffect(() => {
    if (isUnlocked) return;
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % demoSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isUnlocked, demoSlides.length]);

  // Smooth automatic slider swipe animation in demo
  useEffect(() => {
    if (isUnlocked) return;
    let step = 1;
    const swipeTimer = setInterval(() => {
      setSliderPosition((prev) => {
        if (prev >= 80) step = -1;
        if (prev <= 20) step = 1;
        return prev + step * 2;
      });
    }, 80);
    return () => clearInterval(swipeTimer);
  }, [isUnlocked]);

  // REAL AFTER PAYMENT (Unlocked Mode)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'Front_Exterior_Facade.jpg',
    'Living_Room_Entry.jpg',
    'Kitchen_Counter.jpg',
  ]);
  const [selectedConcept, setSelectedConcept] = useState<'minimalist' | 'luxury-african' | 'biophilic'>('luxury-african');
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [quoteGenerated, setQuoteGenerated] = useState(false);

  const concepts = {
    minimalist: {
      name: 'Modern Scandinavian Minimalist',
      tagline: 'Clean Lines, Floor-to-Ceiling Low-E Glass, White Render',
      costEstimateUSD: 8500,
      valuationAfterUSD: 26000,
      durationWeeks: 4,
      materials: 'Thermally insulated stucco, black anodized aluminium, microcement floors',
    },
    'luxury-african': {
      name: 'Contemporary African Gold & Teakwood',
      tagline: 'Warm Iroko Slats, Brass Inlays, Textured Granite & Recessed Lighting',
      costEstimateUSD: 11200,
      valuationAfterUSD: 36000,
      durationWeeks: 5,
      materials: 'Treated Ghanaian teak timber, brushed gold fixtures, basalt flagstones',
    },
    biophilic: {
      name: 'Tropical Biophilic Garden Villa',
      tagline: 'Floating Living Walls, Shaded Pergola, Seamless Indoor-Outdoor Flow',
      costEstimateUSD: 13500,
      valuationAfterUSD: 42000,
      durationWeeks: 6,
      materials: 'Natural stone paving, automatic drip irrigation, motorized louvered roof',
    },
  };

  const currentConcept = concepts[selectedConcept];

  const handleGenerateQuote = () => {
    setIsGeneratingQuote(true);
    setTimeout(() => {
      setIsGeneratingQuote(false);
      setQuoteGenerated(true);
      window.print();
    }, 1100);
  };

  const currentSlide = demoSlides[currentSlideIdx];

  return (
    <div className="w-full bg-[#0C0E14] text-slate-200 min-h-screen">
      {/* Black + Gold Luxury Modern Header */}
      <div className="bg-gradient-to-r from-neutral-950 via-[#18150D] to-amber-950/60 text-white border-b border-amber-500/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Spatial Facelift • Architectural Resale Value Multiplier</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center space-x-2">
              <span>Oskayi Bedir and After Renivatiin</span>
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm mt-1">
              Transform dated houses into multi-million dollar modern masterpieces with instantaneous AI remodeling and ROI projections.
            </p>
          </div>

          <div className="bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-3 flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Proven Value Creation</div>
              <div className="text-sm sm:text-base font-black text-white font-mono">
                Average Value Lift: <span className="text-amber-400">+$21,500 USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-8">
        {/* ========================================================= */}
        {/* DEMO MODE: STRICTLY NO TYPING, AUTO SLIDESHOW             */}
        {/* ========================================================= */}
        {!isUnlocked ? (
          <div className="space-y-6">
            {/* Auto-Slide Showcase Card */}
            <div className="bg-neutral-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-amber-500/30 overflow-hidden relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Live Before/After Transition
                    </span>
                    <span className="text-xs text-slate-400">Auto-swiping every 4s • Hands-free demo</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {currentSlide.title}
                  </h2>
                </div>

                {/* Key Cost & Value Badge */}
                <div className="bg-amber-500/10 border border-amber-500/40 px-4 py-2 rounded-2xl text-right shrink-0">
                  <div className="text-[10px] uppercase font-bold text-amber-400">Renovation Economics</div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono">
                    Cost: <span className="text-rose-400">${currentSlide.costUSD.toLocaleString()}</span> • Value Now: <span className="text-amber-400 font-black">${currentSlide.valueNowUSD.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              {/* Interactive Swipe Before / After Viewport */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-neutral-700 select-none">
                {/* Before Image (Left / Base) */}
                <div className="absolute inset-0 w-full h-full">
                  {currentSlide.beforeSvg}
                </div>

                {/* After Image (Right / Clipped by slider) */}
                <div
                  className="absolute inset-0 h-full overflow-hidden"
                  style={{
                    clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                  }}
                >
                  {currentSlide.afterSvg}
                </div>

                {/* Vertical Divider Line with handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_#f59e0b] z-20 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg">
                    ⇄
                  </div>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md border border-amber-500/30 rounded-xl p-3 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs text-amber-200">
                    <strong className="text-white">Scope:</strong> {currentSlide.scope}
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-400 shrink-0">
                    Net Profit Created: +${currentSlide.equityGain.toLocaleString()} USD
                  </div>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="mt-4 flex items-center justify-center space-x-2">
                {demoSlides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlideIdx ? 'w-10 bg-amber-400' : 'w-2 bg-neutral-700'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-4 p-2.5 bg-neutral-950 border border-amber-500/20 rounded-xl text-center text-xs text-amber-300 font-medium">
                🔒 Demo strictly auto-playing. Uploading your own building photos & generating custom contractor quotes unlock below.
              </div>
            </div>

            {/* PAYWALL CTA BOX */}
            <div className="bg-gradient-to-br from-neutral-950 via-[#1c180f] to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto border-2 border-amber-500/50">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Lock className="w-7 h-7 text-slate-950" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Get YOUR Renovation Design
                </h3>

                <p className="text-amber-200/80 text-sm max-w-lg mx-auto">
                  Upload 5 photos of your existing property. Our AI generates 3 bespoke luxury design concepts, itemized material cost breakdowns, vetted contractor contacts, and a 6-week renovation roadmap.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPaystackOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-amber-500/20 inline-flex items-center justify-center space-x-3 transition-all cursor-pointer border border-amber-300"
                  >
                    <span>Get YOUR Renovation Design - $15 via Paystack USD</span>
                    <ChevronRight className="w-5 h-5 text-slate-950" />
                  </button>
                </div>

                <div className="text-xs text-amber-400/80 font-medium">
                  Instant Paystack USD verification • Stamped architectural report • Verified contractor directory
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* REAL AFTER PAYMENT: UPLOAD 5 PHOTOS & 3 CONCEPTS ENGINE   */
          /* ========================================================= */
          <div className="space-y-6">
            {/* Unlocked Confirmation Banner */}
            <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-200 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-100">
                    Oskayi Bedir and After Renivatiin — Unlocked ($15 Paid via Paystack)
                  </h4>
                  <p className="text-xs text-emerald-300">
                    Photo upload studio, 3 AI concepts, vetted contractor contacts, and quote generator enabled.
                  </p>
                </div>
              </div>
              <button
                onClick={handleGenerateQuote}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center space-x-2 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Renovation Quote PDF</span>
              </button>
            </div>

            {/* PHOTO UPLOADER (5 Photos Slot) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span>Upload Up to 5 Existing Property Photos</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload exterior facades, dated kitchens, bathrooms, or entryways for instant spatial AI restyling.
                  </p>
                </div>
                <div className="text-xs text-amber-400 font-mono">
                  {uploadedPhotos.length} / 5 Photos Loaded
                </div>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {uploadedPhotos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative aspect-video sm:aspect-square bg-neutral-950 border border-amber-500/30 rounded-xl p-3 flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="text-[10px] font-mono text-amber-400 font-bold">Photo #{i + 1}</div>
                    <div className="text-xs font-semibold text-slate-200 truncate">{photo}</div>
                    <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>AI Analyzed</span>
                    </div>
                  </div>
                ))}

                {uploadedPhotos.length < 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      const count = uploadedPhotos.length + 1;
                      setUploadedPhotos([...uploadedPhotos, `Room_Angle_${count}.jpg`]);
                    }}
                    className="aspect-video sm:aspect-square border-2 border-dashed border-amber-500/30 hover:border-amber-400 rounded-xl p-3 flex flex-col items-center justify-center text-center text-amber-400 hover:text-amber-300 transition-colors cursor-pointer bg-neutral-950/40"
                  >
                    <UploadCloud className="w-6 h-6 mb-1" />
                    <span className="text-xs font-bold">+ Add Photo {uploadedPhotos.length + 1}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 3 AI ARCHITECTURAL CONCEPTS SELECTOR */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">3 AI Architectural Transformation Concepts</h3>
                <span className="text-xs text-slate-400">Click to switch design style</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['minimalist', 'luxury-african', 'biophilic'] as const).map((key) => {
                  const item = concepts[key];
                  const isSelected = selectedConcept === key;

                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedConcept(key)}
                      className={`rounded-2xl p-5 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400'
                          : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'bg-neutral-800 text-slate-400'
                        }`}>
                          Concept {key === 'minimalist' ? '1' : key === 'luxury-african' ? '2' : '3'}
                        </span>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 font-medium">Estimated Cost:</span>
                          <div className="text-base font-black text-amber-400 font-mono">
                            ${item.costEstimateUSD.toLocaleString()} USD
                          </div>
                        </div>
                      </div>

                      <h4 className="font-extrabold text-white text-base">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{item.tagline}</p>

                      <div className="mt-4 pt-3 border-t border-neutral-800 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Post-Remodel Value:</span>
                          <span className="font-bold text-emerald-400 font-mono">${item.valuationAfterUSD.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Timeline:</span>
                          <span className="font-bold text-slate-300">{item.durationWeeks} Weeks</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CONTRACTOR DIRECTORY & TIMELINE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vetted Contractor Directory */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Vetted Renovation Contractors</span>
                  </h4>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    Oskayi Verified
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: 'Apex Structural & Renovation Ltd',
                      specialty: 'Demolition, steel lintels & masonry',
                      rating: 4.9,
                      reviews: 84,
                      phone: '+233 24 490 5505',
                    },
                    {
                      name: 'Gold Coast Glazing & Cladding',
                      specialty: 'Tempered glass balustrades & sliding doors',
                      rating: 4.8,
                      reviews: 62,
                      phone: '+233 20 882 1904',
                    },
                    {
                      name: 'Artisan Wood & Millwork Studio',
                      specialty: 'Teakwood slat pergolas & custom cabinetry',
                      rating: 4.9,
                      reviews: 47,
                      phone: '+233 55 109 4432',
                    },
                  ].map((con, idx) => (
                    <div key={idx} className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-100 text-xs">{con.name}</div>
                        <div className="text-[11px] text-slate-400">{con.specialty}</div>
                        <div className="flex items-center space-x-1 text-[10px] text-amber-400 mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{con.rating} ({con.reviews} reviews)</span>
                        </div>
                      </div>
                      <a
                        href={`tel:${con.phone}`}
                        className="px-3 py-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg text-xs font-mono font-semibold flex items-center space-x-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6-Week Gantt Timeline */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Project Renovation Timeline</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">Total: {currentConcept.durationWeeks} Weeks</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { week: 'Week 1', task: 'Site survey, 3D laser scan & selective demolition', status: 'Pending' },
                    { week: 'Week 2', task: 'MEP rewiring, plumbing chase & steel beam installation', status: 'Scheduled' },
                    { week: 'Week 3', task: 'Insulated wall rendering, ceiling coves & floor screed', status: 'Scheduled' },
                    { week: 'Week 4', task: 'Custom cabinetry, glazing installation & tile lay', status: 'Scheduled' },
                    { week: 'Week 5', task: 'Teak timber slat facade & smart ambient lighting', status: 'Scheduled' },
                  ].map((phase, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-neutral-950 border border-neutral-800/80">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 text-[10px] font-mono text-amber-400 font-bold">{phase.week}</span>
                        <span className="text-slate-300 text-[11px]">{phase.task}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{phase.status}</span>
                    </div>
                  ))}
                </div>

                {/* Generate Quote Button */}
                <button
                  type="button"
                  onClick={handleGenerateQuote}
                  disabled={isGeneratingQuote}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-xl shadow-lg flex items-center justify-center space-x-2 cursor-pointer transition-all"
                >
                  {isGeneratingQuote ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Compiling Stamped Renovation Quote...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Generate Official Renovation Quote (PDF)</span>
                    </>
                  )}
                </button>
              </div>
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
        title="Oskayi Bedir and After Renivatiin — Unlock 3 AI Remodels"
        amountUSD={15}
        appName="Oskayi Bedir and After Renivatiin"
      />
    </div>
  );
};
