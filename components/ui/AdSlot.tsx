import React from 'react';

interface AdSlotProps {
  label: string;
  className?: string;
}

export const AdSlot = ({ label, className }: AdSlotProps) => (
  <div className={`bg-slate-50 border border-slate-200 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-400 p-4 ${className}`}>
    <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">Publicidade</span>
    <span className="text-[10px] opacity-60">{label}</span>
  </div>
);