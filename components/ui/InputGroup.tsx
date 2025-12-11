import React from 'react';

interface InputGroupProps {
  label: string;
  children: React.ReactNode;
  helpText?: string;
}

export const InputGroup = ({ label, children, helpText }: InputGroupProps) => (
  <div className="space-y-1.5 mb-4">
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    {children}
    {helpText && <p className="text-xs text-slate-400 leading-relaxed">{helpText}</p>}
  </div>
);