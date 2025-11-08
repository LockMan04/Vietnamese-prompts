import React from 'react';
import PromptCardSkeleton from './PromptCardSkeleton';

interface PromptGridSkeletonProps {
  count?: number;
}

const PromptGridSkeleton = ({ count = 12 }: PromptGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{
            animationDelay: `${Math.min(index * 50, 300)}ms`
          }}
        >
          <PromptCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default PromptGridSkeleton;

