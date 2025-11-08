import { Info, User } from 'lucide-react';
import type { Prompt } from '../types';

interface PromptInfoProps {
  prompt: Prompt;
}

const PromptInfo = ({ prompt }: PromptInfoProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
      <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-600">
        <Info className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Thông tin chi tiết</h4>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">ID:</span>
        <span className="text-gray-900 dark:text-white font-mono">#{prompt.id}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">Loại:</span>
        <span className="text-gray-900 dark:text-white">{prompt.type.charAt(0).toUpperCase() + prompt.type.slice(1)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">Danh mục:</span>
        <span className="text-gray-900 dark:text-white">{prompt.category}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">Số từ:</span>
        <span className="text-gray-900 dark:text-white">{prompt.prompt.split(' ').length} từ</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">Người đóng góp:</span>
        <div className="flex items-center space-x-1 vp-text-primary">
          <User className="w-3 h-3" />
          <span className="font-medium">{prompt.contributor}</span>
        </div>
      </div>
    </div>
  );
};

export default PromptInfo;
