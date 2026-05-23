import React, { useState, useEffect, SVGProps } from "react";
import { 
  Book, 
  Video, 
  Flame, 
  Sparkles, 
  Laptop, 
  Play, 
  CheckCircle2, 
  User, 
  TrendingUp, 
  Send, 
  Share2, 
  SlidersHorizontal, 
  Cpu, 
  FileText, 
  Lightbulb, 
  Coins, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  BookOpen, 
  Award, 
  Check, 
  Loader2, 
  Menu, 
  X, 
  Target, 
  Users, 
  Calendar, 
  Mic, 
  Camera,
  Copy
} from "lucide-react";
import { INTRODUCTION_PAGE, VIDEO_IDEAS, BONUS_SECTIONS } from "./data";
import { VideoIdea, BonusSection, CustomScriptResponse } from "./types";

export default function App() {
  // Navigation state
  // "cover", "intro", "toc", "video-1"..."video-10", "bonus-edit"..."bonus-monetize", "graduation"
  const [activeTab, setActiveTab ] = useState<string>("cover");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  
  // Custom AI Extrapolator state
  const [niche, setNiche] = useState<string>("");
  const [audience, setAudience] = useState<string>("");
  const [tone, setTone] = useState<string>("Cinematic, Energetic & Direct");
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);
  const [generatedScript, setGeneratedScript] = useState<CustomScriptResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Growth & engagement simulator states (for UI visual delight)
  const [simulatedLikes, setSimulatedLikes] = useState<number>(1420);
  const [simulatedComments, setSimulatedComments] = useState<number>(312);
  const [simulatedShares, setSimulatedShares] = useState<number>(89);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // Certifiate state
  const [studentName, setStudentName] = useState<string>("");
  const [isCertificateGenerated, setIsCertificateGenerated] = useState<boolean>(false);

  // User reading progress tracking
  const [readSections, setReadSections] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("ai_blueprint_progress");
      return saved ? JSON.parse(saved) : ["cover"];
    } catch {
      return ["cover"];
    }
  });

  // Mobile drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Save progress
  useEffect(() => {
    localStorage.setItem("ai_blueprint_progress", JSON.stringify(readSections));
  }, [readSections]);

  const markSectionAsRead = (sectionId: string) => {
    if (!readSections.includes(sectionId)) {
      setReadSections(prev => [...prev, sectionId]);
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // List of all sections for flat sequence navigation
  const navigationOrder = [
    { id: "cover", label: "Cover Page" },
    { id: "intro", label: "Introduction" },
    { id: "toc", label: "Table of Contents" },
    ...VIDEO_IDEAS.map(v => ({ id: `video-${v.id}`, label: `Video ${v.id}: ${v.title}` })),
    ...BONUS_SECTIONS.map(b => ({ id: `bonus-${b.id}`, label: `Bonus: ${b.title}` })),
    { id: "graduation", label: "Finish Ceremony" }
  ];

  const currentIdx = navigationOrder.findIndex(item => item.id === activeTab);
  
  const handleNext = () => {
    if (currentIdx < navigationOrder.length - 1) {
      const nextId = navigationOrder[currentIdx + 1].id;
      markSectionAsRead(activeTab);
      setActiveTab(nextId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      const prevId = navigationOrder[currentIdx - 1].id;
      setActiveTab(prevId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Live script Generation Customizer triggered from UI
  const handleGenerateScript = async (video: VideoIdea) => {
    if (!niche.trim()) {
      alert("Please enter a target niche (e.g., Dentist, SaaS, E-commerce, Gym) to let the AI customize.");
      return;
    }

    setAiGenerating(true);
    setApiError(null);
    setGeneratedScript(null);

    try {
      const response = await fetch("/api/generate-custom-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoTitle: video.title,
          originalConcept: video.concept,
          niche: niche,
          targetAudience: audience || "Business Owners / Startups",
          tone: tone
        })
      });

      if (!response.ok) {
        throw new Error("Server responded with error loading custom script.");
      }

      const result = await response.json();
      if (result.customized && result.data) {
        setGeneratedScript(result.data);
      } else {
        throw new Error("Invalid response format received.");
      }
    } catch (err: any) {
      console.error(err);
      setApiError("Could not connect to AI generation API. Showing interactive demo variation instead.");
      // Fallback response for offline/key fallback consistency
      setGeneratedScript({
        hook: `🔥 "Stop running your ${niche} business with old school manual workflows dosto. AI is taking over..."`,
        script: `[Camera: Ultra-Zoom inside Creative Workspace]
Hey guys! If you run a ${niche} business and you are still spending hours tracking leads manually, you are literally throwing profits away in 2026. 

[Point over shoulder to Make.com visual automation blocks]
We just deployed a seamless AI-powered lead router that captures requests, schedules instant appointments, and draft personalized messages in under 2.5 seconds automatically.

[Deep eye contact with powerful founder posture]
Comment 'UPGRADE' below and my bot will send the raw blueprint folder directly to your inbox for free! Let's scale up!`,
        shotBreakdown: [
          "Shot 1: Extreme close up of smartphone with alerts glowing.",
          "Shot 2: Pointing directly inside the computer screen illustrating continuous nodes executing.",
          "Shot 3: Creator speaking with intense motivation, gesturing 'Stop'.",
          "Shot 4: Close up of tea brewing highlighting early lifestyle shift."
        ],
        clientStrategy: `Target high-traffic ${niche} business owners. Offer a complimentary 'Automation Infrastructure Audit'. When they see their manual leakage, closing a ₹1L monthly retainer is incredibly simple.`,
        hashtags: `#${niche.replace(/\s+/g, '')} #AIAutomationAgency #Makecom #NoCodeWorkspace #BusinessScale`,
        bRollSuggestions: "Satisfying screen recordings of API channels syncing, close-ups of mechanical keyboard, neon room elements",
        caption: `Stop wasting your premium productive hours. Automate your manual workflow and reclaim 12+ hours weekly. Comment 'UPGRADE' to get this blueprint! 👇`
      });
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div id="app-container" className="min-h-screen bg-slate-50/50 text-slate-800 font-sans selection:bg-blue-100 selection:text-slate-900 overflow-x-hidden antialiased relative">
      
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-100/40 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-100/45 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

      {/* ----------------------------------------------------
          TOP HEADER ACTIONS
          ---------------------------------------------------- */}
      <header id="main-header" className="sticky top-0 z-40 bg-white/50 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 py-3 md:px-10 md:py-5 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <BookOpen className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">2026 Edition</span>
            <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase">Future Founder</h1>
          </div>
        </div>

        {/* Reading Progress Indicator */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">CREATOR PLAYBOOK PROGRESS</span>
            <span className="text-xs font-mono font-bold text-slate-800">
              {Math.min(100, Math.round((readSections.length / navigationOrder.length) * 100))}% Completed
            </span>
          </div>
          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden md:block">
            <div 
              className="bg-slate-900 h-full transition-all duration-500 ease-out" 
              style={{ width: `${(readSections.length / navigationOrder.length) * 100}%` }}
            />
          </div>
          <div className="px-3.5 py-1 bg-slate-900 text-white text-[9px] font-bold rounded-full tracking-wider">
            PREMIUM ACCESS
          </div>

          <button 
            id="mobile-menu-btn"
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
            title="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* ----------------------------------------------------
            LEFT SIDE NAVIGATION / TABLE OF CONTENT
            ---------------------------------------------------- */}
        <aside 
          id="desktop-sidebar" 
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/60 backdrop-blur-md border-r border-slate-100 p-6 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:sticky md:top-[73px] md:h-[calc(100vh-73px)] overflow-y-auto ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-6 md:hidden">
              <span className="font-bold text-slate-900 font-sans text-sm tracking-tight uppercase">Chapters Index</span>
              <button 
                id="close-sidebar-btn"
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
                title="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Introduction/Cover */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-2">Start Here</span>
                <div className="mt-2 space-y-1">
                  <button
                    id="nav-btn-cover"
                    onClick={() => { setActiveTab("cover"); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-xs font-semibold tracking-tight transition-all ${
                      activeTab === "cover" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-55 hover:text-slate-900"
                    }`}
                  >
                    <Book className="h-4 w-4" />
                    <span>⚡ Title Cover</span>
                    {readSections.includes("cover") && <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-auto" />}
                  </button>

                  <button
                    id="nav-btn-intro"
                    onClick={() => { setActiveTab("intro"); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-xs font-semibold tracking-tight transition-all ${
                      activeTab === "intro" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-55 hover:text-slate-900"
                    }`}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>📈 Why AI in 2026?</span>
                    {readSections.includes("intro") && <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-auto" />}
                  </button>

                  <button
                    id="nav-btn-toc"
                    onClick={() => { setActiveTab("toc"); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-xs font-semibold tracking-tight transition-all ${
                      activeTab === "toc" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-55 hover:text-slate-900"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>🗒️ Navigation Index</span>
                    {readSections.includes("toc") && <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-auto" />}
                  </button>
                </div>
              </div>

              {/* 10 Video Blueprints */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-2">10 Video Ideas</span>
                <div className="mt-2 space-y-1">
                  {VIDEO_IDEAS.map(v => (
                    <button
                      id={`nav-btn-video-${v.id}`}
                      key={v.id}
                      onClick={() => { setActiveTab(`video-${v.id}`); setIsSidebarOpen(false); }}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-xs font-semibold tracking-tight transition-all ${
                        activeTab === `video-${v.id}` ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Video className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{v.id}. {v.title}</span>
                      {readSections.includes(`video-${v.id}`) && <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-auto flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bonus Sections */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-2">Bonus Strategies</span>
                <div className="mt-2 space-y-1">
                  {BONUS_SECTIONS.map(b => (
                    <button
                      id={`nav-btn-bonus-${b.id}`}
                      key={b.id}
                      onClick={() => { setActiveTab(`bonus-${b.id}`); setIsSidebarOpen(false); }}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-xs font-semibold tracking-tight transition-all ${
                        activeTab === `bonus-${b.id}` ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{b.title}</span>
                      {readSections.includes(`bonus-${b.id}`) && <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-auto flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Affirmation */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-2">Graduation</span>
                <div className="mt-2 space-y-1">
                  <button
                    id="nav-btn-graduation"
                    onClick={() => { setActiveTab("graduation"); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-xs font-semibold tracking-tight transition-all ${
                      activeTab === "graduation" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Award className="h-4 w-4" />
                    <span>🏆 Get Certified</span>
                    {readSections.includes("graduation") && <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-auto" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 hidden md:block">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Interactive Companion</span>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Customize scripts on-the-fly. Enter any niche inside the video pages to use our AI customizer engine!</p>
            </div>
          </div>
        </aside>

        {isSidebarOpen && (
          <div 
            id="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          />
        )}


        {/* ----------------------------------------------------
            MAIN EBOOK VIEWPORT
            ---------------------------------------------------- */}
        <main id="main-content" className="flex-1 min-h-screen px-4 md:px-12 py-8 max-w-5xl">

          {/* 1. COVER PAGE VIEW */}
          {activeTab === "cover" && (
            <div id="cover-view" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in py-4">
              
              {/* LEFT: THE COVER (Cinematic Focus) */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between min-h-[520px] rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 shadow-xl shadow-slate-200/50">
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-tighter mb-4">The Blueprint Series</span>
                  <h1 className="text-4xl md:text-5xl font-black leading-[0.95] tracking-tight mb-4 text-slate-900">
                    10 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 underline decoration-cyan-400/30">VIRAL</span> <br />AI AGENCY <br />IDEAS
                  </h1>
                  <p className="text-slate-500 font-medium leading-relaxed text-xs">
                    How to Build a Powerful Personal Brand, Land Retainer Clients & Grow Your AI Business in 2026.
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xs">
                      PK
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest">Author</p>
                      <p className="font-bold text-slate-800 text-sm">Pritam Kumar</p>
                      <p className="text-[10px] text-slate-500 font-medium">Future Founder & CEO</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-1 flex-1 bg-blue-600 rounded-full"></div>
                    <div className="h-1 flex-1 bg-purple-600 rounded-full"></div>
                    <div className="h-1 flex-1 bg-cyan-500 rounded-full"></div>
                    <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* RIGHT: CHAPTER HIGHLIGHTS (Data/Infographic Style) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                
                {/* Luxury Badge Banner */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-slate-900 text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    2026 Creator Edition
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                    $299 Value Blueprint
                  </span>
                </div>

                {/* Primary intro and highlights card */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1">“Interactive Video Playbook”</h2>
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-tight">Equipped with Adaptive AI Script Extrapolator</p>
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">
                    This interactive playbook maps out the exact hook formulas, shot breakdowns, and monetization mechanisms powering the most profitable creators. You can dynamically customize each chapter script to your target client niche in seconds.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Pritam Kumar's Secrets</p>
                      <ul className="text-[11px] space-y-2 text-slate-600">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 10 Micro-Consulting scripts</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Fully interactive AI dynamic rewrite</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Implementation checkmarks & certificate</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-slate-900 rounded-2xl text-white flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-2">Graduation Criteria</p>
                        <p className="text-[11px] leading-relaxed text-zinc-300">
                          Complete all sections to unlock your download-ready Creator Readiness Certificate.
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] font-semibold text-slate-400">
                        <span>POWERED BY AI STUDIO</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-features widgets row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Edition</p>
                    <div className="h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-mono text-[10px] text-slate-600 font-bold">2026 Release</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Theme</p>
                    <div className="h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-mono text-[10px] text-slate-600 font-bold">Pristine Mono</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Access Status</p>
                    <div className="h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-mono text-[10px] text-slate-600 font-bold">Unlocked</div>
                  </div>
                </div>

                {/* Why Read This Section (Bento grids) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Target className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 font-sans">Stop Calling</h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Cold outbound is failing in 2026. Inbound short-form delivers instant authority.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <TrendingUp className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 font-sans">High-Ticket DMs</h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Convert massive view counters into highly qualified consulting leads.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                      <Cpu className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 font-sans">AI Generator</h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Customizes any strategy template onto your unique niche on command.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-4">
                  <button
                    id="btn-start-reading-next"
                    onClick={handleNext}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl text-xs transition-all flex items-center space-x-2 group shadow-md"
                  >
                    <span>Open Introduction Page</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* 2. INTRODUCTION VIEW */}
          {activeTab === "intro" && (
            <div id="intro-view" className="space-y-10 animate-fade-in py-4">
              
              <div className="border-b border-slate-100 pb-5">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">Interactive Manifesto</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1 uppercase">{INTRODUCTION_PAGE.title}</h2>
                <p className="text-xs text-slate-500 mt-1">{INTRODUCTION_PAGE.subtitle}</p>
              </div>

              {/* Mini Infographic Panel */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
                <div className="flex items-center space-x-2 text-slate-400 mb-6">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase">2026 Social Media Ecosystem Growth Stats</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {INTRODUCTION_PAGE.stats.map((stat, i) => (
                    <div key={i} className="border-l border-slate-700 pl-4">
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">{stat.label}</span>
                      <span className="text-2xl md:text-3xl font-black font-mono tracking-tight text-white block mt-1">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
                <div className="lg:col-span-2 space-y-6 text-slate-600 text-xs md:text-sm leading-relaxed">
                  {INTRODUCTION_PAGE.content.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Growth Strategy Pillars Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                  <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase">THE 3 VIRAL PILLARS</h4>
                  
                  <div className="space-y-4">
                    {INTRODUCTION_PAGE.pillars.map((p, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-xs font-bold text-slate-900 block">{p.title}</span>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">PRODUCER NOTE:</span>
                    <p className="text-[11px] text-slate-550 mt-1 leading-relaxed">
                      Speak with extreme conviction. 2026 viewers demand authority. Cut out any 'umms' or 'errs'—only raw, clear value vectors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress and Sequence Actions */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <button
                  id="btn-intro-prev"
                  onClick={handlePrev}
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Cover</span>
                </button>
                <button
                  id="btn-intro-next"
                  onClick={handleNext}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-transform flex items-center space-x-2 text-xs"
                >
                  <span>Go to Table of Contents</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          )}

          {/* 3. TABLE OF CONTENTS VIEW */}
          {activeTab === "toc" && (
            <div id="toc-view" className="space-y-8 animate-fade-in py-4">
              <div className="border-b border-slate-100 pb-5">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">Index</span>
                <h2 className="text-3xl font-black text-slate-900 mt-1 uppercase">Table of Contents</h2>
                <p className="text-slate-500 text-xs mt-1">Jump directly to any chapter blueprint or track your reading milestones.</p>
              </div>

              {/* Grid index */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase block mb-4">Core Chapters</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {VIDEO_IDEAS.map(v => (
                    <button
                      id={`toc-jump-video-${v.id}`}
                      key={v.id}
                      onClick={() => { setActiveTab(`video-${v.id}`); }}
                      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left hover:border-slate-900 hover:shadow-sm transition-all group flex justify-between items-center"
                    >
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-400 block tracking-wider">CHAPTER {v.id}</span>
                        <span className="text-xs font-black text-slate-800 group-hover:text-slate-900 mt-1 block uppercase tracking-tight">{v.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 pl-2">
                        {readSections.includes(`video-${v.id}`) ? (
                          <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <Check className="h-2.5 w-2.5" /> <span>Read</span>
                          </span>
                        ) : (
                          <span className="text-[9px] bg-slate-50 text-slate-400 font-bold px-2 py-0.5 rounded-full">Unread</span>
                        )}
                        <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase block mb-4">Bonus Playlists</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BONUS_SECTIONS.map(b => (
                    <button
                      id={`toc-jump-bonus-${b.id}`}
                      key={b.id}
                      onClick={() => { setActiveTab(`bonus-${b.id}`); }}
                      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left hover:border-slate-900 hover:shadow-sm transition-all group flex justify-between items-center"
                    >
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-400 block tracking-wider">PREMIUM BONUS</span>
                        <span className="text-xs font-black text-slate-800 group-hover:text-slate-900 mt-1 block uppercase tracking-tight">{b.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 pl-2">
                        {readSections.includes(`bonus-${b.id}`) ? (
                          <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <Check className="h-2.5 w-2.5" /> <span>Read</span>
                          </span>
                        ) : (
                          <span className="text-[9px] bg-slate-50 text-slate-400 font-bold px-2 py-0.5 rounded-full">Unread</span>
                        )}
                        <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sequence Navigation */}
              <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                <button
                  id="btn-toc-prev"
                  onClick={handlePrev}
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Introduction</span>
                </button>
                <button
                  id="btn-toc-next"
                  onClick={handleNext}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-transform flex items-center space-x-2 text-xs"
                >
                  <span>Open Video Chapter 1</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* 4. CHAPTER VIDEO bluePRINTS VIEW */}
          {activeTab.startsWith("video-") && (() => {
            const idInt = parseInt(activeTab.split("-")[1], 10);
            const video = VIDEO_IDEAS.find(v => v.id === idInt);
            if (!video) return <div className="p-8">Video Chapter not found.</div>;

            return (
              <div id={`video-chapter-view-${video.id}`} className="space-y-10 animate-fade-in py-6">
                
                {/* Header Banner */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      Video Idea #{video.id}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">{video.title}</h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      id={`read-checkbox-btn-${video.id}`}
                      onClick={() => {
                        if (readSections.includes(activeTab)) {
                          setReadSections(prev => prev.filter(x => x !== activeTab));
                        } else {
                          setReadSections(prev => [...prev, activeTab]);
                        }
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        readSections.includes(activeTab) 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <Check className={`h-4 w-4 ${readSections.includes(activeTab) ? "opacity-100" : "opacity-40"}`} />
                      <span>{readSections.includes(activeTab) ? "Completed Chapter" : "Mark as Finished"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Ebook core text layout */}
                  <div className="lg:col-span-7 space-y-8">
                    
                    {/* Concept Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
                      <div className="flex items-center space-x-2 text-indigo-600">
                        <Lightbulb className="h-5 w-5" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">Core Creative Concept</span>
                      </div>
                      <p className="text-sm md:text-base text-slate-700 leading-relaxed font-sans">{video.concept}</p>
                    </div>

                    {/* Viral Hook Display */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-amber-100 space-y-2">
                      <div className="flex items-center space-x-2 text-amber-600">
                        <Flame className="h-5 w-5" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">Viral Hook (Secret Catalyst)</span>
                      </div>
                      <p className="text-sm md:text-lg text-amber-900 font-bold leading-snug italic font-sans">
                        {video.hook}
                      </p>
                    </div>

                    {/* Full Interactive Script Editor Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
                      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-indigo-400" />
                          <span className="text-xs font-mono font-bold tracking-wider uppercase">Spoken Script Script (Hinglish Mixed)</span>
                        </div>
                        <button
                          id={`copy-script-btn-${video.id}`}
                          onClick={() => handleCopyText(video.script, `script-${video.id}`)}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center space-x-1 text-xs font-mono"
                          title="Copy script"
                        >
                          {copiedStates[`script-${video.id}`] ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-6 bg-slate-950/95 font-mono text-xs md:text-sm text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        {video.script}
                      </div>
                    </div>

                    {/* Detailed Shot Breakdown & Camera Angles */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-800 tracking-wider font-mono uppercase">Shot-By-Shot Sequence Map</h4>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {video.shotBreakdown.map((shot, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start space-x-4">
                            <span className="bg-indigo-100 text-indigo-700 h-6 w-6 font-mono font-extrabold rounded-full flex items-center justify-center text-xs flex-shrink-0">
                              {idx + 1}
                            </span>
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{shot}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Audio & Editing specifications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                        <div className="flex items-center space-x-2 text-indigo-600">
                          <Mic className="h-4 w-4" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">Audio Soundscape</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-normal">
                          <strong className="text-slate-800">Music Accent:</strong> {video.bgMusicStyle}
                        </p>
                        <p className="text-xs text-slate-600 leading-normal">
                          <strong className="text-slate-800">Transitions:</strong> {video.transitions}
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                        <div className="flex items-center space-x-2 text-indigo-600">
                          <Camera className="h-4 w-4" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">Camera Directing</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-normal">
                          <strong className="text-slate-800">Primary Frame:</strong> {video.cameraAngles}
                        </p>
                        <p className="text-xs text-slate-600 leading-normal">
                          <strong className="text-slate-800">Color Palette:</strong> {video.colorGradingStyle}
                        </p>
                      </div>

                    </div>

                    {/* Meta Parameters (audience, psychology, best time, CTA, hashtags) */}
                    <div className="bg-indigo-50/20 rounded-3xl p-6 border border-indigo-100/40 space-y-6">
                      <h4 className="text-xs font-bold text-indigo-900 tracking-wider font-mono uppercase">Social Optimization Metrics</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Best Posting Hour</span>
                            <span className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                              <Clock className="h-3.5 w-3.5 text-indigo-500" />
                              <span>{video.postingTime}</span>
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Target Audience Core</span>
                            <span className="text-xs font-semibold text-slate-800">{video.targetAudience}</span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">B-Roll Visual Action</span>
                            <span className="text-xs font-semibold text-slate-800">{video.bRollIdeas}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Viral Psychology Hook</span>
                            <span className="text-xs font-semibold text-slate-800">{video.viralPsychology}</span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Client Monetization Strategy</span>
                            <span className="text-xs font-semibold text-indigo-700 font-bold">{video.conversionStrategy}</span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Automated CTA Phrase</span>
                            <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded-md inline-block">
                              {video.cta}
                            </span>
                          </div>
                        </div>

                      </div>

                      <div className="pt-4 border-t border-slate-200">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2">Primary AI Tools Configured</span>
                        <div className="flex flex-wrap gap-2">
                          {video.aiToolsUsed.map((tool, index) => (
                            <span key={index} className="bg-slate-900 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-md">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>


                  {/* Right Column: Interactive creators side dashboard: IG mockup & AI generator */}
                  <div className="lg:col-span-5 space-y-8">
                    
                    {/* Interactive Simulated Social Mobile Interface Mockup */}
                    <div className="bg-slate-950 text-white rounded-[32px] border-4 border-slate-800 shadow-2xl p-4 overflow-hidden space-y-4 relative">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full" />
                      
                      {/* Sub-Header: Instagram screen simulation label */}
                      <div className="flex justify-between items-center text-[10px] font-mono font-semibold text-indigo-400 tracking-wider pt-2 border-b border-white/5 pb-2">
                        <span>REEL INSTANT PREVIEW</span>
                        <span className="bg-red-500 text-white font-bold h-2 w-2 rounded-full alive-pulse" />
                      </div>

                      {/* Content Visual Frame */}
                      <div className="bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-950 aspect-[9/10] rounded-2xl flex flex-col justify-between p-4 relative overflow-hidden">
                        
                        {/* Simulated Visual Overlay Grid */}
                        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-3xs" />
                        <div className="absolute top-4 left-4 z-10 bg-black/40 text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                          <EyeIcon className="h-3 w-3 text-red-400" />
                          <span>SIMULATED REEL FRAME</span>
                        </div>

                        {/* Middle Action Indicator */}
                        <div className="my-auto mx-auto relative z-10 flex flex-col items-center space-y-2 cursor-pointer group">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/40 border border-white/30 rounded-full flex items-center justify-center transition-all">
                            <Play className="h-4 w-4 text-white fill-current" />
                          </div>
                          <span className="text-[10px] text-zinc-300 font-mono">Tap for Shot 1 Preview</span>
                        </div>

                        {/* Lower Instagram Info details overlays */}
                        <div className="relative z-10 space-y-2 mt-auto">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 via-purple-600 to-pink-500 rounded-full flex items-center justify-center font-bold text-[10px]">
                              PK
                            </div>
                            <div>
                              <span className="text-[11px] font-bold">pritam_ai</span>
                              <span className="text-[9px] text-zinc-300 ml-1.5 font-mono">Original Audio</span>
                            </div>
                          </div>

                          <p className="text-[10px] leading-relaxed line-clamp-2 text-zinc-200">
                            <strong>{video.hook}</strong> {video.caption}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {video.hashtags.map((tag, tagIdx) => (
                              <span key={tagIdx} className="text-[9px] text-indigo-300 font-medium">#{tag}</span>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Social metrics buttons */}
                        <div className="absolute right-4 bottom-12 z-10 flex flex-col items-center space-y-4">
                          <div className="text-center group cursor-pointer" onClick={() => {
                            setHasLiked(!hasLiked);
                            setSimulatedLikes(prev => hasLiked ? prev - 1 : prev + 1);
                          }}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${hasLiked ? "bg-rose-500 text-white" : "bg-black/40 hover:bg-black/60 text-white"}`}>
                              <HeartIcon className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-[9px] font-mono mt-1 block">{simulatedLikes}</span>
                          </div>

                          <div className="text-center cursor-pointer">
                            <div className="w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white shadow-md transition-all">
                              <CommentIcon className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-[9px] font-mono mt-1 block">{simulatedComments}</span>
                          </div>

                          <div className="text-center cursor-pointer">
                            <div className="w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white shadow-md transition-all">
                              <Share2 className="h-4.5 w-4.5" />
                            </div>
                            <span className="text-[9px] font-mono mt-1 block">{simulatedShares}</span>
                          </div>
                        </div>

                      </div>

                      {/* Display thumbnail ideation text */}
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#a3a3a3] block">Cover Thumbnail Ideation</span>
                        <p className="text-xs text-slate-200 font-semibold mt-1">{video.thumbnailIdea}</p>
                      </div>

                    </div>


                    {/* ----------------------------------------------------
                        INTERACTIVE AI SCRIPT GENERATOR CLIENT PANEL
                        ---------------------------------------------------- */}
                    <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 shadow-xl space-y-6 relative border border-indigo-400/20">
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-indigo-400">
                          <Sparkles className="h-5 w-5 fill-current" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">AI Script Extrapolator</span>
                        </div>
                        <h4 className="text-base font-bold">Customize this Video for your niche dosto!</h4>
                        <p className="text-[11px] text-indigo-200">
                          Convert Pritam Kumar's base template into a custom, highly specific reel tailored directly to your industry's exact customer pain points.
                        </p>
                      </div>

                      {/* Input form */}
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block">Your Target Agency Niche</label>
                          <input
                            id="niche-input"
                            type="text"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g., Dentist, Real Estate, E-commerce, Gym..."
                            className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-indigo-300/40 focus:outline-none focus:border-indigo-400 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block">Target Audience</label>
                            <input
                              id="audience-input"
                              type="text"
                              value={audience}
                              onChange={(e) => setAudience(e.target.value)}
                              placeholder="e.g., Small Clinics, D2C Brands"
                              className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-indigo-300/40 focus:outline-none focus:border-indigo-400 transition-colors"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block">Brand Mood Tone</label>
                            <select
                              id="tone-select"
                              value={tone}
                              onChange={(e) => setTone(e.target.value)}
                              className="w-full bg-indigo-950 border border-indigo-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400 focus:ring-0"
                            >
                              <option value="Cinematic, Energetic & Direct">Cinematic & Direct</option>
                              <option value="Humorous & Speed-Race style">Humorous & Fast</option>
                              <option value="Scientific, Deep Educational">Deep Educational</option>
                              <option value="Inspirational & Emotional">Emotional & Story-driven</option>
                            </select>
                          </div>
                        </div>

                        <button
                          id="submit-niche-customscript-btn"
                          onClick={() => handleGenerateScript(video)}
                          disabled={aiGenerating}
                          className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs hover:shadow-lg hover:shadow-indigo-500/10 transition-all flex items-center justify-center space-x-2"
                        >
                          {aiGenerating ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-white" />
                              <span>AI Generating Custom Script...</span>
                            </>
                          ) : (
                            <>
                              <Cpu className="h-4 w-4" />
                              <span>Generate Customized Script with Gemini AI</span>
                            </>
                          )}
                        </button>
                      </div>

                      {apiError && (
                        <div className="text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg font-mono">
                          {apiError}
                        </div>
                      )}

                      {/* Generated Output Showcase block */}
                      {generatedScript && (
                        <div className="bg-white text-slate-800 rounded-2xl p-4 border border-indigo-100 shadow-md space-y-4">
                          <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-full">
                              {generatedScript.isDemoMode ? "DEMO AI VERSION" : "DYNAMIC CUSTOM RESULT"}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">Ready to Post</span>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">Custom Scroll Hook</span>
                              <p className="text-xs font-bold text-slate-800 italic mt-0.5">{generatedScript.hook}</p>
                            </div>

                            <div>
                              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">Custom Voice Script</span>
                              <p className="text-xs text-slate-600 mt-1 whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-[11px] leading-relaxed">
                                {generatedScript.script}
                              </p>
                            </div>

                            <div>
                              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">Targeted Client Acquisition Strategy</span>
                              <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50 text-emerald-900 border border-emerald-100 p-2.5 rounded-lg mt-0.5 font-sans">
                                {generatedScript.clientStrategy}
                              </p>
                            </div>
                            
                            <div className="flex justify-end pt-2 border-t text-[11px] font-mono text-slate-400 gap-4">
                              <button 
                                onClick={() => handleCopyText(generatedScript.script, "gen-script")}
                                className="hover:text-indigo-600 flex items-center space-x-1"
                              >
                                {copiedStates["gen-script"] ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                                <span>{copiedStates["gen-script"] ? "Copied Script!" : "Copy Full Script"}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                </div>

                {/* Progress Navigation Button controls footer for this video page */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                  <button
                    id="btn-video-prev"
                    onClick={handlePrev}
                    className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous page</span>
                  </button>
                  <button
                    id="btn-video-next"
                    onClick={handleNext}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-transform flex items-center space-x-2 text-xs"
                  >
                    <span>Next Chapter</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            );
          })()}

          {/* 5. CHAPTER BONUS VIEW */}
          {activeTab.startsWith("bonus-") && (() => {
            const bonusId = activeTab.split("-")[1];
            const bonus = BONUS_SECTIONS.find(b => b.id === bonusId);
            if (!bonus) return <div className="p-8">Bonus Strategy not found.</div>;

            return (
              <div id={`bonus-chapter-view-${bonus.id}`} className="space-y-10 animate-fade-in py-6">
                
                {/* Header Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      Premium Masterclass Bonus
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">{bonus.title}</h2>
                  </div>

                  <div>
                    <button
                      id={`read-checkbox-btn-${bonus.id}`}
                      onClick={() => {
                        if (readSections.includes(activeTab)) {
                          setReadSections(prev => prev.filter(x => x !== activeTab));
                        } else {
                          setReadSections(prev => [...prev, activeTab]);
                        }
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        readSections.includes(activeTab) 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <Check className={`h-4 w-4 ${readSections.includes(activeTab) ? "opacity-100" : "opacity-40"}`} />
                      <span>{readSections.includes(activeTab) ? "Completed Bonus" : "Mark as Finished"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Direct strategies */}
                  <div className="lg:col-span-7 space-y-6 text-sm md:text-base text-slate-600 leading-relaxed font-sans">
                    {bonus.content.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Right Column: Interactive checklist and tips */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {bonus.checklist && (
                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                        <span className="text-xs font-mono font-semibold tracking-wider text-purple-600 uppercase block">Implementation Checklist</span>
                        
                        <div className="space-y-3">
                          {bonus.checklist.map((item, idx) => (
                            <label key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-slate-600 leading-snug cursor-pointer select-none">
                              <input 
                                type="checkbox" 
                                className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 focus:ring-0 border-slate-300 h-4 w-4"
                              />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {bonus.tips && (
                      <div className="bg-gradient-to-br from-purple-50 via-indigo-50/30 to-slate-100 rounded-2xl p-6 border border-purple-100/40 shadow-sm space-y-2">
                        <span className="text-xs font-mono font-semibold text-purple-600 uppercase">Creator Expert Tip</span>
                        {bonus.tips.map((tip, index) => (
                          <p key={index} className="text-xs md:text-sm text-slate-700 leading-relaxed font-sans italic">
                            “{tip}”
                          </p>
                        ))}
                      </div>
                    )}

                  </div>

                </div>

                {/* Footer sequence control */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                  <button
                    id="btn-bonus-prev"
                    onClick={handlePrev}
                    className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous page</span>
                  </button>
                  <button
                    id="btn-bonus-next"
                    onClick={handleNext}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-transform flex items-center space-x-2 text-xs"
                  >
                    <span>Next Chapter</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            );
          })()}

          {/* 6. GRADUATION / CERTIFICATE VIEW */}
          {activeTab === "graduation" && (
            <div id="graduation-view" className="space-y-12 animate-fade-in py-6">
              
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Award className="h-8 w-8 text-purple-600 fill-current" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">“Start Posting. Start Building. Start Winning.”</h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  You have successfully crawled the 10 viral video blueprints and 10 premium founder masterclass templates. You are officially ready to deploy!
                </p>
              </div>

              {/* Founder motivational quote frame */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
                
                <blockquote className="space-y-4 relative z-10 text-center max-w-xl mx-auto">
                  <p className="text-lg md:text-2xl font-bold font-sans tracking-tight italic leading-relaxed text-indigo-100">
                    “Dosto, virality can be programmed, but executing with absolute consistency and showing real proof-of-work is up to you. Pick one idea, type your niche to build a custom AI script, get behind the smartphone camera, and upload. 2026 waits for absolutely no one.”
                  </p>
                  <cite className="block text-xs font-mono font-bold tracking-widest uppercase text-cyan-400">
                    — Pritam Kumar, Future Founder & CEO
                  </cite>
                </blockquote>
              </div>


              {/* Interactive Certificate Generator */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xl space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">Generate Your Creator Certification</h3>
                  <p className="text-xs text-slate-500">
                    Complete your learning milestone. Type your full name to generate a downloadable high-resolution AI Creator Certificate of Readiness.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="student-name-input"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your full name..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                  />
                  <button
                    id="generate-certificate-btn"
                    onClick={() => {
                      if (!studentName.trim()) {
                        alert("Please enter a valid developer or creator name to print.");
                        return;
                      }
                      setIsCertificateGenerated(true);
                      markSectionAsRead("graduation");
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-colors"
                  >
                    Build Certificate
                  </button>
                </div>

                {isCertificateGenerated && (
                  <div id="certified-diploma-display" className="border-8 border-slate-900 bg-white p-6 md:p-12 text-center rounded-2xl relative shadow-inner space-y-8 max-w-3xl mx-auto overflow-hidden">
                    {/* Decorative gold background stamp detail */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                      <Award className="h-96 w-96 text-amber-500" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#a3a3a3] uppercase block">Milestone Certification</span>
                      <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900">CERTIFICATE OF READINESS</h4>
                      <p className="text-xs text-slate-500 mt-1 font-mono uppercase">2026 AI AUTOMATION AGENCY & SHORT-FORM STRATEGY</p>
                    </div>

                    <div className="py-2 border-y border-slate-100 max-w-xs mx-auto text-xs text-slate-400">
                      Granted by Future Founder Vision
                    </div>

                    <div className="space-y-2">
                      <div className="text-slate-500 italic text-xs">This document proudly verifies that</div>
                      <div className="text-2xl md:text-4xl font-extrabold text-indigo-700 tracking-tight font-serif uppercase underline decoration-indigo-200 decoration-4 underline-offset-8">
                        {studentName}
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                      has successfully reviewed the 10 vital viral video formats, hooks, shooting templates, editing structures, CTA algorithms and client conversion playbooks.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-6 border-t border-slate-100 max-w-xl mx-auto">
                      <div className="text-left space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Verification Authority</span>
                        <div className="text-xs font-bold font-mono tracking-tight text-slate-700">PRITAM KUMAR</div>
                        <div className="text-[9px] text-slate-400">Chief Executive — Future Founder Vision 2026</div>
                      </div>

                      <div className="text-left sm:text-right space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">Date of Accomplishment</span>
                        <div className="text-xs text-slate-700 font-mono font-bold">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                        <div className="text-[9px] text-slate-400">Timestamp secured server-side</div>
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Graduation sequence controls */}
              <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                <button
                  id="btn-graduation-prev"
                  onClick={handlePrev}
                  className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous Chapter</span>
                </button>
                <button
                  id="btn-graduation-top"
                  onClick={() => { setActiveTab("cover"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-transform flex items-center space-x-2 text-xs"
                >
                  <span>Return to Cover</span>
                </button>
              </div>

              {/* Footnote */}
              <footer className="text-center text-xs text-slate-400 border-t border-slate-100 pt-8">
                Powered by Future Founder Vision 2026 — Built with modern luxury design principles.
              </footer>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}

// ----------------------------------------------------
// MINI INLINE ICONS USED FOR COMPACT PREVIEWS
// ----------------------------------------------------
function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "h-5 w-5"}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function CommentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className || "h-5 w-5"}>
      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  );
}

function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={props.className || "h-4 w-4"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  );
}
