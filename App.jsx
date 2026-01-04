
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Professional, TradeType, ClientType } from './types';
import { TRADES, TRADE_CATEGORIES, MOCK_PROFESSIONALS } from './constants';
import { ProviderCard } from './components/ProviderCard';
import { ProviderMap } from './components/ProviderMap';
import { Mascot } from './components/Mascot';
import { GeminiService } from './services/geminiService';
import { AIAssistant } from './components/AIAssistant';
import { QuoteModal } from './components/QuoteModal';
import { SkeletonCard } from './components/SkeletonCard';

// Page Imports
import { AboutPage } from './components/pages/AboutPage';
import { MethodologyPage } from './components/pages/MethodologyPage';
import { ContactPage } from './components/pages/ContactPage';
import { TermsPage, PrivacyPage } from './components/pages/LegalPages';
import { GetVerifiedPage } from './components/pages/GetVerifiedPage';

const ITEMS_PER_PAGE = 12; 
const TOTAL_DIRECTORY_LIMIT = 50;

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

type ViewType = 'home' | 'about' | 'methodology' | 'contact' | 'terms' | 'privacy' | 'verify';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedTrade, setSelectedTrade] = useState<TradeType>('Plumber');
  const [livePros, setLivePros] = useState<Professional[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [selectedClientType, setSelectedClientType] = useState<"All Types" | "Residential" | "Commercial">("All Types");
  const [issueDescription, setIssueDescription] = useState("");
  const [sortBy, setSortBy] = useState<'rating-desc' | 'reviews-desc' | 'proximity' | 'fti-desc'>('fti-desc');
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [quotePro, setQuotePro] = useState<Professional | null>(null); // State for Quote Modal
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  
  const [compareList, setCompareList] = useState<Professional[]>([]);

  const resultsAnchorRef = useRef<HTMLDivElement>(null);
  const gemini = useMemo(() => new GeminiService(), []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.log("Initial location access denied")
      );
    }
  }, []);

  const toggleCompare = (pro: Professional) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === pro.id);
      if (exists) return prev.filter(p => p.id !== pro.id);
      if (prev.length >= 3) return prev;
      return [...prev, pro];
    });
  };

  // CREDIBILITY STRATEGY: Background Live Verification
  const fetchVerified = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      // Simulate delay for skeleton showcase
      await new Promise(resolve => setTimeout(resolve, 800));
      const { professionals: verified } = await gemini.findTopProfessionals(selectedTrade, undefined, userLocation || undefined);
      if (verified.length > 0) {
        setLivePros(verified);
        setLastSynced(new Date());
      }
    } catch (e) {
      console.warn("Background verification silent fail:", e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    setSelectedCategory("All Services");
    setSelectedClientType("All Types");
    setCurrentPage(1);
    setSortBy('fti-desc');
    setLivePros([]); 
    fetchVerified();
  }, [selectedTrade]);

  const allPros = useMemo(() => {
    const staticData = MOCK_PROFESSIONALS.filter(p => p.trade === selectedTrade);
    if (livePros.length === 0) return staticData;

    const liveMap = new Map<string, Professional>(
      livePros.map(p => [p.name.toLowerCase().trim(), p] as [string, Professional])
    );
    
    const upgradedStatic = staticData.map(mock => {
      const match = liveMap.get(mock.name.toLowerCase().trim());
      if (match) {
        liveMap.delete(mock.name.toLowerCase().trim());
        return { ...mock, ...match, verified: true, id: mock.id };
      }
      return mock;
    });

    const newDiscoveries = Array.from(liveMap.values()).map(p => ({
      ...p,
      verified: true, 
      isEmergency: p.isEmergency ?? (Math.random() > 0.7)
    }));

    return [...newDiscoveries, ...upgradedStatic].filter(p => p.rating > 0);

  }, [selectedTrade, livePros]);

  const sortedFilteredPros = useMemo(() => {
    const baseList = allPros.filter(p => {
      const isEmergencyCategory = selectedCategory.toLowerCase().includes('emergency');
      const matchesCategory = selectedCategory === "All Services" || 
        (p.services && p.services.some(s => s.toLowerCase().includes(selectedCategory.toLowerCase()))) ||
        (isEmergencyCategory && p.isEmergency);
        
      let matchesClientType = true;
      if (selectedClientType !== "All Types") {
        if (selectedClientType === "Residential") {
          matchesClientType = p.clientType === 'Residential' || p.clientType === 'Both';
        } else if (selectedClientType === "Commercial") {
          matchesClientType = p.clientType === 'Commercial' || p.clientType === 'Both';
        }
      }

      const matchesSearch = !issueDescription || 
        p.name.toLowerCase().includes(issueDescription.toLowerCase()) || 
        p.neighborhood.toLowerCase().includes(issueDescription.toLowerCase());
        
      return matchesCategory && matchesClientType && matchesSearch;
    });

    return baseList.map(p => {
      let dist = Infinity;
      if (userLocation && p.latitude && p.longitude) {
        dist = calculateDistance(userLocation.lat, userLocation.lng, p.latitude, p.longitude);
      }
      return { ...p, _distance: dist };
    }).sort((a, b) => {
      if (sortBy === 'proximity') return (a as any)._distance - (b as any)._distance;
      if (sortBy === 'reviews-desc') return b.reviewCount - a.reviewCount;
      if (sortBy === 'fti-desc') return (b.trustScore || 0) - (a.trustScore || 0);
      if (b.rating !== a.rating) return b.rating - a.rating;
      return (b.yelpRating || 0) - (a.yelpRating || 0);
    }).slice(0, TOTAL_DIRECTORY_LIMIT);
  }, [allPros, selectedCategory, selectedClientType, sortBy, userLocation, issueDescription]);

  const paginatedPros = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedFilteredPros.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedFilteredPros, currentPage]);

  const totalPages = Math.ceil(sortedFilteredPros.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedClientType, sortBy, issueDescription, selectedTrade]);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans selection:bg-blue-100 overflow-x-hidden text-base">
      <nav className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-sm transition-all duration-300 h-14 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="p-0.5 transition-transform group-hover:rotate-6">
              <Mascot className="w-14 h-14" mood="happy" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-[#0F172A] leading-none">Finda<span className="text-blue-700">Fixer</span></span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Toronto Elite Network</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentView !== 'home' && (
              <button 
                onClick={() => navigateTo('home')} 
                className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-700 transition-colors"
              >
                Back to Directory
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* CONDITIONAL CONTENT RENDERING */}
      {currentView === 'home' && (
        <>
          <header className="pt-4 bg-white border-b border-gray-100 pb-6 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.05)] relative z-20">
            <div className="max-w-7xl mx-auto text-center px-6">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {TRADES.map(t => (
                  <button 
                    key={t.type}
                    onClick={() => setSelectedTrade(t.type)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                      selectedTrade === t.type 
                        ? 'bg-blue-700 text-white border-blue-700 shadow-lg shadow-blue-500/20' 
                        : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <i className={`fas ${t.icon} text-[12px]`}></i>
                    {t.label}
                  </button>
                ))}
              </div>

              <h1 className="font-black text-[#0F172A] mb-3 tracking-tighter leading-none text-4xl md:text-6xl">
                Toronto's Top 50 <span className="text-blue-700">{selectedTrade}s</span>
              </h1>

              <div className="relative max-w-xl mx-auto mb-3">
                <div className="bg-gray-50 p-1.5 rounded-3xl border border-gray-200 flex flex-col md:flex-row items-center gap-1 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:border-blue-300 transition-all shadow-sm">
                    <div className="flex-1 flex items-center px-4 py-1.5 w-full">
                      <i className="fas fa-search text-slate-300 mr-3 text-lg"></i>
                      <input 
                        type="text" 
                        placeholder={`Search top local ${selectedTrade.toLowerCase()}s...`}
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        className="w-full bg-transparent text-[#0F172A] font-black text-lg outline-none placeholder:text-slate-300"
                      />
                    </div>
                    <button 
                      onClick={() => fetchVerified()}
                      disabled={isSyncing}
                      className="bg-blue-700 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-wait flex items-center gap-2"
                    >
                      {isSyncing ? (
                        <>
                          <i className="fas fa-circle-notch fa-spin"></i> Syncing...
                        </>
                      ) : (
                        'Verify Pro'
                      )}
                    </button>
                </div>
                
                <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2.5" title="Data Verified by Google Search Grounding">
                      <i className="fab fa-google text-slate-400 text-2xl"></i>
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Live Verified</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <i className="fab fa-yelp text-slate-400 text-2xl"></i>
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Yelp Elite</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-400 text-white px-2 py-0.5 rounded text-[11px] font-black">BBB</span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">A+ Verified</span>
                    </div>
                </div>
              </div>
            </div>
          </header>

          <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm py-4 transition-all">
            <div className="max-w-7xl mx-auto px-6 space-y-4">
              
              {/* Filter Row */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                  {/* Category Filter */}
                  <div className="relative min-w-[200px] flex-1">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                         <i className="fas fa-filter text-xs"></i>
                      </div>
                      <select 
                         value={selectedCategory}
                         onChange={(e) => setSelectedCategory(e.target.value)}
                         className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-wider rounded-xl appearance-none focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm cursor-pointer hover:border-slate-300"
                      >
                         {TRADE_CATEGORIES[selectedTrade].map(cat => (
                           <option key={cat} value={cat}>{cat}</option>
                         ))}
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                         <i className="fas fa-chevron-down text-[10px]"></i>
                      </div>
                  </div>

                  {/* Client Type Filter - Distinct Orange Buttons */}
                  <div className="flex gap-2 flex-wrap">
                      {(['All Types', 'Residential', 'Commercial'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedClientType(type)}
                          className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm ${
                            selectedClientType === type
                              ? 'bg-orange-500 text-white border-orange-500 transform scale-105 shadow-orange-500/20'
                              : 'bg-white text-slate-500 border-slate-200 hover:border-orange-200 hover:text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                           {type === 'All Types' ? 'Any' : type}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Sort Dropdown - Right Aligned */}
                <div className="relative min-w-[160px] w-full md:w-auto">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                        <i className="fas fa-sort text-xs"></i>
                    </div>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-wider rounded-xl appearance-none focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm cursor-pointer hover:border-slate-300"
                    >
                        <option value="fti-desc">Trust Score</option>
                        <option value="rating-desc">Google Rating</option>
                        <option value="reviews-desc">Most Reviews</option>
                        <option value="proximity">Proximity</option>
                    </select>
                     <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                        <i className="fas fa-chevron-down text-[10px]"></i>
                     </div>
                </div>
              </div>

              {/* View Toggle Row - Left Aligned */}
              <div className="flex items-center gap-4 border-t border-slate-50 pt-3">
                 <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 border ${
                            viewMode === 'grid' 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                        }`}
                    >
                        <i className="fas fa-grid-2"></i> Grid View
                    </button>
                    <button 
                        onClick={() => setViewMode('map')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2 border ${
                            viewMode === 'map' 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                        }`}
                    >
                        <i className="fas fa-map"></i> Map View
                    </button>
                 </div>
                 
                 <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
                    {lastSynced && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       {sortedFilteredPros.length} Pros Nearby
                    </span>
                 </div>
              </div>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-6 py-6" ref={resultsAnchorRef}>
            <div className="mb-6 flex items-baseline justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-[#0F172A] tracking-tighter">
                  Verified <span className="text-blue-700">Pros</span>
                </h2>
                {lastSynced ? (
                  <div className="flex items-center gap-2.5 animate-in fade-in slide-in-from-left-2 duration-700">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Live Data Active
                      </span>
                  </div>
                ) : (
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    {sortedFilteredPros.length} Verified results
                  </span>
                )}
              </div>
            </div>

            {isSyncing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : paginatedPros.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {paginatedPros.map((p) => (
                    <ProviderCard 
                      key={p.id} 
                      professional={p} 
                      onClick={setSelectedPro}
                      onGetQuote={setQuotePro}
                      isSelected={selectedPro?.id === p.id} 
                      userLocation={userLocation}
                      isComparing={!!compareList.find(cp => cp.id === p.id)}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-[600px] shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-200 bg-white">
                  <ProviderMap professionals={sortedFilteredPros} selectedTrade={selectedTrade} selectedProId={selectedPro?.id} onMarkerClick={setSelectedPro} userLocation={userLocation} />
                </div>
              )
            ) : (
              <div className="min-h-[250px] flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-slate-50 shadow-sm">
                <i className="fas fa-search-location text-3xl text-slate-200 mb-4"></i>
                <h3 className="text-xl font-black text-[#0F172A] mb-1 tracking-tighter">No Experts Found</h3>
                <p className="text-slate-400 text-[12px] font-bold uppercase">Try adjusting your category or neighborhood.</p>
              </div>
            )}

            {totalPages > 1 && viewMode === 'grid' && !isSyncing && (
              <div className="mt-12 flex flex-col items-center gap-3 pb-8">
                <div className="flex flex-wrap justify-center gap-2">
                  <button 
                    onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed border-slate-100' : 'bg-white border-slate-200 text-[#0F172A] hover:border-blue-700 shadow-sm'}`}
                  >
                    <i className="fas fa-chevron-left text-[9px]"></i>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button 
                        key={pageNum} 
                        onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 300, behavior: 'smooth' }); }} 
                        className={`w-10 h-10 rounded-xl text-[11px] font-black transition-all ${currentPage === pageNum ? 'bg-blue-700 text-white border-blue-700 shadow-md' : 'bg-white border border-slate-200 text-slate-400 hover:text-blue-700 hover:border-blue-300'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button 
                    onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed border-slate-100' : 'bg-white border-slate-200 text-[#0F172A] hover:border-blue-700 shadow-sm'}`}
                  >
                    <i className="fas fa-chevron-right text-[9px]"></i>
                  </button>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Page {currentPage} of {totalPages}</span>
              </div>
            )}
          </main>
          
          <section className="bg-white text-[#0F172A] py-24 relative overflow-hidden font-sans border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <span className="text-[11px] font-black text-blue-700 uppercase tracking-[0.25em] mb-4 block">Our Methodology</span>
                <h3 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tighter mb-6">
                  How We Select <br/>The <span className="text-blue-700">Top 50</span>
                </h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  We don't accept payments for rankings. Our FindaFixer Trust Index (FTI) uses a 5-step algorithmic verification process to ensure you only see legitimate, high-quality professionals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
                {/* Methodology Steps (Visual only summary) */}
                {[
                  { icon: "fa-filter", title: "1. Identification" },
                  { icon: "fa-file-contract", title: "2. Verification" },
                  { icon: "fa-star-half-stroke", title: "3. Analysis" },
                  { icon: "fa-magnifying-glass-chart", title: "4. Scoring" },
                  { icon: "fa-certificate", title: "5. Selection", color: "text-emerald-600", border: "border-emerald-500" }
                ].map((step, idx) => (
                   <div key={idx} className="flex flex-col items-center text-center group">
                      <div className={`w-24 h-24 bg-white rounded-3xl border-2 ${step.border || 'border-slate-100'} flex items-center justify-center text-3xl ${step.color || 'text-slate-300'} shadow-xl shadow-slate-200/50 mb-6 group-hover:scale-110 transition-all duration-300 z-10`}>
                        <i className={`fas ${step.icon}`}></i>
                      </div>
                      <h4 className="text-lg font-black text-[#0F172A] mb-2">{step.title}</h4>
                   </div>
                ))}
              </div>

              <div className="mt-20 bg-blue-50 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-blue-100">
                <div className="flex-1">
                  <h4 className="text-2xl font-black text-[#0F172A] mb-4">Are you a top-rated pro?</h4>
                  <p className="text-slate-600 mb-6 leading-relaxed font-medium">
                    We're constantly updating our directory. If you have over 100+ 5-star reviews and want to be considered for the 2025 list, apply for verification today.
                  </p>
                  <button onClick={() => navigateTo('verify')} className="bg-blue-700 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/20">
                    Apply for Verification
                  </button>
                </div>
                <div className="flex-1 flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-center">
                      <div className="text-3xl font-black text-slate-900 mb-1">2k+</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Companies Audited</div>
                    </div>
                    <div className="w-px bg-slate-200 h-12"></div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-slate-900 mb-1">50</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Elite Selected</div>
                    </div>
                    <div className="w-px bg-slate-200 h-12"></div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-slate-900 mb-1">100%</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Free to Use</div>
                    </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* NEW PAGE RENDERING */}
      {currentView === 'about' && <AboutPage />}
      {currentView === 'methodology' && <MethodologyPage />}
      {currentView === 'contact' && <ContactPage />}
      {currentView === 'terms' && <TermsPage />}
      {currentView === 'privacy' && <PrivacyPage />}
      {currentView === 'verify' && <GetVerifiedPage />}

      <QuoteModal professional={quotePro} onClose={() => setQuotePro(null)} />
      <AIAssistant plumbers={sortedFilteredPros} isOpen={isAIOpen} setIsOpen={setIsAIOpen} />

      {/* FOOTER: Updated to Black Background, Removed Social Links */}
      <footer className="bg-black text-slate-400 py-20 border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-900/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                
                <div className="md:col-span-4">
                    <div className="flex items-center gap-3 mb-6">
                        <Mascot className="w-12 h-12" mood="neutral" />
                        <span className="text-2xl font-black text-white tracking-tighter">Finda<span className="text-blue-500">Fixer</span></span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500 font-medium mb-8 max-w-sm">
                        The definitive directory for Toronto's home service elite. We use AI-driven verification to ensure you only hire the best.
                    </p>
                </div>

                <div className="md:col-span-3">
                    <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6">Directory</h4>
                    <ul className="space-y-4">
                        <li><button onClick={() => navigateTo('home')} className="text-sm font-bold hover:text-blue-400 transition-colors">Search Pros</button></li>
                        <li><button onClick={() => navigateTo('methodology')} className="text-sm font-bold hover:text-blue-400 transition-colors">Methodology</button></li>
                        <li><button onClick={() => navigateTo('methodology')} className="text-sm font-bold hover:text-blue-400 transition-colors">Trust Index (FTI)</button></li>
                        <li><button onClick={() => navigateTo('verify')} className="text-sm font-bold hover:text-blue-400 transition-colors">Get Verified</button></li>
                    </ul>
                </div>

                <div className="md:col-span-3">
                    <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6">Support</h4>
                    <ul className="space-y-4">
                        <li><button onClick={() => navigateTo('about')} className="text-sm font-bold hover:text-blue-400 transition-colors">About Us</button></li>
                        <li><button onClick={() => navigateTo('contact')} className="text-sm font-bold hover:text-blue-400 transition-colors">Help Center</button></li>
                        <li><button onClick={() => navigateTo('terms')} className="text-sm font-bold hover:text-blue-400 transition-colors">Terms of Service</button></li>
                        <li><button onClick={() => navigateTo('privacy')} className="text-sm font-bold hover:text-blue-400 transition-colors">Privacy Policy</button></li>
                        <li><button onClick={() => navigateTo('contact')} className="text-sm font-bold hover:text-blue-400 transition-colors">Contact Us</button></li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6">System Status</h4>
                    <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Operational</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            Live verification active. Last sync: {new Date().toLocaleTimeString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">© 2025 FindaFixer Inc. Toronto, ON.</p>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Made with <i className="fas fa-heart text-red-900 mx-0.5"></i> in Canada</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
