import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Building2, 
  Users, 
  Waves, 
  Crosshair, 
  Sparkles, 
  Radio, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';
import StatCard from './StatCard';

export default function DamageAssessment({ 
  selectedScenario, 
  analysisResult, 
  onRunAnalysis, 
  isAnalyzing,
  hasApiKey 
}) {
  const m = selectedScenario.metrics;
  const analysis = analysisResult || {};

  return (
    <div className="space-y-6">
      {/* Top Banner: Emergency Threat Level & Severity Index */}
      <div className="glass-panel p-5 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/40 via-slate-900/60 to-slate-950 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative p-3.5 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 critical-pulse">
            <Flame className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-black bg-red-600 text-white uppercase tracking-wider">
                THREAT LEVEL 4
              </span>
              <span className="text-red-400 font-bold text-lg tracking-wide uppercase">
                {analysis.severity || m.severity} CLASSIFICATION
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Catastrophic water volume surge detected. Immediate life-safety intervention and evacuation airlift protocols active.
            </p>
          </div>
        </div>

        {/* Damage Score Meter */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-5 py-3 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
              Disaster Impact Index
            </div>
            <div className="text-3xl font-black font-mono text-red-400">
              {analysis.damageScore || m.damageScore}<span className="text-base text-slate-500">/100</span>
            </div>
          </div>
          <div className="h-10 w-2.5 rounded-full bg-slate-800 overflow-hidden flex flex-col justify-end">
            <div 
              className="w-full bg-gradient-to-t from-red-500 to-orange-400 transition-all duration-1000"
              style={{ height: `${analysis.damageScore || m.damageScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Inundated Surface"
          value={analysis.estimatedInundatedAreaKm2 || m.inundatedAreaKm2}
          unit="km²"
          subtitle={`Baseline expansion`}
          trend={`+${m.inundatedAreaIncreasePct}%`}
          variant="cyan"
          icon={Waves}
          badge="Sentinel-1 SAR"
        />

        <StatCard
          title="Submerged Buildings"
          value={(analysis.submergedBuildings || m.submergedBuildings).toLocaleString()}
          unit="structures"
          subtitle="Residential & commercial"
          trend="Level 4 Damage"
          variant="red"
          icon={Building2}
          badge="OSM Overlaid"
        />

        <StatCard
          title="Stranded Population"
          value={(analysis.estimatedCasualtiesStranded || m.affectedPopulation).toLocaleString()}
          unit="civilians"
          subtitle="Across 14 cut-off sectors"
          trend="Urgent Evac"
          variant="amber"
          icon={Users}
          badge="Demographic Est."
        />

        <StatCard
          title="Peak Water Depth"
          value={m.peakWaterDepthM}
          unit="meters"
          subtitle="Relative to high embankment"
          trend="+0.6m in 6h"
          variant="blue"
          icon={Crosshair}
          badge="DEM Derived"
        />
      </div>

      {/* Multimodal AI Vision Findings */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Multimodal AI Spaceborne Intelligence Briefing
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              {analysis.modelUsed || 'Gemini 1.5 Multi-Modal'}
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Confidence: <strong className="text-emerald-400">{analysis.confidenceScore || 97.4}%</strong>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 text-sm leading-relaxed">
          <strong className="text-cyan-400 block mb-1">Executive SitRep Summary:</strong>
          {analysis.summary || 'Multimodal analysis confirms massive water expansion across alluvial floodplains. River breach has submerged low-lying residential sectors and severed arterial bridges.'}
        </div>

        {/* Two Columns: Cut-off Infrastructure & Tactical Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Critical Infrastructure Cut Off */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Severed &amp; Submerged Infrastructure
            </h4>
            <div className="space-y-1.5">
              {(analysis.criticalInfrastructureCutOff || [
                'NH-37 Kolong River Overpass (Washed Out)',
                'Morigaon Sub-District Health Clinic',
                'Samaguri 132kV Power Grid Substation'
              ]).map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-red-950/30 border border-red-500/20 text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Action Directives */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Recommended Emergency Directives
            </h4>
            <div className="space-y-1.5">
              {(analysis.tacticalRecommendations || [
                'Dispatch 6 NDRF motorized inflatable rescue boats to Sector 3 rooftop clusters',
                'Airdrop emergency rations and water purification tablets to cut-off villages',
                'Establish medical triage staging post at Railway Community Hall high ground'
              ]).map((rec, idx) => (
                <div key={idx} className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Origin & Simulation Disclaimers */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2 font-mono">
          <span>* Satellite Imagery: Copernicus Sentinel-1 SAR &amp; Sentinel-2 MSI (Real spaceborne sensor data)</span>
          <span>* Damage estimates and casualty models generated via GeoAI heuristics and multimodal inference</span>
        </div>
      </div>
    </div>
  );
}
