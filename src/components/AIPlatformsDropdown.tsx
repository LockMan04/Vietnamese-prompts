import { useState, useEffect, useRef } from 'react';
import { Bot, ChevronDown, ExternalLink, MessageCircle, Brain, Search, Globe, Zap, Sparkles } from 'lucide-react';
import type { Prompt } from '../types';

interface AIPlatform {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  supportsDirectURL: boolean;
}

interface AIPlatformsDropdownProps {
  prompt: Prompt;
  onToast: (message: string) => void;
}

const aiPlatforms: AIPlatform[] = [
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com/?prompt=',
    icon: MessageCircle,
    color: '#10a37f',
    supportsDirectURL: true,
  },
  {
    name: 'Grok',
    url: 'https://grok.com/chat?reasoningMode=none&q=',
    icon: Zap,
    color: '#1da1f2',
    supportsDirectURL: true,
  },
  {
    name: 'Claude',
    url: 'https://claude.ai/new?q=',
    icon: Brain,
    color: '#cc785c',
    supportsDirectURL: true,
  },
  {
    name: 'Perplexity',
    url: 'https://perplexity.ai/search/new?q=',
    icon: Search,
    color: '#1fb6ff',
    supportsDirectURL: true,
  },
  {
    name: 'GitHub Copilot',
    url: 'https://github.com/copilot?prompt=',
    icon: Globe,
    color: '#24292e',
    supportsDirectURL: true,
  },
  {
    name: 'Google Gemini',
    url: 'https://gemini.google.com/',
    icon: Sparkles,
    color: '#4285f4',
    supportsDirectURL: false,
  },
];

const AIPlatformsDropdown = ({ prompt, onToast }: AIPlatformsDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && dropdownButtonRef.current) {
        const target = event.target as Node;
        const dropdownElement = dropdownButtonRef.current.parentElement;

        // Only close if click is outside both button and dropdown menu
        if (!dropdownElement?.contains(target)) {
          setDropdownOpen(false);
        }
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  const handleOpenWithAI = (platform: AIPlatform) => {
    try {
      const encodedPrompt = encodeURIComponent(prompt.prompt);

      if (platform.supportsDirectURL) {
        // All platforms now support direct URL with prompt
        const url = `${platform.url}${encodedPrompt}`;

        onToast(`Đang mở ${platform.name} với prompt của bạn...`);

        const newWindow = window.open(url, '_blank');
        if (!newWindow || newWindow.closed) {
          // Fallback: try to open in same tab
          if (confirm(`Popup bị chặn. Bạn có muốn mở ${platform.name} trong tab hiện tại không?`)) {
            window.location.href = url;
          } else {
            onToast(`Hãy cho phép popup trong trình duyệt để mở ${platform.name}.`);
          }
        }
      } else {
        // Fallback for platforms that don't support direct URL
        navigator.clipboard.writeText(prompt.prompt).then(() => {
          onToast(`Mở ${platform.name} thành công! Prompt đã được sao chép, hãy dán vào.`);

          const cleanUrl = platform.url.replace(/[?&][^=]*=$/g, '');
          const newWindow = window.open(cleanUrl, '_blank');
          if (!newWindow || newWindow.closed) {
            if (confirm(`Popup bị chặn. Bạn có muốn mở ${platform.name} trong tab hiện tại không?`)) {
              window.location.href = cleanUrl;
            }
          }
        }).catch(() => {
          onToast('Lỗi: Không thể sao chép prompt.');
        });
      }
    } catch {
      onToast('Lỗi: Đã xảy ra lỗi khi mở AI platform.');
    }

    setDropdownOpen(false);
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!dropdownOpen && dropdownButtonRef.current) {
      // Calculate dropdown position when opening
      const buttonRect = dropdownButtonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 320; // Estimated height of dropdown
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }

    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      <button
        ref={dropdownButtonRef}
        onClick={handleToggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <Bot className="w-4 h-4" />
        <span>Mở với AI</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          className={`absolute left-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 transition-all duration-200 ${
            dropdownPosition === 'top'
              ? 'bottom-full mb-2 animate-in slide-in-from-bottom-2'
              : 'top-full mt-2 animate-in slide-in-from-top-2'
          }`}
        >
          <div className="py-2">
            {aiPlatforms.map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleOpenWithAI(platform)}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={
                    platform.supportsDirectURL
                      ? `Mở trực tiếp ${platform.name} với prompt`
                      : `Mở ${platform.name} và tự động sao chép prompt`
                  }
                >
                  <IconComponent className="w-4 h-4" style={{ color: platform.color }} />
                  <div className="flex-1 text-left">
                    <span>{platform.name}</span>
                    {platform.supportsDirectURL ? (
                      <span className="ml-2 text-xs text-green-600 dark:text-green-400">● Trực tiếp</span>
                    ) : (
                      <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">● Copy & Paste</span>
                    )}
                  </div>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPlatformsDropdown;

