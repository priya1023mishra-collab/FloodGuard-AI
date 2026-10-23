import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  unit = '', 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'cyan', // cyan, red, amber, emerald, blue
  badge
}) {
  const variantStyles = {
    cyan: {
      bg: 'from-cyan-950/40 to-slate-900/50',
      border: 'border-cyan-500/30',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
      valueColor: 'text-cyan-300'
    },
    red: {
      bg: 'from-red-950/40 to-slate-900/50',
      border: 'border-red-500/30',
      iconBg: 'bg-red-500/10 text-red-400',
      valueColor: 'text-red-400'
    },
    amber: {
      bg: 'from-amber-950/40 to-slate-900/50',
      border: 'border-amber-500/30',
      iconBg: 'bg-amber-500/10 text-amber-400',
      valueColor: 'text-amber-300'
    },
    emerald: {
      bg: 'from-emerald-950/40 to-slate-900/50',
      border: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      valueColor: 'text-emerald-300'
    },
    blue: {
      bg: 'from-blue-950/40 to-slate-900/50',
      border: 'border-blue-500/30',
      iconBg: 'bg-blue-500/10 text-blue-400',
      valueColor: 'text-blue-300'
    }
  };

  const currentStyle = variantStyles[variant] || variantStyles.cyan;

  return (
    <div className={`glass-panel p-4 rounded-xl border bg-gradient-to-br ${currentStyle.bg} ${currentStyle.border} shadow-lg transition-all hover:scale-[1.01]`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg ${currentStyle.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 mt-1">
        <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-mono ${currentStyle.valueColor}`}>
          {value}
        </span>
        {unit && (
          <span className="text-sm font-semibold text-slate-400">
            {unit}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/80 text-xs">
        <span className="text-slate-400 truncate max-w-[70%]">
          {subtitle}
        </span>
        {trend && (
          <span className={`font-mono font-medium ${trend.startsWith('+') ? 'text-red-400' : 'text-emerald-400'}`}>
            {trend}
          </span>
        )}
        {badge && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
