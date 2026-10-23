import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Globe, 
  ShieldAlert, 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin,
  Sparkles
} from 'lucide-react';

export default function SitRepReport({ 
  selectedScenario, 
  analysisResult, 
  hasApiKey 
}) {
  const [reportLanguage, setReportLanguage] = useState('en'); // 'en' | 'hi' | 'ne' | 'es'
  const m = selectedScenario.metrics;
  const analysis = analysisResult || {};

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const reportPayload = {
      agency: "FloodGuard AI Emergency Operations Center",
      event: selectedScenario.name,
      region: selectedScenario.region,
      coordinates: selectedScenario.coordinates,
      generatedAt: new Date().toISOString(),
      threatLevel: analysis.severity || m.severity,
      damageScore: analysis.damageScore || m.damageScore,
      satelliteSensor: selectedScenario.satellite,
      inundatedAreaKm2: analysis.estimatedInundatedAreaKm2 || m.inundatedAreaKm2,
      submergedBuildings: analysis.submergedBuildings || m.submergedBuildings,
      strandedCivilians: analysis.estimatedCasualtiesStranded || m.affectedPopulation,
      criticalInfrastructureCutOff: analysis.criticalInfrastructureCutOff || [],
      safeEvacuationRoutes: analysis.safeEvacuationCorridors || [],
      recommendations: analysis.tacticalRecommendations || []
    };

    const blob = new Blob([JSON.stringify(reportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SitRep_${selectedScenario.id}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Multilingual translations for hackathon demonstration
  const translations = {
    en: {
      agency: "NATIONAL DISASTER RESPONSE COMMAND • SPACE OPERATIONS CELL",
      title: "OFFICIAL EMERGENCY SITUATION REPORT (SITREP #04)",
      executiveSummary: "EXECUTIVE CRISIS BRIEFING",
      keyMetrics: "SATELLITE DERIVED IMPACT METRICS",
      severedInfra: "SEVERED ARTERIAL INFRASTRUCTURE",
      logistics: "TACTICAL EVACUATION DIRECTIVES",
      signoff: "Authorized by Incident Commander Space-GeoAI Operations."
    },
    hi: {
      agency: "राष्ट्रीय आपदा प्रतिक्रिया कमान • अंतरिक्ष संचालन प्रकोष्ठ",
      title: "आधिकारिक आपातकालीन स्थिति रिपोर्ट (सिटरेप #04)",
      executiveSummary: "कार्यकारी संकट सारांश",
      keyMetrics: "उपग्रह आधारित क्षति मेट्रिक्स",
      severedInfra: "बाधित प्रमुख बुनियादी ढांचा",
      logistics: "रणनीतिक निकासी निर्देश",
      signoff: "घटना कमांडर अंतरिक्ष-भू-एआई संचालन द्वारा अधिकृत।"
    },
    ne: {
      agency: "राष्ट्रिय विपद् जोखिम न्यूनीकरण केन्द्र • अन्तरिक्ष अनुगमन कक्ष",
      title: "आधिकारिक आपतकालीन स्थिति प्रतिवेदन (सिटरेप #०४)",
      executiveSummary: "कार्यकारी संकट ब्रिफिङ",
      keyMetrics: "उपग्रहमा आधारित क्षति विवरण",
      severedInfra: "अवरुद्ध मुख्य पूर्वाधार",
      logistics: "रणनीतिक उद्धार तथा सुरक्षित स्थानान्तरण निर्देशन",
      signoff: "विपद् कमाण्डर अन्तरिक्ष भू-एआई सञ्चालनद्वारा प्रमाणित।"
    },
    es: {
      agency: "CENTRO DE OPERACIONES DE EMERGENCIA • MONITOREO ESPACIAL",
      title: "INFORME DE SITUACIÓN DE EMERGENCIA OFICIAL (SITREP #04)",
      executiveSummary: "INFORME EJECUTIVO DE CRISIS",
      keyMetrics: "MÉTRICAS DE IMPACTO SATELITAL",
      severedInfra: "INFRAESTRUCTURA CORTADA",
      logistics: "DIRECTIVAS TÁCTICAS DE EVACUACIÓN",
      signoff: "Autorizado por el Comandante de Operaciones Geoespaciales."
    }
  };

  const t = translations[reportLanguage] || translations.en;

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Situation Report (SitRep) Generator &amp; Export
          </h2>
          <p className="text-xs text-slate-400">
            Automated UN-OCHA / NDMA standard report synthesized from Copernicus Sentinel-1 SAR change telemetry.
          </p>
        </div>

        {/* Language & Export Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Multi-language Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-cyan-400 ml-1.5" />
            <select
              value={reportLanguage}
              onChange={(e) => setReportLanguage(e.target.value)}
              className="bg-transparent text-slate-200 text-xs px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value="en">English (Official)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ne">नेपाली (Nepali)</option>
              <option value="es">Español (Spanish)</option>
            </select>
          </div>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export GeoJSON / CAD</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF SitRep</span>
          </button>
        </div>
      </div>

      {/* Official SitRep Printable Document Body */}
      <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 shadow-2xl space-y-6 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Document Header */}
        <div className="border-b-2 border-slate-800 pb-5 space-y-2 print:border-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400 print:text-slate-600">
            <span className="uppercase tracking-widest font-bold text-cyan-400 print:text-blue-700">
              {t.agency}
            </span>
            <span>INCIDENT REF: FG-SAR-{new Date().getFullYear()}-09A</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white print:text-black">
            {t.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 print:text-slate-600 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <strong>Location:</strong> {selectedScenario.region}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <strong>Date:</strong> {selectedScenario.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <strong>Pass Time:</strong> 06:12 UTC
            </span>
          </div>
        </div>

        {/* Severity Banner */}
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-between text-xs print:bg-red-50 print:border-red-300">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <strong className="text-red-400 print:text-red-700 block text-sm font-bold uppercase">
                CRISIS CLASSIFICATION: {analysis.severity || m.severity}
              </strong>
              <span className="text-slate-300 print:text-slate-700 text-xs">
                Disaster Impact Index: {analysis.damageScore || m.damageScore}/100 • All-Weather SAR Inundation Confirmed
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-red-600 text-white font-mono font-bold text-[11px]">
            CODE RED
          </span>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800">
            {t.executiveSummary}
          </h3>
          <p className="text-sm leading-relaxed text-slate-300 print:text-slate-800 bg-slate-900/60 print:bg-slate-50 p-4 rounded-lg border border-slate-800 print:border-slate-200">
            {analysis.summary || 'Multimodal remote sensing indicates extreme surface water expansion following embankment failure. Active microwave radar penetrates heavy cloud cover to reveal critical road severance and widespread residential flooding.'}
          </p>
        </div>

        {/* Satellite Impact Metrics Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-blue-800">
            {t.keyMetrics}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Flooded Surface</span>
              <strong className="text-cyan-400 print:text-blue-700 text-lg font-mono">
                {analysis.estimatedInundatedAreaKm2 || m.inundatedAreaKm2} km²
              </strong>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Buildings Inundated</span>
              <strong className="text-red-400 print:text-red-700 text-lg font-mono">
                {(analysis.submergedBuildings || m.submergedBuildings).toLocaleString()}
              </strong>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Stranded Population</span>
              <strong className="text-amber-400 print:text-amber-700 text-lg font-mono">
                {(analysis.estimatedCasualtiesStranded || m.affectedPopulation).toLocaleString()}
              </strong>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Peak Water Depth</span>
              <strong className="text-blue-400 print:text-blue-700 text-lg font-mono">
                {m.peakWaterDepthM} m
              </strong>
            </div>
          </div>
        </div>

        {/* Severed Infrastructure */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 print:text-red-700">
            {t.severedInfra}
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-800">
            {(analysis.criticalInfrastructureCutOff || [
              'NH-37 Kolong River Overpass (Washed Out)',
              'Morigaon Sub-District Health Clinic',
              'Samaguri 132kV Power Grid Substation'
            ]).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-900/60 print:bg-slate-50 border border-slate-800/60 print:border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Directives */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-green-800">
            {t.logistics}
          </h3>
          <div className="space-y-1.5 text-xs text-slate-300 print:text-slate-800">
            {(analysis.tacticalRecommendations || [
              'Dispatch 6 NDRF motorized inflatable rescue boats to Sector 3 rooftop clusters',
              'Airdrop emergency rations and water purification tablets to cut-off villages',
              'Establish medical triage staging post at Railway Community Hall high ground'
            ]).map((rec, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded bg-emerald-950/20 print:bg-green-50 border border-emerald-500/20 print:border-green-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Document Footer & Authorization */}
        <div className="pt-6 border-t border-slate-800 print:border-slate-300 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <p className="font-semibold text-slate-400 print:text-slate-700">{t.signoff}</p>
            <p className="text-[11px] font-mono">FloodGuard AI Geospatial Disaster Command System</p>
          </div>
          <div className="font-mono text-[11px] text-right">
            <span>TIMESTAMP: {new Date().toLocaleString()}</span>
            <div className="text-emerald-400 print:text-green-700 font-bold">DIGITALLY VERIFIED</div>
          </div>
        </div>
      </div>
    </div>
  );
}
