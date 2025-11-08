import { X, Clock, Trash2 } from 'lucide-react';
import type { Prompt } from '../types';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface RecentPromptItem {
  prompt: Prompt;
  viewedAt: number;
}

interface RecentPromptsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recentPrompts: RecentPromptItem[];
  onPromptClick: (prompt: Prompt) => void;
  onRemovePrompt: (promptId: string) => void;
  onClearAll: () => void;
}

const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} giờ trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return 'Vừa xem';
  }
};

const RecentPromptsDrawer = ({
  isOpen,
  onClose,
  recentPrompts,
  onPromptClick,
  onRemovePrompt,
  onClearAll,
}: RecentPromptsDrawerProps) => {
  // Close drawer on Escape key
  useKeyboardShortcuts(
    [
      {
        key: 'Escape',
        handler: () => {
          if (isOpen) {
            onClose();
          }
        },
      },
    ],
    isOpen
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Recent Prompts"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
          <div className="flex items-center space-x-3" style={{ animation: 'slideInLeft 0.5s ease-out' }}>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Đã xem gần đây
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {recentPrompts.length} prompts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-90"
            aria-label="Đóng"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Actions */}
        {recentPrompts.length > 0 && (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-end bg-gray-50/50 dark:bg-gray-900/50">
            <button
              onClick={onClearAll}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <Trash2 className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
              <span>Xóa tất cả</span>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {recentPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center" style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 animate-bounce">
                <Clock className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Chưa có lịch sử xem
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Các prompts bạn xem sẽ được lưu ở đây để truy cập nhanh
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPrompts.map((item, index) => (
                <div
                  key={item.prompt.id}
                  className="group relative p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md hover:scale-[1.02]"
                  style={{
                    animation: `slideInLeftFade 0.4s ease-out ${index * 50}ms forwards`,
                    opacity: 0,
                  }}
                  onClick={() => {
                    onPromptClick(item.prompt);
                    onClose();
                  }}
                >
                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemovePrompt(item.prompt.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-all duration-200 hover:scale-110 hover:rotate-90"
                    aria-label="Xóa khỏi lịch sử"
                  >
                    <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>

                  {/* Prompt info */}
                  <div className="pr-8">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {item.prompt.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {item.prompt.description || item.prompt.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded transition-all duration-200 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 group-hover:scale-105">
                          {item.prompt.category}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-all duration-200 group-hover:bg-gray-300 dark:group-hover:bg-gray-500 group-hover:scale-105">
                          #{item.prompt.id}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <Clock className="w-3 h-3 transition-transform duration-200 group-hover:rotate-12" />
                        <span>{formatTimeAgo(item.viewedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-900/50 dark:to-blue-900/10">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center" style={{ animation: 'fadeInUp 0.5s ease-out 0.3s both' }}>
            Nhấn <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs shadow-sm">Esc</kbd> để đóng
          </p>
        </div>
      </div>
    </>
  );
};

export default RecentPromptsDrawer;

