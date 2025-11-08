import { useState, useEffect } from 'react';
import { Copy, Check, FileText, Tag } from 'lucide-react';
import type { Prompt } from '../types';
import PromptModalHeader from './PromptModalHeader';
import ImagePreview from './ImagePreview';
import PromptInfo from './PromptInfo';
import AIPlatformsDropdown from './AIPlatformsDropdown';
import ToastNotification from './ToastNotification';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface PromptModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
  hotIds?: number[];
  isFavorite?: (promptId: string) => boolean;
  onToggleFavorite?: (promptId: string) => void;
}

const PromptModal = ({
  prompt,
  isOpen,
  onClose,
  hotIds = [],
  isFavorite,
  onToggleFavorite,
}: PromptModalProps) => {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Prevent scroll on body
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut: Esc to close modal
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

  if (!isOpen || !prompt) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    const duration = message.includes('Lỗi') ? 3000 : message.includes('Hãy cho phép') ? 4000 : 2000;
    setTimeout(() => setShowToast(false), duration);
  };

  const tags = prompt.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-sm sm:max-w-2xl lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <PromptModalHeader
          prompt={prompt}
          hotIds={hotIds}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onClose={onClose}
        />

        {/* Content */}
        <div className="hide-scrollbar grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Left Side - Prompt Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{prompt.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{prompt.description}</p>
            </div>

            {/* Prompt Text */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Nội dung prompt
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg relative">
                <div className="p-4 pr-12">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {prompt.prompt}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`absolute top-3 right-3 p-2 rounded-lg transition-colors ${
                    copied
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500'
                  }`}
                  title={copied ? 'Đã sao chép!' : 'Sao chép prompt'}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {tags.slice(0, 10).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs sm:text-sm font-medium"
                    >
                      #{tag.length > 20 ? tag.substring(0, 20) + '...' : tag}
                    </span>
                  ))}
                  {tags.length > 10 && (
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-xs sm:text-sm font-medium">
                      +{tags.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={handleCopy}
                className="btn-vp-primary flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép prompt'}</span>
              </button>

              {/* AI Platforms Dropdown */}
              <AIPlatformsDropdown prompt={prompt} onToast={handleToast} />
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="space-y-4">
            <ImagePreview prompt={prompt} />
            <PromptInfo prompt={prompt} />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastNotification message={toastMessage} isVisible={showToast} />
    </div>
  );
};

export default PromptModal;
