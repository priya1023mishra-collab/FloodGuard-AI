// Geospatial layers, flood polygons, critical infrastructure, and routing corridors

export const FLOOD_GEO_DATA = {
  // Assam Region Geo Coordinates and Features
  'assam-2024': {
    center: [26.3452, 92.6841],
    zoom: 12,
    floodPolygons: [
      {
        id: 'zone-deep-1',
        name: 'Brahmaputra Core Overflow Trench',
        severity: 'Critical',
        depth: '3.4m',
        color: '#0369a1',
        fillColor: '#0284c7',
        fillOpacity: 0.65,
        coordinates: [
          [26.375, 92.640],
          [26.385, 92.680],
          [26.365, 92.730],
          [26.335, 92.710],
          [26.340, 92.650]
        ]
      },
      {
        id: 'zone-moderate-2',
        name: 'Morigaon Agricultural Inundation Basin',
        severity: 'Severe',
        depth: '1.8m',
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.45,
        coordinates: [
          [26.335, 92.630],
          [26.355, 92.660],
          [26.320, 92.700],
          [26.300, 92.660]
        ]
      },
      {
        id: 'zone-flash-3',
        name: 'Sector 4 Lowland Urban Backwater',
        severity: 'Moderate',
        depth: '0.9m',
        color: '#38bdf8',
        fillColor: '#7dd3fc',
        fillOpacity: 0.35,
        coordinates: [
          [26.310, 92.670],
          [26.325, 92.695],
          [26.305, 92.720],
          [26.290, 92.685]
        ]
      }
    ],
    infrastructure: [
      {
        id: 'hosp-1',
        name: 'Nagaon District Civil Hospital',
        type: 'hospital',
        status: 'Operational (Partial Flooding)',
        severity: 'Warning',
        coordinates: [26.3520, 92.6780],
        details: 'ICU generators operating on emergency battery. Access road from south submerged.',
        actionRequired: 'Airdrop medical fuel and IV fluid units'
      },
      {
        id: 'hosp-2',
        name: 'Morigaon Sub-District Health Clinic',
        type: 'hospital',
        status: 'SUBMERGED & CUT OFF',
        severity: 'Critical',
        coordinates: [26.3380, 92.6520],
        details: 'Water depth 1.6m. 48 patients stranded on 2nd floor.',
        actionRequired: 'URGENT: Deploy NDRF inflatable motor boats'
      },
      {
        id: 'shelter-1',
        name: 'Central Higher Secondary School Relief Camp',
        type: 'shelter',
        status: 'Active Evac Center',
        severity: 'Safe',
        coordinates: [26.3680, 92.6320],
        details: 'Shelter capacity: 1,500 civilians (Current occupancy: 1,320 / 88%). Drinking water available.',
        actionRequired: 'Replenish food rations by 18:00 hrs'
      },
      {
        id: 'shelter-2',
        name: 'Railway Community Hall Shelter',
        type: 'shelter',
        status: 'Active Evac Center',
        severity: 'Safe',
        coordinates: [26.2950, 92.6580],
        details: 'Shelter capacity: 800 civilians (Current occupancy: 450 / 56%). High ground, dry access.',
        actionRequired: 'Safe evacuation destination'
      },
      {
        id: 'bridge-1',
        name: 'NH-37 Kolong River Overpass',
        type: 'bridge',
        status: 'COLLAPSED / WASHED OUT',
        severity: 'Critical',
        coordinates: [26.3450, 92.6840],
        details: 'Structural abutment breached by 450 m³/s flood surge. Road impassable.',
        actionRequired: 'Reroute all relief convoys via Western Bypass'
      },
      {
        id: 'power-1',
        name: 'Samaguri 132kV Power Grid Substation',
        type: 'power',
        status: 'EMERGENCY SHUTDOWN',
        severity: 'Critical',
        coordinates: [26.3580, 92.7050],
        details: 'Substation yard submerged under 1.2m water. 32,000 households without electricity.',
        actionRequired: 'Station emergency mobile diesel generators'
      }
    ],
    roadSegments: [
      {
        id: 'road-impassable-1',
        name: 'NH-37 Sector 4 Corridor',
        status: 'Blocked',
        color: '#ef4444',
        dashArray: '6,6',
        weight: 5,
        coordinates: [
          [26.3350, 92.6840],
          [26.3450, 92.6840],
          [26.3550, 92.6840]
        ]
      },
      {
        id: 'road-safe-1',
        name: 'Western Bypass Evacuation Corridor',
        status: 'Clear / Safe Route',
        color: '#10b981',
        weight: 4,
        coordinates: [
          [26.3050, 92.6400],
          [26.3300, 92.6350],
          [26.3680, 92.6320]
        ]
      }
    ]
  },
  'valencia-2024': {
    center: [39.4241, -0.4182],
    zoom: 13,
    floodPolygons: [
      {
        id: 'v-zone-1',
        name: 'Rambla del Poyo Runoff Inundation',
        severity: 'Critical',
        depth: '2.8m',
        color: '#991b1b',
        fillColor: '#ef4444',
        fillOpacity: 0.6,
        coordinates: [
          [39.440, -0.440],
          [39.430, -0.390],
          [39.410, -0.400],
          [39.420, -0.450]
        ]
      }
    ],
    infrastructure: [
      {
        id: 'v-hosp-1',
        name: 'Hospital de l\'Horta Sud',
        type: 'hospital',
        status: 'Ground Floor Submerged',
        severity: 'Critical',
        coordinates: [39.4280, -0.4150],
        details: 'Basement flooded, emergency power compromised.',
        actionRequired: 'Deploy military pumping units'
      },
      {
        id: 'v-bridge-1',
        name: 'Paiporta Rail Viaduct',
        type: 'bridge',
        status: 'STRUCTURAL DAMAGE',
        severity: 'Critical',
        coordinates: [39.4220, -0.4210],
        details: 'Track foundation eroded by flash torrent.',
        actionRequired: 'Transit corridor closed'
      }
    ],
    roadSegments: [
      {
        id: 'v-road-1',
        name: 'CV-400 Access Road',
        status: 'Blocked by Debris',
        color: '#ef4444',
        dashArray: '6,6',
        weight: 5,
        coordinates: [
          [39.445, -0.410],
          [39.420, -0.420],
          [39.400, -0.430]
        ]
      }
    ]
  }
};
