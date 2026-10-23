import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SatelliteUploadCompare from './components/SatelliteUploadCompare';
import LeafletFloodMap from './components/LeafletFloodMap';
import DamageAssessment from './components/DamageAssessment';
import CutOffAnalyzer from './components/CutOffAnalyzer';
import SitRepReport from './components/SitRepReport';
import GeminiCopilot from './components/GeminiCopilot';
import ApiKeyModal from './components/ApiKeyModal';
import { PRESET_SCENARIOS } from './data/presetScenarios';
import { analyzeFloodDamageWithGemini, simulateGeospatialAnalysis } from './services/geminiService';
import { computeSatelliteImageDifference } from './utils/imageUtils';

export default function App() {
  const [scenarios] = useState(PRESET_SCENARIOS);
  const [selectedScenario, setSelectedScenario] = useState(PRESET_SCENARIOS[0]);
  const [beforeImage, setBeforeImage] = useState(PRESET_SCENARIOS[0].beforeImage);
  const [afterImage, setAfterImage] = useState(PRESET_SCENARIOS[0].afterImage);
  
  const [activeTab, setActiveTab] = useState('satellite');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Initial analysis result based on selected scenario
  const [analysisResult, setAnalysisResult] = useState(() => 
    simulateGeospatialAnalysis(PRESET_SCENARIOS[0])
  );

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('floodguard_gemini_key') || '';
    if (savedKey) setApiKey(savedKey);
  }, []);

  // Sync images when scenario changes
  useEffect(() => {
    setBeforeImage(selectedScenario.beforeImage);
    setAfterImage(selectedScenario.afterImage);
    setAnalysisResult(simulateGeospatialAnalysis(selectedScenario));
  }, [selectedScenario]);

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem('floodguard_gemini_key', newKey);
    } else {
      localStorage.removeItem('floodguard_gemini_key');
    }
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // 1. Run real canvas-based pixel difference change detection
      const diffMetrics = await computeSatelliteImageDifference(beforeImage, afterImage);

      // 2. Run Multimodal Gemini Analysis
      const result = await analyzeFloodDamageWithGemini({
        beforeImage,
        afterImage,
        scenarioMetadata: selectedScenario,
        apiKey
      });

      // 3. If real canvas diff produced valid results, blend with multimodal analysis
      if (diffMetrics.success && diffMetrics.estimatedKm2) {
        result.estimatedInundatedAreaKm2 = diffMetrics.estimatedKm2;
        result.inundatedIncreasePct = diffMetrics.percentageIncrease;
      }

      setAnalysisResult(result);
      // Auto switch to Assessment tab so user immediately sees results
      setActiveTab('assessment');
    } catch (err) {
      console.error('Analysis execution error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        setSelectedScenario={setSelectedScenario}
        hasApiKey={Boolean(apiKey)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Active Tab View */}
        {activeTab === 'satellite' && (
          <SatelliteUploadCompare
            selectedScenario={selectedScenario}
            beforeImage={beforeImage}
            setBeforeImage={setBeforeImage}
            afterImage={afterImage}
            setAfterImage={setAfterImage}
            onRunAnalysis={handleRunAnalysis}
            isAnalyzing={isAnalyzing}
            analysisResult={analysisResult}
            hasApiKey={Boolean(apiKey)}
          />
        )}

        {activeTab === 'map' && (
          <LeafletFloodMap
            selectedScenario={selectedScenario}
            onSelectFeature={(feat) => {
              console.log('Selected feature:', feat);
            }}
          />
        )}

        {activeTab === 'assessment' && (
          <DamageAssessment
            selectedScenario={selectedScenario}
            analysisResult={analysisResult}
            onRunAnalysis={handleRunAnalysis}
            isAnalyzing={isAnalyzing}
            hasApiKey={Boolean(apiKey)}
          />
        )}

        {activeTab === 'operations' && (
          <CutOffAnalyzer
            selectedScenario={selectedScenario}
          />
        )}

        {activeTab === 'report' && (
          <SitRepReport
            selectedScenario={selectedScenario}
            analysisResult={analysisResult}
            hasApiKey={Boolean(apiKey)}
          />
        )}

        {activeTab === 'copilot' && (
          <GeminiCopilot
            selectedScenario={selectedScenario}
            analysisResult={analysisResult}
            apiKey={apiKey}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>FloodGuard AI • Spaceborne Multimodal Disaster Intelligence MVP</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span>Hackathon Track: Mapping Flood Damage from Space</span>
          <span>OpenStreetMap &bull; Leaflet &bull; Gemini 1.5 &bull; Sentinel-1 SAR</span>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaveKey={handleSaveApiKey}
        currentKey={apiKey}
      />
    </div>
  );
}
