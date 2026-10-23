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
        <rect width="800" height="600" fill="%23a8a29e"/>
        <path d="M 100,0 L 700,600" stroke="%2364748b" stroke-width="40"/>
        <rect x="250" y="150" width="300" height="300" fill="%23e2e8f0" opacity="0.3" rx="8"/>
        <circle cx="400" cy="300" r="60" fill="%2322c55e" opacity="0.5"/>
        <rect x="20" y="20" width="240" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%2310b981"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">VALENCIA BASIN PRE-EVENT</text>
      </svg>`;
    } else {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="%2378716c"/>
        <path d="M 0,100 Q 400,200 800,450 L 800,600 L 0,600 Z" fill="%23713f12" opacity="0.85"/>
        <path d="M 50,220 Q 400,280 750,550 L 750,600 L 50,600 Z" fill="%230369a1" opacity="0.9"/>
        <circle cx="380" cy="360" r="50" fill="%23ef4444" opacity="0.7"/>
        <text x="320" y="365" fill="%23ffffff" font-family="sans-serif" font-size="12" font-weight="bold">SEVERE URBAN INUNDATION</text>
        <rect x="20" y="20" width="300" height="40" rx="6" fill="%230f172a" opacity="0.85"/>
        <circle cx="35" cy="40" r="6" fill="%23ef4444"/>
        <text x="50" y="44" fill="%23ffffff" font-family="sans-serif" font-size="13" font-weight="bold">FLASH FLOOD FLASH RADAR</text>
      </svg>`;
    }
  }

  // Default / Koshi River preset
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="%231e3a8a"/>
    <text x="300" y="300" fill="%23ffffff" font-size="20">Satellite Imagery Data</text>
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
      damageScore: 92, // out of 100
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
  }
];
