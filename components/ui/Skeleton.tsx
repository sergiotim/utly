import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={`animate-pulse bg-slate-200/80 rounded-lg ${className}`}></div>
);