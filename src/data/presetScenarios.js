// Preset scenarios for instant hackathon demonstrations
// Includes high-fidelity pre-flood baseline and post-flood satellite imagery data

const generateSatelliteSVG = (type, variant) => {
  if (type === 'assam') {
    if (variant === 'before') {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="terrain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%232d5a27"/>
            <stop offset="50%" stop-color="%233e6b30"/>
            <stop offset="100%" stop-color="%231e4018"/>
          </linearGradient>
          <linearGradient id="river" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="%231a4a6e"/>
            <stop offset="100%" stop-color="%23143c5a"/>
          </linearGradient>
          <pattern id="farmland" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="%23437a34" opacity="0.3"/>
            <path d="M 0 10 L 40 10 M 0 20 L 40 20 M 0 30 L 40 30" stroke="%232c5222" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(%23terrain)"/>
        <rect width="800" height="600" fill="url(%23farmland)"/>
        
        <!-- Urban settlements -->
        <rect x="180" y="240" width="120" height="90" fill="%2394a3b8" opacity="0.4" rx="4"/>
        <rect x="520" y="160" width="140" height="100" fill="%2394a3b8" opacity="0.4" rx="4"/>
        <rect x="420" y="380" width="160" height="120" fill="%2394a3b8" opacity="0.4" rx="4"/>

        <!-- Normal River Channel (Brahmaputra baseline) -->
        <path d="M-10,280 C150,260 220,320 380,310 C500,300 620,360 810,340 L810,380 C620,400 500,340 380,350 C220,360 150,300 -10,320 Z" fill="url(%23river)"/>
        
        <!-- Roads and Bridges -->
        <path d="M 240,50 L 240,550" stroke="%23e2e8f0" stroke-width="4" stroke-dasharray="8,2"/>
        <path d="M 50,420 L 750,220" stroke="%23cbd5e1" stroke-width="3"/>
        <rect x="235" y="295" width="10" height="45" fill="%23f59e0b" rx="2"/>
        <text x="250" y="325" fill="%23ffffff" font-family="sans-serif" font-size="12" font-weight="bold">NH-37 Bridge</text>

        <!-- Status Tag -->
        <rect x="20" y="20" width="220" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%2310b981"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">SENTINEL-2 PRE-FLOOD</text>
      </svg>`;
    } else {
      // Post-flood scenario
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="floodWater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%230284c7"/>
            <stop offset="50%" stop-color="%230369a1"/>
            <stop offset="100%" stop-color="%23075985"/>
          </linearGradient>
          <linearGradient id="deepFlood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%230c4a6e"/>
            <stop offset="100%" stop-color="%23082f49"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Background Terrain -->
        <rect width="800" height="600" fill="%23254520"/>
        
        <!-- MASSIVE FLOOD INUNDATION LAYER (Spaceborne SAR Inundation Mask) -->
        <path d="M-10,120 C120,90 200,160 310,140 C450,110 560,180 810,150 L810,540 C680,560 540,490 390,520 C240,550 110,480 -10,510 Z" fill="url(%23floodWater)" opacity="0.92"/>
        <path d="M-10,240 C140,210 220,280 380,270 C510,260 630,320 810,300 L810,420 C640,450 510,390 380,400 C210,410 140,350 -10,370 Z" fill="url(%23deepFlood)"/>

        <!-- Submerged Town Grids -->
        <rect x="180" y="240" width="120" height="90" fill="%23ef4444" opacity="0.65" rx="4"/>
        <text x="190" y="290" fill="%23ffffff" font-family="sans-serif" font-size="12" font-weight="bold">SUBMERGED (Sector B)</text>

        <!-- Submerged Bridge & Broken Route -->
        <path d="M 240,50 L 240,140" stroke="%2310b981" stroke-width="4"/>
        <path d="M 240,140 L 240,510" stroke="%23ef4444" stroke-width="4" stroke-dasharray="6,4"/>
        <path d="M 240,510 L 240,550" stroke="%2310b981" stroke-width="4"/>
        
        <!-- Bridge Failure marker -->
        <circle cx="240" cy="315" r="14" fill="%23ef4444" filter="url(%23glow)"/>
        <text x="235" y="320" fill="%23ffffff" font-family="sans-serif" font-size="14" font-weight="bold">✕</text>
        <text x="260" y="320" fill="%23fca5a5" font-family="sans-serif" font-size="12" font-weight="bold">BRIDGE WASHED OUT</text>

        <!-- Isolated Settlement -->
        <circle cx="600" cy="210" r="30" fill="%23f59e0b" opacity="0.8"/>
        <circle cx="600" cy="210" r="40" fill="none" stroke="%23f59e0b" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="560" y="215" fill="%23ffffff" font-family="sans-serif" font-size="11" font-weight="bold">CUT OFF: 1,840 CIVILIANS</text>

        <!-- Status Tag -->
        <rect x="20" y="20" width="310" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%23ef4444"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">SENTINEL-1 SAR FLOOD EXTENT</text>
      </svg>`;
    }
  }

  if (type === 'valencia') {
    if (variant === 'before') {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="%23847577"/>
        <path d="M 120,0 L 680,600" stroke="%23475569" stroke-width="36"/>
        <rect x="260" y="160" width="280" height="280" fill="%23e2e8f0" opacity="0.35" rx="8"/>
        <circle cx="400" cy="300" r="50" fill="%2315803d" opacity="0.6"/>
        <rect x="20" y="20" width="250" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%2310b981"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">VALENCIA BASIN PRE-EVENT</text>
      </svg>`;
    } else {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="%2357534e"/>
        <!-- Torrential mud & water overflow -->
        <path d="M 0,80 Q 380,180 800,420 L 800,600 L 0,600 Z" fill="%2378350f" opacity="0.88"/>
        <path d="M 60,200 Q 400,260 760,540 L 760,600 L 60,600 Z" fill="%230284c7" opacity="0.95"/>
        <rect x="260" y="160" width="280" height="280" fill="%23ef4444" opacity="0.6" rx="8"/>
        <text x="310" y="310" fill="%23ffffff" font-family="sans-serif" font-size="14" font-weight="bold">HIGHWAY CV-400 CUT OFF</text>
        <rect x="20" y="20" width="310" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%23ef4444"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">DANA FLASH FLOOD INUNDATION</text>
      </svg>`;
    }
  }

  if (type === 'kerala') {
    if (variant === 'before') {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="kgreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%2314532d"/>
            <stop offset="100%" stop-color="%23166534"/>
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(%23kgreen)"/>
        <!-- Periyar winding river channel -->
        <path d="M 400,0 Q 420,150 360,250 T 420,450 T 380,600" fill="none" stroke="%230369a1" stroke-width="45"/>
        <circle cx="250" cy="220" r="40" fill="%2394a3b8" opacity="0.5"/>
        <text x="215" y="225" fill="%23ffffff" font-family="sans-serif" font-size="11">Aluva Town</text>
        <rect x="20" y="20" width="240" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%2310b981"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">PERIYAR BASIN (PRE-MONSOON)</text>
      </svg>`;
    } else {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="%2314532d"/>
        <!-- Massive reservoir dam overspill flooding -->
        <path d="M 150,0 Q 300,180 200,300 T 280,600 L 650,600 Q 550,350 620,0 Z" fill="%230284c7" opacity="0.92"/>
        <path d="M 250,50 Q 380,220 320,380 T 400,600 L 520,600 Q 450,300 480,50 Z" fill="%230c4a6e"/>
        <circle cx="250" cy="220" r="50" fill="%23ef4444" opacity="0.75"/>
        <text x="210" y="225" fill="%23ffffff" font-family="sans-serif" font-size="11" font-weight="bold">ALUVA SUBMERGED</text>
        <rect x="20" y="20" width="310" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%23ef4444"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">PERIYAR SPILL OVERFLOW (SAR)</text>
      </svg>`;
    }
  }

  if (type === 'nepal') {
    if (variant === 'before') {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="%23475569"/>
        <!-- Mountain Gorge & Stream -->
        <path d="M 0,300 L 800,300" stroke="%23334155" stroke-width="120"/>
        <path d="M 0,300 L 800,300" stroke="%2338bdf8" stroke-width="20"/>
        <path d="M 400,150 L 400,450" stroke="%23e2e8f0" stroke-width="3" stroke-dasharray="4,4"/>
        <text x="410" y="280" fill="%23ffffff" font-family="sans-serif" font-size="11">Suspension Bridge</text>
        <rect x="20" y="20" width="250" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%2310b981"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">KOSHI GORGE BASELINE</text>
      </svg>`;
    } else {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="%23334155"/>
        <!-- Debris Flow & Flash Surge Inundation -->
        <path d="M 0,150 L 800,150 L 800,450 L 0,450 Z" fill="%23713f12" opacity="0.85"/>
        <path d="M 0,220 L 800,220 L 800,380 L 0,380 Z" fill="%230369a1" opacity="0.9"/>
        <circle cx="400" cy="300" r="16" fill="%23ef4444"/>
        <text x="393" y="306" fill="%23ffffff" font-family="sans-serif" font-size="16" font-weight="bold">✕</text>
        <text x="425" y="305" fill="%23fca5a5" font-family="sans-serif" font-size="12" font-weight="bold">BRIDGE WASHED OUT</text>
        <rect x="20" y="20" width="310" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%23ef4444"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">FLASH SURGE &amp; DEBRIS FLOW</text>
      </svg>`;
    }
  }

  // Fallback
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="%230f172a"/>
  </svg>`;
};

export const PRESET_SCENARIOS = [
  {
    id: 'assam-2024',
    name: 'Brahmaputra Basin, Assam (2024 Flood Crisis)',
    badge: 'Sentinel-1 SAR + Sentinel-2 MSI',
    region: 'Nagaon & Morigaon District, Assam, India',
    coordinates: [26.3452, 92.6841],
    date: 'July 14, 2024',
    satellite: 'Copernicus Sentinel-1 SAR (C-Band VV/VH)',
    resolution: '10m / Ground Sample Distance',
    beforeImage: generateSatelliteSVG('assam', 'before'),
    afterImage: generateSatelliteSVG('assam', 'after'),
    metrics: {
      inundatedAreaKm2: 148.6,
      inundatedAreaIncreasePct: 340,
      severity: 'CRITICAL',
      damageScore: 92,
      affectedPopulation: 24500,
      isolatedCommunities: 14,
      submergedBuildings: 1820,
      cutOffBridges: 3,
      impassableRoadsKm: 42.5,
      operationalShelters: 8,
      shelterCapacityUsedPct: 88,
      peakWaterDepthM: 3.4
    },
    criticalEvents: [
      { id: 1, title: 'NH-37 Segment 4 Inundated', severity: 'Critical', time: '02h ago', status: 'Impassable' },
      { id: 2, title: 'Brahmaputra Embankment Breach at Sector 3', severity: 'Critical', time: '04h ago', status: 'Active Influx' },
      { id: 3, title: 'Civil Hospital Nagaon Emergency Ward Submerged', severity: 'High', time: '06h ago', status: 'Evacuating' },
      { id: 4, title: 'Camp Relief Center B at 95% Capacity', severity: 'Medium', time: '08h ago', status: 'Supplies Low' }
    ]
  },
  {
    id: 'valencia-2024',
    name: 'Valencia Urban Basin (DANA Catastrophic Inundation)',
    badge: 'SAR Change Detection',
    region: 'Paiporta & Sedaví, Valencia, Spain',
    coordinates: [39.4241, -0.4182],
    date: 'October 30, 2024',
    satellite: 'Sentinel-1 SAR Radar & Landsat-9 TIR',
    resolution: '10m / Multi-sensor Fusion',
    beforeImage: generateSatelliteSVG('valencia', 'before'),
    afterImage: generateSatelliteSVG('valencia', 'after'),
    metrics: {
      inundatedAreaKm2: 89.2,
      inundatedAreaIncreasePct: 620,
      severity: 'SEVERE',
      damageScore: 96,
      affectedPopulation: 38200,
      isolatedCommunities: 9,
      submergedBuildings: 3450,
      cutOffBridges: 7,
      impassableRoadsKm: 68.0,
      operationalShelters: 12,
      shelterCapacityUsedPct: 94,
      peakWaterDepthM: 2.8
    },
    criticalEvents: [
      { id: 1, title: 'Rambla del Poyo Extreme Runoff Flash Flood', severity: 'Critical', time: '01h ago', status: 'Torrential' },
      { id: 2, title: 'A-3 Highway Submerged and Blocked by Debris', severity: 'Critical', time: '03h ago', status: 'Blocked' },
      { id: 3, title: 'Substation Paiporta Electric Outage', severity: 'High', time: '05h ago', status: 'Offline' }
    ]
  },
  {
    id: 'kerala-2024',
    name: 'Periyar Basin, Kerala (Dam Spill & Monsoon Surge)',
    badge: 'SAR Radar + Sentinel-2',
    region: 'Aluva & Ernakulam, Kerala, India',
    coordinates: [10.1076, 76.3516],
    date: 'August 18, 2024',
    satellite: 'Sentinel-1 Dual-Pol SAR & NISAR Sim',
    resolution: '10m / High Res InSAR',
    beforeImage: generateSatelliteSVG('kerala', 'before'),
    afterImage: generateSatelliteSVG('kerala', 'after'),
    metrics: {
      inundatedAreaKm2: 112.4,
      inundatedAreaIncreasePct: 290,
      severity: 'SEVERE',
      damageScore: 89,
      affectedPopulation: 19400,
      isolatedCommunities: 11,
      submergedBuildings: 1260,
      cutOffBridges: 4,
      impassableRoadsKm: 34.0,
      operationalShelters: 10,
      shelterCapacityUsedPct: 82,
      peakWaterDepthM: 2.6
    },
    criticalEvents: [
      { id: 1, title: 'Aluva Manappuram Shiva Temple Submerged', severity: 'High', time: '01h ago', status: '3.1m Water' },
      { id: 2, title: 'NH-544 Bridge Approach Flooded', severity: 'Critical', time: '03h ago', status: 'Impassable' }
    ]
  },
  {
    id: 'nepal-2024',
    name: 'Koshi Gorge Basin, Nepal (Mountain Flash Surge)',
    badge: 'Debris Flow Radar',
    region: 'Sindhupalchok & Koshi River, Nepal',
    coordinates: [27.7172, 85.3240],
    date: 'September 28, 2024',
    satellite: 'Sentinel-1 SAR C-Band & PlanetScope',
    resolution: '10m / High Slope DEM',
    beforeImage: generateSatelliteSVG('nepal', 'before'),
    afterImage: generateSatelliteSVG('nepal', 'after'),
    metrics: {
      inundatedAreaKm2: 64.8,
      inundatedAreaIncreasePct: 410,
      severity: 'CRITICAL',
      damageScore: 94,
      affectedPopulation: 12800,
      isolatedCommunities: 16,
      submergedBuildings: 890,
      cutOffBridges: 5,
      impassableRoadsKm: 58.0,
      operationalShelters: 6,
      shelterCapacityUsedPct: 91,
      peakWaterDepthM: 4.2
    },
    criticalEvents: [
      { id: 1, title: 'Bhotekoshi Suspension Bridge Severed', severity: 'Critical', time: '30m ago', status: 'Collapsed' },
      { id: 2, title: 'Araniko Highway Blocked by Landslip Surge', severity: 'Critical', time: '02h ago', status: 'Cut Off' }
    ]
  }
];
