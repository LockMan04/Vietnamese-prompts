import { X, Star, Heart, User } from 'lucide-react';
import type { Prompt } from '../types';
import { getTypeIcon, getTypeLabel, getTypeColor } from '../utils/promptHelpers';

interface PromptModalHeaderProps {
  prompt: Prompt;
  hotIds: number[];
  isFavorite?: (promptId: string) => boolean;
  onToggleFavorite?: (promptId: string) => void;
  onClose: () => void;
}

const PromptModalHeader = ({
  prompt,
  hotIds,
  isFavorite,
  onToggleFavorite,
  onClose,
}: PromptModalHeaderProps) => {

  const isHot = () => {
    const promptId = parseInt(prompt.id);
    return hotIds.includes(promptId);
  };

  return (
    <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 items-center">
            <span
              className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getTypeColor(prompt.type)}`}
            >
              {getTypeIcon(prompt.type)}
              <span className="ml-1 sm:ml-2 hidden xs:inline">{getTypeLabel(prompt.type)}</span>
            </span>
            {isHot() && (
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700/50 animate-pulse">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                <span className="ml-1 sm:ml-2 font-bold">HOT</span>
              </span>
            )}
            <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">
              {prompt.category}
            </span>
            <div className="vp-user-badge flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate max-w-[80px] sm:max-w-none">{prompt.contributor}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isFavorite && onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(prompt.id);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={isFavorite(prompt.id) ? 'Bỏ yêu thích' : 'Yêu thích'}
              title={isFavorite(prompt.id) ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            >
              <Heart
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                  isFavorite(prompt.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 hover:text-red-500 fill-transparent'
                }`}
              />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModalHeader;

