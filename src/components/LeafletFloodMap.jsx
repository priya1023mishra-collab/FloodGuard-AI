import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  ShieldAlert, 
  Navigation, 
  Home, 
  Hospital, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Compass
} from 'lucide-react';
import { FLOOD_GEO_DATA } from '../data/geoData';

export default function LeafletFloodMap({ selectedScenario, onSelectFeature }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({
    polygons: null,
    infrastructure: null,
    roads: null
  });

  const [activeLayers, setActiveLayers] = useState({
    floodExtent: true,
    infrastructure: true,
    evacRoutes: true
  });

  const [mapTile, setMapTile] = useState('dark'); // 'dark' | 'osm' | 'satellite'
  const [selectedItem, setSelectedItem] = useState(null);

  const scenarioData = FLOOD_GEO_DATA[selectedScenario.id] || FLOOD_GEO_DATA['assam-2024'];

  // Initialize or update Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy prior map instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const { center, zoom } = scenarioData;

    // Create Map Instance
    const map = L.map(mapContainerRef.current, {
      center,
      zoom,
      zoomControl: false
    });
    mapInstanceRef.current = map;

    // Add Zoom Control top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Tile Layer setup
    let tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    let attribution = '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors';

    if (mapTile === 'osm') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
    } else if (mapTile === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    }

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 18
    }).addTo(map);

    // Layer Groups
    const polygonGroup = L.layerGroup().addTo(map);
    const infraGroup = L.layerGroup().addTo(map);
    const roadGroup = L.layerGroup().addTo(map);

    layersRef.current = {
      polygons: polygonGroup,
      infrastructure: infraGroup,
      roads: roadGroup
    };

    // Render Flood Inundation Polygons
    if (scenarioData.floodPolygons) {
      scenarioData.floodPolygons.forEach(poly => {
        const leafletPolygon = L.polygon(poly.coordinates, {
          color: poly.color,
          weight: 2,
          fillColor: poly.fillColor,
          fillOpacity: poly.fillOpacity
        });

        leafletPolygon.bindPopup(`
          <div style="font-family: inherit; font-size: 13px; min-width: 200px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <strong style="color: #38bdf8; font-size: 14px;">${poly.name}</strong>
              <span style="background: rgba(239,68,68,0.2); color: #f87171; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px;">
                ${poly.severity}
              </span>
            </div>
            <div style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">
              Peak Water Depth: <strong style="color: #f1f5f9;">${poly.depth}</strong>
            </div>
            <div style="font-size: 11px; color: #64748b; font-family: monospace;">
              Sensor: Sentinel-1 SAR Backscatter
            </div>
          </div>
        `);

        leafletPolygon.on('click', () => {
          setSelectedItem({ type: 'polygon', data: poly });
          if (onSelectFeature) onSelectFeature(poly);
        });

        polygonGroup.addLayer(leafletPolygon);
      });
    }

    // Render Critical Infrastructure Markers
    if (scenarioData.infrastructure) {
      scenarioData.infrastructure.forEach(item => {
        let iconHtml = '';
        if (item.type === 'hospital') {
          const isCritical = item.severity === 'Critical';
          iconHtml = `<div style="background: ${isCritical ? '#ef4444' : '#f59e0b'}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 0 10px ${isCritical ? '#ef4444' : '#f59e0b'}; border: 2px solid #0f172a;">🏥</div>`;
        } else if (item.type === 'shelter') {
          iconHtml = `<div style="background: #10b981; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 0 10px #10b981; border: 2px solid #0f172a;">🏫</div>`;
        } else if (item.type === 'bridge') {
          iconHtml = `<div style="background: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 0 10px #ef4444; border: 2px solid #0f172a;">🌉</div>`;
        } else {
          iconHtml = `<div style="background: #38bdf8; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 0 10px #38bdf8; border: 2px solid #0f172a;">⚡</div>`;
        }

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-infra-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker(item.coordinates, { icon: customIcon });

        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 13px; min-width: 220px;">
            <div style="font-weight: bold; font-size: 14px; color: #f8fafc; margin-bottom: 4px;">
              ${item.name}
            </div>
            <div style="display: flex; gap: 4px; margin-bottom: 8px;">
              <span style="background: #1e293b; color: #38bdf8; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
                ${item.type}
              </span>
              <span style="background: ${item.severity === 'Critical' ? '#7f1d1d' : item.severity === 'Safe' ? '#064e3b' : '#78350f'}; color: white; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">
                ${item.status}
              </span>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin-bottom: 6px;">
              ${item.details}
            </p>
            <div style="padding: 6px; background: rgba(56,189,248,0.1); border-left: 3px solid #38bdf8; font-size: 11px; color: #bae6fd;">
              <strong>Action:</strong> ${item.actionRequired}
            </div>
          </div>
        `);

        marker.on('click', () => {
          setSelectedItem({ type: 'infrastructure', data: item });
          if (onSelectFeature) onSelectFeature(item);
        });

        infraGroup.addLayer(marker);
      });
    }

    // Render Road Segments (Blocked vs Passable)
    if (scenarioData.roadSegments) {
      scenarioData.roadSegments.forEach(road => {
        const polyline = L.polyline(road.coordinates, {
          color: road.color,
          weight: road.weight || 4,
          dashArray: road.dashArray || null
        });

        polyline.bindPopup(`
          <div style="font-family: inherit; font-size: 13px;">
            <strong style="color: ${road.color}; font-size: 14px;">${road.name}</strong>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Status: <strong>${road.status}</strong></p>
          </div>
        `);

        polyline.on('click', () => {
          setSelectedItem({ type: 'road', data: road });
          if (onSelectFeature) onSelectFeature(road);
        });

        roadGroup.addLayer(polyline);
      });
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedScenario.id, mapTile]);

  // Handle Layer Toggle Visibilities
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current) return;
    const { polygons, infrastructure, roads } = layersRef.current;

    if (polygons) {
      if (activeLayers.floodExtent && !mapInstanceRef.current.hasLayer(polygons)) {
        mapInstanceRef.current.addLayer(polygons);
      } else if (!activeLayers.floodExtent && mapInstanceRef.current.hasLayer(polygons)) {
        mapInstanceRef.current.removeLayer(polygons);
      }
    }

    if (infrastructure) {
      if (activeLayers.infrastructure && !mapInstanceRef.current.hasLayer(infrastructure)) {
        mapInstanceRef.current.addLayer(infrastructure);
      } else if (!activeLayers.infrastructure && mapInstanceRef.current.hasLayer(infrastructure)) {
        mapInstanceRef.current.removeLayer(infrastructure);
      }
    }

    if (roads) {
      if (activeLayers.evacRoutes && !mapInstanceRef.current.hasLayer(roads)) {
        mapInstanceRef.current.addLayer(roads);
      } else if (!activeLayers.evacRoutes && mapInstanceRef.current.hasLayer(roads)) {
        mapInstanceRef.current.removeLayer(roads);
      }
    }
  }, [activeLayers]);

  return (
    <div className="space-y-4">
      {/* Map Header & Interactive Controls */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Navigation className="w-5 h-5 text-cyan-400" />
            Geospatial Flood Damage &amp; Infrastructure Map
          </h2>
          <p className="text-xs text-slate-400">
            OpenStreetMap vector layers overlaid with Copernicus SAR flood extent and emergency evacuation corridors.
          </p>
        </div>

        {/* Map Tile & Layer Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Base Layer Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setMapTile('dark')}
              className={`px-2.5 py-1 rounded transition-all ${
                mapTile === 'dark' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark Matter
            </button>
            <button
              onClick={() => setMapTile('osm')}
              className={`px-2.5 py-1 rounded transition-all ${
                mapTile === 'osm' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              OpenStreetMap
            </button>
            <button
              onClick={() => setMapTile('satellite')}
              className={`px-2.5 py-1 rounded transition-all ${
                mapTile === 'satellite' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Esri Satellite
            </button>
          </div>

          {/* Layer Filter Checkboxes */}
          <div className="flex items-center gap-2 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900/80 px-2 py-1 rounded border border-slate-800 text-slate-300 hover:border-slate-700">
              <input
                type="checkbox"
                checked={activeLayers.floodExtent}
                onChange={(e) => setActiveLayers(prev => ({ ...prev, floodExtent: e.target.checked }))}
                className="rounded accent-cyan-500"
              />
              <span>🌊 SAR Flood Zones</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900/80 px-2 py-1 rounded border border-slate-800 text-slate-300 hover:border-slate-700">
              <input
                type="checkbox"
                checked={activeLayers.infrastructure}
                onChange={(e) => setActiveLayers(prev => ({ ...prev, infrastructure: e.target.checked }))}
                className="rounded accent-cyan-500"
              />
              <span>🏥 Facilities</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900/80 px-2 py-1 rounded border border-slate-800 text-slate-300 hover:border-slate-700">
              <input
                type="checkbox"
                checked={activeLayers.evacRoutes}
                onChange={(e) => setActiveLayers(prev => ({ ...prev, evacRoutes: e.target.checked }))}
                className="rounded accent-cyan-500"
              />
              <span>🛣️ Corridors</span>
            </label>
          </div>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[540px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-20 glass-panel p-3 rounded-lg border border-slate-800/90 text-xs text-slate-300 space-y-2 max-w-xs shadow-lg backdrop-blur-md">
          <div className="font-bold text-white flex items-center justify-between border-b border-slate-700/80 pb-1.5">
            <span>Map Symbology</span>
            <span className="font-mono text-[10px] text-cyan-400">EPSG:4326</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-sky-600 opacity-80 border border-sky-400"></span>
              <span>Deep Inundation (&gt; 2.5m)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-cyan-400 opacity-60 border border-cyan-300"></span>
              <span>Moderate Flooding (1.0 - 2.5m)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-red-500 border-b border-red-400"></span>
              <span className="text-red-300">Blocked / Collapsed Road</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-emerald-400 border-b border-emerald-300"></span>
              <span className="text-emerald-300">Safe Evacuation Route</span>
            </div>
          </div>
        </div>

        {/* Selected Item Floating Details Card */}
        {selectedItem && (
          <div className="absolute top-4 left-4 z-20 glass-panel p-3.5 rounded-xl border border-cyan-500/40 text-xs text-slate-200 max-w-sm shadow-xl backdrop-blur-md animate-fade-in">
            <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1.5 mb-2">
              <span className="font-bold text-cyan-300 text-sm">
                {selectedItem.data.name}
              </span>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-white px-1 text-xs"
              >
                ✕
              </button>
            </div>
            {selectedItem.data.details && (
              <p className="text-slate-300 text-xs mb-2 leading-relaxed">
                {selectedItem.data.details}
              </p>
            )}
            {selectedItem.data.actionRequired && (
              <div className="p-2 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-200 text-[11px]">
                <strong>Directive:</strong> {selectedItem.data.actionRequired}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
