import { FileText, Image, Video, ArrowRight, User, Star, Heart } from 'lucide-react';
import type { Prompt } from '../types';

interface PromptCardProps {
  prompt: Prompt;
  onClick: () => void;
  hotIds?: number[];
  isFavorite: boolean;
  onToggleFavorite: (promptId: string) => void;
}

const PromptCard = ({ prompt, onClick, hotIds = [], isFavorite, onToggleFavorite }: PromptCardProps) => {

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(prompt.id);
  };

  const getTypeIcon = () => {
    switch (prompt.type) {
      case 'text':
        return <FileText className="w-4 h-4" />;
      case 'text-to-image':
        return <Image className="w-4 h-4" />;
      case 'text-to-video':
        return <Video className="w-4 h-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (prompt.type) {
      case 'text':
        return 'Văn bản';
      case 'text-to-image':
        return 'Tạo hình ảnh';
      case 'text-to-video':
        return 'Tạo video';
    }
  };


  const getTypeColor = () => {
    switch (prompt.type) {
      case 'text':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'text-to-image':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'text-to-video':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    }
  };

  const isHot = () => {
    const promptId = parseInt(prompt.id);
    return hotIds.includes(promptId);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    
    // Find the last space before maxLength to avoid cutting words
    const truncated = text.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    if (lastSpaceIndex > maxLength * 0.8) {
      return truncated.substring(0, lastSpaceIndex) + '...';
    }
    
    return truncated + '...';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 h-[260px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 min-h-[40px]">
        <div className="flex flex-col space-y-1.5 flex-1 mr-2">
          <div className="flex items-center space-x-1.5">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()} w-fit`}>
              {getTypeIcon()}
              <span className="ml-1 whitespace-nowrap">{getTypeLabel()}</span>
            </span>
            {isHot() && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700/50 w-fit animate-pulse">
                <Star className="w-3 h-3 fill-current" />
                <span className="ml-1 whitespace-nowrap font-bold">HOT</span>
              </span>
            )}
          </div>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs w-fit">
            {truncateText(prompt.category, 30)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleFavoriteClick}
            className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors duration-200"
            aria-label={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-transparent'}`} />
          </button>
          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col mb-2">
        <h3 data-testid="prompt-card-title" className="text-sm font-semibold text-gray-900 dark:text-white mt-1 mb-2 line-clamp-2 leading-tight min-h-[2.25rem]">
          {prompt.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 leading-relaxed min-h-[1.75rem]">
          {prompt.description}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-3 leading-relaxed flex-1">
          {truncateText(prompt.prompt, 100)}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700 min-h-[24px]">
        <div className="flex items-center space-x-1.5 flex-1 min-w-0">
          <span className="text-gray-400 flex-shrink-0">#{prompt.id}</span>
          <div className="flex items-center space-x-1 vp-user-badge rounded px-1.5 py-0.5 min-w-0">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="font-medium truncate max-w-[80px]">{prompt.contributor}</span>
          </div>
        </div>
        <span className="text-gray-400 whitespace-nowrap flex-shrink-0 ml-2">{prompt.prompt.split(' ').length} từ</span>
      </div>
    </div>
  );
};

export default PromptCard;
