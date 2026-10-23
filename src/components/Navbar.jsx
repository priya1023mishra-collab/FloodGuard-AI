import React from 'react';
import { 
  ShieldAlert, 
  Satellite, 
  MapPin, 
  BarChart3, 
  Route, 
  FileText, 
  Bot, 
  Key, 
  Radio, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  scenarios, 
  selectedScenario, 
  setSelectedScenario, 
  hasApiKey, 
  onOpenApiKeyModal,
  isAnalyzing
}) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top Telemetry & Status Bar */}
      <div className="border-b border-slate-800/80 px-4 py-1.5 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SPACEBORNE EO LINK: ACTIVE
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="hidden sm:flex items-center gap-1 font-mono text-slate-300">
            <Radio className="w-3.5 h-3.5 text-orange-400" />
            SENTINEL-1 SAR C-BAND (VV+VH)
          </span>
          <span className="hidden md:inline-block text-slate-600">|</span>
          <span className="hidden md:inline-block font-mono text-slate-400">
            ORBIT PASS: 2024-07-14 06:12 UTC (CLOUD PENETRATION 100%)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-xs font-medium transition-all ${
              hasApiKey 
                ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50' 
                : 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50'
            }`}
            title="Configure Google Gemini API Key"
          >
            <Key className="w-3 h-3" />
            <span>{hasApiKey ? 'Gemini API: Live' : 'Add Gemini Key'}</span>
            {hasApiKey ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            )}
          </button>

          <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/70 border border-red-500/40 text-red-300 font-mono text-[11px] font-bold">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            DISASTER CODE RED
          </span>
        </div>
      </div>

      {/* Main Header / Navigation Bar */}
      <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-800 text-white shadow-lg shadow-cyan-500/20">
            <ShieldAlert className="w-6 h-6 text-cyan-200" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-950 animate-ping"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                FloodGuard <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AI</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                Hackathon MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Mapping Flood Damage from Space • Multimodal AI Emergency EOC
            </p>
          </div>
        </div>

        {/* Preset Crisis Scenario Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg p-1.5">
          <label className="text-xs font-medium text-slate-400 pl-2 hidden md:inline">
            Active Event:
          </label>
          <select 
            value={selectedScenario.id}
            onChange={(e) => {
              const found = scenarios.find(s => s.id === e.target.value);
              if (found) setSelectedScenario(found);
            }}
            className="bg-slate-950 text-slate-200 text-xs font-semibold rounded px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:border-cyan-500"
          >
            {scenarios.map(sc => (
              <option key={sc.id} value={sc.id}>
                📍 {sc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tab Navigation Controls */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('satellite')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'satellite' 
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>Satellite Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'map' 
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Geospatial Map</span>
          </button>

          <button
            onClick={() => setActiveTab('assessment')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'assessment' 
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Damage Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('operations')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'operations' 
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Route className="w-3.5 h-3.5" />
            <span>Who Is Cut Off?</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'report' 
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>SitRep Export</span>
          </button>

          <button
            onClick={() => setActiveTab('copilot')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'copilot' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 font-semibold' 
                : 'text-cyan-400 hover:text-cyan-200 hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Copilot</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
