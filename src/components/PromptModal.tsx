import { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, FileText, Image, Video, Tag, Info, User, ChevronDown, ExternalLink, Bot, MessageCircle, Brain, Search, Globe, Zap, Sparkles } from 'lucide-react';

interface Prompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  type: 'text' | 'text-to-image' | 'text-to-video';
  image: string;
  description: string;
  tags: string;
  contributor: string;
}

interface PromptModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
}

const PromptModal = ({ prompt, isOpen, onClose }: PromptModalProps) => {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  // Reset image loading state when prompt changes
  useEffect(() => {
    setImageLoaded(false);
  }, [prompt?.id]);

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

  // AI Platforms configuration
  const aiPlatforms = [
    {
      name: 'ChatGPT',
      url: 'https://chatgpt.com/?prompt=',
      icon: MessageCircle,
      color: '#10a37f',
      supportsDirectURL: true
    },
    {
      name: 'Grok',
      url: 'https://grok.com/chat?reasoningMode=none&q=',
      icon: Zap,
      color: '#1da1f2',
      supportsDirectURL: true
    },
    {
      name: 'Claude',
      url: 'https://claude.ai/new?q=',
      icon: Brain,
      color: '#cc785c',
      supportsDirectURL: true
    },
    {
      name: 'Perplexity',
      url: 'https://perplexity.ai/search/new?q=',
      icon: Search,
      color: '#1fb6ff',
      supportsDirectURL: true
    },
    {
      name: 'GitHub Copilot',
      url: 'https://github.com/copilot?prompt=',
      icon: Globe,
      color: '#24292e',
      supportsDirectURL: true
    },
    {
      name: 'Google Gemini',
      url: 'https://gemini.google.com/',
      icon: Sparkles,
      color: '#4285f4',
      supportsDirectURL: false
    }
  ];

  const handleOpenWithAI = (platform: typeof aiPlatforms[0]) => {
    if (!prompt) return;
    
    try {
      const encodedPrompt = encodeURIComponent(prompt.prompt);
      
      if (platform.supportsDirectURL) {
        // All platforms now support direct URL with prompt
        const url = `${platform.url}${encodedPrompt}`;
        
        setToastMessage(`Đang mở ${platform.name} với prompt của bạn...`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        
        const newWindow = window.open(url, '_blank');
        if (!newWindow || newWindow.closed) {
          // Fallback: try to open in same tab
          if (confirm(`Popup bị chặn. Bạn có muốn mở ${platform.name} trong tab hiện tại không?`)) {
            window.location.href = url;
          } else {
            setToastMessage(`Hãy cho phép popup trong trình duyệt để mở ${platform.name}.`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }
        }
      } else {
        // Fallback for platforms that don't support direct URL
        navigator.clipboard.writeText(prompt.prompt).then(() => {
          setToastMessage(`Mở ${platform.name} thành công! Prompt đã được sao chép, hãy dán vào.`);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
          
          const cleanUrl = platform.url.replace(/[?&][^=]*=$/g, '');
          const newWindow = window.open(cleanUrl, '_blank');
          if (!newWindow || newWindow.closed) {
            if (confirm(`Popup bị chặn. Bạn có muốn mở ${platform.name} trong tab hiện tại không?`)) {
              window.location.href = cleanUrl;
            }
          }
        }).catch(() => {
          setToastMessage('Lỗi: Không thể sao chép prompt.');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        });
      }
    } catch {
      setToastMessage('Lỗi: Đã xảy ra lỗi khi mở AI platform.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    
    setDropdownOpen(false);
  };

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

  const tags = prompt.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor()}`}>
              {getTypeIcon()}
              <span className="ml-2">{getTypeLabel()}</span>
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              {prompt.category}
            </span>
            <div className="flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: 'rgba(12, 151, 250, 0.1)', color: '#0c97fa'}}>
              <User className="w-4 h-4" />
              <span>{prompt.contributor}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="hide-scrollbar grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Left Side - Prompt Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {prompt.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {prompt.description}
              </p>
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors"
                style={{
                  background: 'linear-gradient(135deg, #0c97fa, #16e1f5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0a85e0, #14c9db)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0c97fa, #16e1f5)';
                }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép prompt'}</span>
              </button>
              
              {/* AI Platforms Dropdown */}
              <div className="relative">
                <button 
                  ref={dropdownButtonRef}
                  onClick={(e) => {
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
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Bot className="w-4 h-4" />
                  <span>Mở với AI</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? 'transform rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className={`absolute left-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 transition-all duration-200 ${
                    dropdownPosition === 'top' 
                      ? 'bottom-full mb-2 animate-in slide-in-from-bottom-2' 
                      : 'top-full mt-2 animate-in slide-in-from-top-2'
                  }`}>
                    <div className="py-2">
                      {aiPlatforms.map((platform, index) => {
                        const IconComponent = platform.icon;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleOpenWithAI(platform)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title={platform.supportsDirectURL 
                              ? `Mở trực tiếp ${platform.name} với prompt` 
                              : `Mở ${platform.name} và tự động sao chép prompt`}
                          >
                            <IconComponent className="w-4 h-4" style={{color: platform.color}} />
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
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Image className="w-5 h-5 mr-2" />
              Hình ảnh minh họa
            </h3>
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                {!imageLoaded && (
                  <div className="aspect-square flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
                <img
                  src={prompt.image && prompt.image.trim() !== '' ? prompt.image : '/icon.png'}
                  alt={prompt.title}
                  className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/icon.png') {
                      e.currentTarget.src = '/icon.png';
                      setImageLoaded(false);
                    }
                  }}
                />
              </div>
            </div>

            {/* Prompt Info */}
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
                <span className="text-gray-900 dark:text-white">{getTypeLabel()}</span>
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
                <div className="flex items-center space-x-1" style={{color: '#0c97fa'}}>
                  <User className="w-3 h-3" />
                  <span className="font-medium">{prompt.contributor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-[60] animate-in slide-in-from-right-full">
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptModal;