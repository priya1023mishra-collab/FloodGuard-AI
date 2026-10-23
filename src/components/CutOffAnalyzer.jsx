import React, { useState } from 'react';
import { 
  Route, 
  AlertOctagon, 
  Ship, 
  Plane, 
  Home, 
  Hospital, 
  CheckCircle, 
  Clock, 
  ShieldCheck,
  Send
} from 'lucide-react';

export default function CutOffAnalyzer({ selectedScenario }) {
  const [isolatedVillages, setIsolatedVillages] = useState([
    {
      id: 1,
      name: 'Sector 3 Rooftop Cluster (Kolong Riverbank)',
      population: 1840,
      isolationCause: 'NH-37 Bridge collapsed + 2.4m flood surge',
      status: 'URGENT RESCUE',
      urgency: 'Critical',
      suppliesLeftHours: 8,
      dispatchedUnits: []
    },
    {
      id: 2,
      name: 'Morigaon Sub-District Clinic Island',
      population: 48,
      isolationCause: 'Hospital perimeter submerged (1.6m water depth)',
      status: 'PATIENT EVACUATION',
      urgency: 'Critical',
      suppliesLeftHours: 6,
      dispatchedUnits: []
    },
    {
      id: 3,
      name: 'Majuli Alluvial Hamlet #4',
      population: 920,
      isolationCause: 'Secondary dike breach; surrounded by backwater',
      status: 'ISOLATED',
      urgency: 'Severe',
      suppliesLeftHours: 18,
      dispatchedUnits: []
    },
    {
      id: 4,
      name: 'Samaguri Power Colony East',
      population: 640,
      isolationCause: 'Culvert washout on East Access Road',
      status: 'ISOLATED',
      urgency: 'Moderate',
      suppliesLeftHours: 24,
      dispatchedUnits: []
    }
  ]);

  const [dispatchLogs, setDispatchLogs] = useState([
    { id: 1, text: 'Rescue Motorboat Unit Bravo deployed to Sector 3 rooftop cluster', time: '10m ago' },
    { id: 2, text: 'UAV Medical Recon flight completed over Morigaon Clinic', time: '22m ago' }
  ]);

  const handleDispatch = (villageId, unitType) => {
    setIsolatedVillages(prev => prev.map(v => {
      if (v.id === villageId) {
        return {
          ...v,
          status: 'RELIEF IN PROGRESS',
          dispatchedUnits: [...v.dispatchedUnits, unitType]
        };
      }
      return v;
    }));

    const village = isolatedVillages.find(v => v.id === villageId);
    setDispatchLogs(prev => [
      {
        id: Date.now(),
        text: `Dispatched ${unitType} to ${village?.name || 'Isolated Zone'}`,
        time: 'Just now'
      },
      ...prev
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Route className="w-5 h-5 text-cyan-400" />
            "Who Is Cut Off?" — Graph Network Isolation Analysis
          </h2>
          <p className="text-xs text-slate-400">
            Automated graph connectivity algorithm intersects Sentinel-1 flood extents with OpenStreetMap road topologies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-red-950/80 border border-red-500/30 text-xs font-mono text-red-300 font-bold">
            4 CRITICAL ISOLATED ZONES IDENTIFIED
          </span>
        </div>
      </div>

      {/* Main Grid: Isolated Settlements List & Relief Dispatch Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Cut-Off Settlements */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-slate-300">
              Isolated Populations Requiring Dispatch
            </span>
            <span>Sorted by Urgency Index</span>
          </div>

          <div className="space-y-3">
            {isolatedVillages.map(village => (
              <div 
                key={village.id}
                className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                    <h3 className="text-sm font-bold text-white">
                      {village.name}
                    </h3>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    village.urgency === 'Critical' 
                      ? 'bg-red-950 text-red-300 border border-red-700' 
                      : 'bg-amber-950 text-amber-300 border border-amber-700'
                  }`}>
                    {village.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Cut-Off Population</span>
                    <strong className="text-white text-sm font-mono">{village.population.toLocaleString()} civilians</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Cause of Severance</span>
                    <span className="text-slate-300 text-xs">{village.isolationCause}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Clean Water Depletion</span>
                    <strong className="text-amber-400 font-mono">{village.suppliesLeftHours} hrs remaining</strong>
                  </div>
                </div>

                {village.dispatchedUnits.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Active Units En Route:</span>
                    {village.dispatchedUnits.map((u, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                        {u}
                      </span>
                    ))}
                  </div>
                )}

                {/* Dispatch Unit Actions */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    Instant Relief Allocation:
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDispatch(village.id, 'NDRF Motorized Boat')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-300 text-xs transition-colors cursor-pointer"
                    >
                      <Ship className="w-3.5 h-3.5" />
                      <span>Deploy Rescue Boat</span>
                    </button>

                    <button
                      onClick={() => handleDispatch(village.id, 'IAF Helo Supply Airdrop')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-300 text-xs transition-colors cursor-pointer"
                    >
                      <Plane className="w-3.5 h-3.5" />
                      <span>Airdrop Rations</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Active Evac Shelters & Dispatch Feed */}
        <div className="space-y-4">
          {/* Active Shelters Capacity */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-400" />
              Emergency Relief Shelters
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Central Higher Sec. School</span>
                  <span className="font-mono text-amber-400 font-bold">88% Capacity</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[88%]" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>1,320 / 1,500 Beds Occupied</span>
                  <span className="text-emerald-400">Dry Highway Access</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Railway Community Hall</span>
                  <span className="font-mono text-emerald-400 font-bold">56% Capacity</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[56%]" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>450 / 800 Beds Occupied</span>
                  <span className="text-emerald-400">Designated Reroute Point</span>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Dispatch Telemetry Feed */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Live Dispatch Activity
              </h3>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {dispatchLogs.map(log => (
                <div key={log.id} className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <p className="leading-snug">{log.text}</p>
                  <span className="text-[10px] font-mono text-slate-500 block">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
