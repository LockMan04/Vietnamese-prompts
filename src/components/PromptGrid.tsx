import type { Prompt } from '../types';
import PromptCard from './PromptCard';

interface PromptGridProps {
  prompts: Prompt[];
  onPromptClick: (prompt: Prompt) => void;
  hotIds?: number[];
  isFavorite: (promptId: string) => boolean;
  onToggleFavorite: (promptId: string) => void;
}

const PromptGrid = ({ prompts, onPromptClick, hotIds = [], isFavorite, onToggleFavorite }: PromptGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {prompts.map((prompt, index) => (
        <div
          key={prompt.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{
            animationDelay: `${Math.min(index * 50, 300)}ms`
          }}
        >
          <PromptCard
            prompt={prompt}
            onClick={() => onPromptClick(prompt)}
            hotIds={hotIds}
            isFavorite={isFavorite(prompt.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  );
};

export default PromptGrid;