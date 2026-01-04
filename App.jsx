import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Professional, TradeType, ClientType } from './types.jsx';
import { TRADES, TRADE_CATEGORIES, MOCK_PROFESSIONALS } from './constants.jsx';
import { ProviderCard } from './components/ProviderCard.jsx';
import { ProviderMap } from './components/ProviderMap.jsx';
import { Mascot } from './components/Mascot.jsx';
import { GeminiService } from './services/geminiService.jsx';
import { AIAssistant } from './components/AIAssistant.jsx';
import { QuoteModal } from './components/QuoteModal.jsx';
import { SkeletonCard } from './components/SkeletonCard.jsx';

// Page Imports
import { AboutPage } from './components/pages/AboutPage.jsx';
import { MethodologyPage } from './components/pages/MethodologyPage.jsx';
import { ContactPage } from './components/pages/ContactPage.jsx';
import { TermsPage, PrivacyPage } from './components/pages/LegalPages.jsx';
import { GetVerifiedPage } from './components/pages/GetVerifiedPage.jsx';

const ITEMS_PER_PAGE = 12; 
const TOTAL_DIRECTORY_LIMIT = 50;

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTrade, setSelectedTrade] = useState('Plumber');
  const [livePros, setLivePros] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [selectedClientType, setSelectedClientType] = useState("All Types");
  const [issueDescription, setIssueDescription] = useState("");
  const [sortBy, setSortBy] = useState('fti-desc');
  const [selectedPro, setSelectedPro] = useState(null);
  const [quotePro, setQuotePro] = useState(null); 
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [userLocation, setUserLocation] = useState(null);
  const [lastSynced, setLastSynced] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  
  const [compareList, setCompareList] = useState([]);

  const resultsAnchorRef = useRef(null);
  const gemini = useMemo(() => new GeminiService(), []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.log("Initial location access denied")
      );
    }
  }, []);

  const toggleCompare = (pro) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === pro.id);
      if (exists) return prev.filter(p => p.id !== pro.id);
      if (prev.length >= 3) return prev;
      return [...prev, pro];
    });
  };

  const fetchVerified = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
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
    const staticData = MOCK_PROFESSIONALS.filter(p =>
