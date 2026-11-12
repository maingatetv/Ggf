import React, { useState, useEffect, useRef } from 'react';
import { PaystackModal } from '../common/PaystackModal.tsx';
import { 
  Video, Mic, UploadCloud, Volume2, VolumeX, Sparkles, 
  Lock, Check, ChevronRight, Play, Pause, Download, 
  Globe2, MessageSquare, RefreshCw, FileText, Music, Radio
} from 'lucide-react';

interface InfluencerCloneAppProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const InfluencerCloneApp: React.FC<InfluencerCloneAppProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  // DEMO NO TYPING: Avatar auto-speaks & changes every 5 seconds
  const demoAvatars = [
    {
      name: 'Kwame (Tech & Data Reseller)',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      niche: 'Telecommunications & High-Speed Data',
      voiceTone: 'Energetic African Baritone',
      speechPhrase: 'Hello, I sell data in Ghana! Stop overpaying your ISP. Get 50GB high-speed for cheap!',
      location: 'Accra, Ghana',
      language: 'English (Ghanaian Accent)',
      accentColor: 'from-pink-500 to-rose-600',
    },
    {
      name: 'Ama (Luxury Real Estate Diva)',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      niche: 'Prime Airport Residential & Cantonments Luxury',
      voiceTone: 'Warm Elegant Pitch',
      speechPhrase: 'Hello, I sell data and luxury properties in Ghana! Tour this 4-bedroom penthouses with me today.',
      location: 'Cantonments, Accra',
      language: 'Twi & English Pidgin',
      accentColor: 'from-rose-500 to-purple-600',
    },
    {
      name: 'Kofi (Crypto & E-Commerce Guru)',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      niche: 'Digital Marketing & FX Arbitrage',
      voiceTone: 'Authoritative Fast-Paced',
      speechPhrase: 'Hello, I sell data in Ghana! Automated TikTok dropshipping generated $4,000 this week alone.',
      location: 'Kumasi, Ghana',
      language: 'English & Ga Dialect',
      accentColor: 'from-fuchsia-600 to-pink-500',
    },
    {
      name: 'Aïcha (Francophone West Africa Host)',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
      niche: 'Cross-Border AfCFTA Trade & Fashion',
      voiceTone: 'Chic Parisian/Ivorian Melodic',
      speechPhrase: 'Bonjour! Je vends des datas et de la mode au Ghana et en Côte d\'Ivoire. Suivez mes vidéos!',
      location: 'Abidjan / Accra',
      language: 'French (West African)',
      accentColor: 'from-pink-600 to-red-500',
    },
  ];

  const [currentAvatarIdx, setCurrentAvatarIdx] = useState(0);
  const [isAudioSpeaking, setIsAudioSpeaking] = useState(true);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Auto-cycle avatar every 5 seconds in demo
  useEffect(() => {
    if (isUnlocked) return;
    const interval = setInterval(() => {
      setCurrentAvatarIdx((prev) => (prev + 1) % demoAvatars.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isUnlocked, demoAvatars.length]);

  // Speaking mouth / waveform visualizer pulse animation
  useEffect(() => {
    if (!isAudioSpeaking) return;
    const pulse = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 280);
    return () => clearInterval(pulse);
  }, [isAudioSpeaking]);

  // Play real web speech synthesis when user toggles or avatar changes
  const speakCurrentPhrase = (phrase: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // REAL AFTER PAYMENT (Unlocked Mode)
  const [uploadedFace, setUploadedFace] = useState<string | null>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );
  const [voiceSampleRecorded, setVoiceSampleRecorded] = useState(true);
  const [recordingSeconds, setRecordingSeconds] = useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Twi' | 'Ga' | 'French'>('English');
  const [selectedScriptIdx, setSelectedScriptIdx] = useState(0);
  const [isRenderingVideos, setIsRenderingVideos] = useState(false);
  const [renderedCount, setRenderedCount] = useState(100);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // 100 Viral Generated Video Scripts across 4 languages
  const multiLingualScripts = {
    English: [
      {
        hook: 'Wait! Stop overpaying for internet data right now.',
        body: 'I sell official high-speed non-expiring data bundles in Ghana. Get 50GB for just a fraction of store price. Instant top-up within 60 seconds.',
        cta: 'Click the link in bio or WhatsApp me right now to load yours.',
      },
      {
        hook: 'How I built a $5,000/mo remote business from East Legon.',
        body: 'You do not need a shop. With just your smartphone and wholesale data distribution, you can clear 200 orders a day on autopilot.',
        cta: 'Comment DATA below and I will send you the supplier link.',
      },
      {
        hook: 'Secret MTN and Telecel data bundle trick no one tells you.',
        body: 'Stop buying 2GB packages every 3 days. Our merchant bulk gateway gives you unlimited speeds without throttling.',
        cta: 'Order directly on my website link today.',
      },
      {
        hook: 'Why real estate in Accra is booming this quarter.',
        body: 'Rental yields in Cantonments and Airport Hills are hitting 14% USD returns. Secure your off-plan duplex before prices jump.',
        cta: 'DM me "INVEST" for the confidential prospectus.',
      },
    ],
    Twi: [
      {
        hook: 'Me nua paapaa, gye w\'ani! Yɛntɔ data nkyɛ bio.',
        body: 'Mepɛ sɛ mekyerɛ wo baabi a wobɛtumi anya data kɛseɛ a ɛnyɛ na, na ɛnyɛ den koraa. 50GB pɛɛ na ɛbɛyɛ adwuma bɔkɔɔ.',
        cta: 'Mia link no so seesei ara na yɛbɛyɛ wo dea ama wo!',
      },
      {
        hook: 'Sika kwan foforɔ a ɛwɔ Ghana ha!',
        body: 'Wo wɔ smartphone nanso wo nsa nka sika? Fa data tɔn kwan yi yɛ adwuma. Nnipa bebree rekɔ so de rebue wɔn nan so.',
        cta: 'Twerɛ "YES" wɔ aseɛ ha na menfa video no mmrɛ wo.',
      },
      {
        hook: 'Tie yi yie ansa na woatɔ data foforɔ!',
        body: 'Yɛde data a ɛnwu da na ɛba. Wopɛ MTN, Telecel anaa AirtelTigo? Ne nyinaa wɔ ha ma wo.',
        cta: 'WhatsApp me seesei ara!',
      },
    ],
    Ga: [
      {
        hook: 'Nyɛminɛmɛi! Nyɛ kpa shikpon lolo, data mli wa wa!',
        body: 'Mii hɔɔ data kpakpa kɛha gbɔmɛi fɛɛ yɛ Ga mli. Gbii 30 gbɛjianɔtoo ni etoŋ kuraa. Nyɛ baa nyɛ bahe!',
        cta: 'Tsɔɔmɔ mi yɛ WhatsApp nɔ amrɔ nɛɛ.',
      },
      {
        hook: 'Gbɛ he ni obaatsɔ nɔ ona shika kɛjɛ o-phone mli.',
        body: 'Data hɔɔmɔ yɛ Osu, Madina kɛ Tema efee nɔ ko kpele. Ohe ehiaaa shishi tsu kɛ bafee nɛkɛ nitsumɔ nɛ.',
        cta: 'Tsɛ mi yɛ phone nɔ kɛha hefatalɔi.',
      },
    ],
    French: [
      {
        hook: 'Arrêtez immédiatement de payer le double pour vos forfaits data!',
        body: 'Je vends des gigas haut débit officiels au Ghana et dans toute la sous-région. 50 Go à des tarifs direct grossiste sans coupure.',
        cta: 'Cliquez sur le lien dans la bio pour recharger en 2 minutes chrono!',
      },
      {
        hook: 'Comment gagner 500 $ par semaine avec votre téléphone portable.',
        body: 'Grâce au commerce numérique et à la revente de données télécom, automatisez vos revenus de Dakar à Abidjan et Accra.',
        cta: 'Écrivez-moi en privé pour recevoir le guide grossiste.',
      },
      {
        hook: 'Opportunité exclusive d\'investissement immobilier à Accra.',
        body: 'Découvrez les résidences modernes de luxe avec un rendement locatif exceptionnel garanti en dollars.',
        cta: 'Contactez notre agence dès aujourd\'hui pour votre visite virtuelle.',
      },
    ],
  };

  const currentScriptsList = multiLingualScripts[selectedLanguage];
  const activeScript = currentScriptsList[selectedScriptIdx % currentScriptsList.length];

  const handleSimulateRender = () => {
    setIsRenderingVideos(true);
    setTimeout(() => {
      setIsRenderingVideos(false);
      setRenderedCount(100);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 6000);
    }, 1800);
  };

  const handleRecordVoice = () => {
    setIsRecording(true);
    let sec = 0;
    const interval = setInterval(() => {
      sec += 1;
      setRecordingSeconds(sec);
      if (sec >= 120) {
        clearInterval(interval);
        setIsRecording(false);
        setVoiceSampleRecorded(true);
      }
    }, 50);
  };

  const currentAvatar = demoAvatars[currentAvatarIdx];

  return (
    <div className="w-full bg-[#0A070E] text-slate-100 min-h-screen">
      {/* Pink + Black Creator Header */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-pink-200 border border-white/20 mb-2">
              <Video className="w-3.5 h-3.5 text-pink-300" />
              <span>AI Neural Lip-Sync • Autonomous Viral Video Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center space-x-2">
              <span>AI Influencer Clone</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-medium border border-white/30">
                Your Face • Your Voice
              </span>
            </h1>
            <p className="text-pink-100 text-xs sm:text-sm mt-1">
              Clone your digital twin in 2 minutes. Generate 100 promotional videos in English, Twi, Ga, and French on autopilot.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-white animate-spin" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-pink-200 font-bold">Polyglot AI Engine</div>
              <div className="text-sm sm:text-base font-black text-white font-mono">
                English • Twi • Ga • French
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-8">
        {/* ========================================================= */}
        {/* DEMO MODE: STRICTLY NO TYPING, AVATAR AUTO-SPEAKS         */}
        {/* ========================================================= */}
        {!isUnlocked ? (
          <div className="space-y-6">
            {/* Auto-Rotating Avatar Telecast Box */}
            <div className="bg-[#140F1D] rounded-3xl p-5 sm:p-7 shadow-2xl border border-pink-500/30 overflow-hidden relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                      Live Neural Avatar Telecast
                    </span>
                    <span className="text-xs text-slate-400">• Switches persona every 5 seconds</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {currentAvatar.name}
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => speakCurrentPhrase(currentAvatar.speechPhrase)}
                    className="px-3 py-1.5 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-pink-400" />
                    <span>Hear Audio Aloud</span>
                  </button>
                  <div className="bg-pink-500/10 border border-pink-500/30 px-3 py-1.5 rounded-xl text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-pink-300">{currentAvatar.language}</span>
                  </div>
                </div>
              </div>

              {/* Creator Screen / Phone Aspect Ratio Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Visual Avatar Stream */}
                <div className="relative aspect-[9/12] max-h-[460px] mx-auto w-full max-w-xs rounded-3xl overflow-hidden border-2 border-pink-500/50 shadow-2xl bg-neutral-950">
                  <img
                    src={currentAvatar.avatarUrl}
                    alt={currentAvatar.name}
                    className="w-full h-full object-cover object-center filter brightness-95"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Top Live Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase animate-pulse">
                      ● LIVE
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                      24.8K Watching
                    </span>
                  </div>

                  {/* Voice Waveform Simulator (Syncs with speech) */}
                  <div className="absolute bottom-28 left-4 right-4 flex items-end justify-center space-x-1.5 h-10">
                    {[35, 75, 45, 90, 60, 100, 50, 85, 40, 70, 95, 30, 80, 55].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-pink-500 rounded-full transition-all duration-150"
                        style={{
                          height: mouthOpen ? `${h}%` : '20%',
                          opacity: mouthOpen ? 0.9 : 0.4,
                        }}
                      />
                    ))}
                  </div>

                  {/* Dynamic Subtitle Speech Bubble */}
                  <div className="absolute bottom-4 left-3 right-3 bg-black/80 backdrop-blur-md border border-pink-500/40 rounded-2xl p-3 text-white">
                    <div className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">
                      Speaking Voice: {currentAvatar.voiceTone}
                    </div>
                    <p className="text-xs font-semibold leading-snug mt-1 text-slate-100 italic">
                      "{currentAvatar.speechPhrase}"
                    </p>
                  </div>
                </div>

                {/* Persona Details & No-Typing Notice */}
                <div className="space-y-4">
                  <div className="bg-neutral-900/90 border border-pink-500/20 rounded-2xl p-5 space-y-3">
                    <div className="text-xs uppercase font-bold text-pink-400">Creator Profile Telemetry</div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                        <span className="text-slate-400">Industry / Niche:</span>
                        <span className="font-bold text-white">{currentAvatar.niche}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                        <span className="text-slate-400">Voice Synthesis Model:</span>
                        <span className="font-bold text-pink-300">{currentAvatar.voiceTone}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                        <span className="text-slate-400">Geographic Base:</span>
                        <span className="font-bold text-white">{currentAvatar.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Script Pipeline:</span>
                        <span className="font-bold text-emerald-400">100 Videos Rendered Monthly</span>
                      </div>
                    </div>
                  </div>

                  {/* Auto-play progress indicator */}
                  <div className="flex items-center justify-center space-x-2 pt-2">
                    {demoAvatars.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentAvatarIdx ? 'w-10 bg-pink-500' : 'w-2 bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="p-3 bg-pink-950/40 border border-pink-500/30 rounded-xl text-center text-xs text-pink-200 font-medium">
                    🔒 Demo strictly automated. Uploading your own face photo, recording your 2-minute voice sample, and rendering 100 multi-lingual videos unlock below.
                  </div>
                </div>
              </div>
            </div>

            {/* PAYWALL CTA BOX */}
            <div className="bg-gradient-to-br from-pink-600 via-rose-600 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto border-2 border-pink-300">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-white text-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Lock className="w-7 h-7 text-pink-600" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Create YOUR Personal AI Avatar
                </h3>

                <p className="text-pink-100 text-sm max-w-lg mx-auto">
                  Upload your photo and record 2 minutes of your voice. Our engine clones your likeness, voice pitch, and dialect to generate 100 automated marketing videos in English, Twi, Ga, and French.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPaystackOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 active:scale-95 text-pink-700 hover:text-pink-800 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-pink-950/30 inline-flex items-center justify-center space-x-3 transition-all cursor-pointer border border-pink-200"
                  >
                    <span>Create YOUR Avatar - $30/mo via Paystack USD</span>
                    <ChevronRight className="w-5 h-5 text-pink-600" />
                  </button>
                </div>

                <div className="text-xs text-pink-200 font-medium">
                  Cancel anytime • High-definition 1080p MP4 downloads • 100 Videos per month package
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* REAL AFTER PAYMENT: PHOTO UPLOAD, 2-MIN RECORD, 100 VIDEOS*/
          /* ========================================================= */
          <div className="space-y-6">
            {/* Unlocked Banner */}
            <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-200 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-100">
                    AI Influencer Studio — Unlocked ($30/mo Paid via Paystack USD)
                  </h4>
                  <p className="text-xs text-emerald-300">
                    Voice cloner, photo-to-avatar pipeline, 100 multi-lingual script generator, and MP4 batch render active.
                  </p>
                </div>
              </div>
              <button
                onClick={handleSimulateRender}
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Batch Render 100 Videos</span>
              </button>
            </div>

            {/* STEP 1 & 2: PHOTO UPLOAD & 2-MINUTE VOICE RECORDER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo Upload Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-bold text-white text-base flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                    <span>1. Upload Face Portrait</span>
                  </h3>
                  <span className="text-xs text-pink-400 font-mono">High-Res Face Lock</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-24 h-28 rounded-2xl overflow-hidden border-2 border-pink-500/60 shrink-0 bg-neutral-950 shadow-md">
                    {uploadedFace && (
                      <img src={uploadedFace} alt="Cloned Avatar" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400">
                      Upload a front-facing selfie or portrait with neutral lighting.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setUploadedFace(
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                          )
                        }
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-200 border border-neutral-700 cursor-pointer"
                      >
                        Model A
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setUploadedFace(
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
                          )
                        }
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-200 border border-neutral-700 cursor-pointer"
                      >
                        Model B
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setUploadedFace(
                            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
                          )
                        }
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-neutral-800 hover:bg-neutral-700 text-slate-200 border border-neutral-700 cursor-pointer"
                      >
                        Model C
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2-Minute Voice Recorder */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-bold text-white text-base flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                    <span>2. Voice Cloner (2 Mins Audio)</span>
                  </h3>
                  <span className="text-xs text-emerald-400 font-mono">
                    {voiceSampleRecorded ? 'Voice Trained 100%' : 'Need Sample'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-pink-500/20 text-pink-400'
                      }`}>
                        <Mic className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {isRecording ? 'Recording Voiceprint Sample...' : '2-Minute Voice Profile Cloned'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Pitch: 142 Hz • Accent: Ghanaian & West African • Timbre: Natural
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRecordVoice}
                      className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      {isRecording ? 'Recording...' : 'Re-record'}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Captures your natural inflection, pause cadence, and phonetics across English, Twi, Ga, and French.
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 3: LANGUAGE & VIRAL SCRIPT SELECTOR */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center space-x-2">
                    <Globe2 className="w-4 h-4 text-pink-400" />
                    <span>Language Selection & 100 Script Generator</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Toggle language to generate high-converting short-form hooks tailored for Ghanaian and West African audiences.
                  </p>
                </div>

                {/* 4 Language Tabs */}
                <div className="flex rounded-xl bg-neutral-950 p-1 border border-neutral-800 text-xs font-bold">
                  {(['English', 'Twi', 'Ga', 'French'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setSelectedScriptIdx(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        selectedLanguage === lang
                          ? 'bg-pink-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang === 'English' ? '🇬🇭 English' : lang === 'Twi' ? '🇬🇭 Twi' : lang === 'Ga' ? '🇬🇭 Ga' : '🇨🇮 French'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Script Viewer & Speech Synthesis Player */}
              <div className="bg-neutral-950 border border-pink-500/20 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-pink-400 font-bold font-mono">
                    Script #{selectedScriptIdx + 1} of {currentScriptsList.length} ({selectedLanguage})
                  </span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => speakCurrentPhrase(`${activeScript.hook} ${activeScript.body} ${activeScript.cta}`)}
                      className="px-3 py-1 bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border border-pink-500/40 rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-pink-400" />
                      <span>Speak Aloud</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="text-amber-300 font-black">
                    ⚡ Hook: "{activeScript.hook}"
                  </div>
                  <div className="text-slate-200 leading-relaxed">
                    💡 Body: "{activeScript.body}"
                  </div>
                  <div className="text-pink-400 font-bold">
                    🚀 Call to Action: "{activeScript.cta}"
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
                  <span className="text-slate-500">Estimated Duration: 24 Seconds (TikTok / Reels / Shorts)</span>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedScriptIdx((prev) => (prev > 0 ? prev - 1 : currentScriptsList.length - 1))}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-slate-300 cursor-pointer"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedScriptIdx((prev) => (prev + 1) % currentScriptsList.length)}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-slate-300 cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>

              {/* BATCH RENDER & DOWNLOAD ACTIONS */}
              <div className="p-4 bg-gradient-to-r from-pink-900/60 via-purple-900/50 to-neutral-900 border border-pink-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-pink-300 font-bold uppercase tracking-wider">
                    Full Content Engine Active
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    100 high-definition 1080p MP4 videos with auto-captions and audio stems rendered into your download vault.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateRender}
                  disabled={isRenderingVideos}
                  className="px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-sm rounded-xl shadow-lg shadow-pink-500/30 flex items-center space-x-2 shrink-0 cursor-pointer transition-all"
                >
                  {isRenderingVideos ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing 100 Video MP4s...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download All 100 Videos (.ZIP)</span>
                    </>
                  )}
                </button>
              </div>

              {downloadSuccess && (
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/40 text-center">
                  ✓ 100 videos rendered successfully! Package downloaded to your browser.
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
        title="AI Influencer Clone — Monthly Creator Pass"
        amountUSD={30}
        appName="AI Influencer Clone"
      />
    </div>
  );
};
