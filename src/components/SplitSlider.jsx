import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Eye, Layers, Sparkles } from 'lucide-react';

export default function SplitSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'PRE-FLOOD BASELINE', 
  afterLabel = 'POST-FLOOD SAR RADAR',
  showMask = false
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* Visual Controls / Percentage Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {beforeLabel}
          </span>
          <span className="text-slate-600">vs</span>
          <span className="flex items-center gap-1 font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            {afterLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span>Split: {Math.round(sliderPosition)}%</span>
          <button 
            onClick={() => setSliderPosition(50)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
          >
            Reset 50%
          </button>
        </div>
      </div>

      {/* Interactive Split View Container */}
      <div 
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[520px] rounded-xl overflow-hidden select-none border border-slate-700/80 bg-slate-950 shadow-2xl cursor-ew-resize group"
      >
        {/* Layer 1: After / Flooded Image (Underneath) */}
        <img 
          src={afterImage} 
          alt="Post-Flood Satellite" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Layer 2: Before Image (Clipped by slider position) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none transition-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Pre-Flood Baseline Satellite" 
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ 
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              height: '100%'
            }}
          />
        </div>

        {/* Divider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(56,189,248,0.9)] cursor-ew-resize z-20 pointer-events-none"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          {/* Draggable Knob Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/50 pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
            <Sliders className="w-4 h-4" />
          </div>
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur border border-emerald-500/40 text-[11px] font-bold text-emerald-300 pointer-events-none">
          BEFORE (Baseline)
        </div>
        <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur border border-cyan-500/40 text-[11px] font-bold text-cyan-300 pointer-events-none">
          AFTER (Sentinel-1 SAR)
        </div>
      </div>
      
      <p className="text-[11px] text-slate-400 text-center italic">
        💡 Drag the slider horizontally to inspect floodwater expansion across terrain and infrastructure.
      </p>
    </div>
  );
}
