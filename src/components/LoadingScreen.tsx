import React from 'react';
import FilterBarSkeleton from './FilterBarSkeleton';
import StatsSectionSkeleton from './StatsSectionSkeleton';
import PromptGridSkeleton from './PromptGridSkeleton';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30">
      {/* Header placeholder - sẽ được render bởi App */}
      <div className="h-[73px] bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800" />
      
      {/* Filter Bar Skeleton */}
      <FilterBarSkeleton />
      
      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <StatsSectionSkeleton />
        <PromptGridSkeleton count={12} />
      </main>
      
      {/* Footer placeholder */}
      <div className="h-64 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950" />
    </div>
  );
};

export default LoadingScreen;