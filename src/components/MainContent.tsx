import StatsSection from './StatsSection';
import PromptGrid from './PromptGrid';
import EmptyState from './EmptyState';
import FilteringIndicator from './FilteringIndicator';
import type { Prompt } from '../types';

interface MainContentProps {
  totalPrompts: number;
  totalCategories: number;
  totalTypes: number;
  filteredPrompts: Prompt[];
  isFiltering: boolean;
  animationKey: number;
  onPromptClick: (prompt: Prompt) => void;
  onClearFilters: () => void;
  hotIds: number[];
  isFavorite: (promptId: string) => boolean;
  onToggleFavorite: (promptId: string) => void;
}

const MainContent = ({
  totalPrompts,
  totalCategories,
  totalTypes,
  filteredPrompts,
  isFiltering,
  animationKey,
  onPromptClick,
  onClearFilters,
  hotIds,
  isFavorite,
  onToggleFavorite,
}: MainContentProps) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className={`transition-all duration-300 ${isFiltering ? 'opacity-75' : 'opacity-100'}`}>
        <StatsSection 
          totalPrompts={totalPrompts}
          totalCategories={totalCategories}
          totalTypes={totalTypes}
        />
      </div>

      <div className={`transition-all duration-500 ${isFiltering ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        {isFiltering ? (
          <FilteringIndicator />
        ) : filteredPrompts.length === 0 ? (
          <div key={`empty-${animationKey}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <EmptyState onClearFilters={onClearFilters} />
          </div>
        ) : (
          <div key={`grid-${animationKey}`} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PromptGrid
              prompts={filteredPrompts}
              onPromptClick={onPromptClick}
              hotIds={hotIds}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;

