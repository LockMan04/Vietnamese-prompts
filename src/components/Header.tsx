import { Moon, Sun, Search, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearchChange: (term: string) => void;
  searchTerm: string;
}

const Header = ({ onSearchChange, searchTerm }: HeaderProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                  <img
                    src="/icon.png"
                    alt="Vietnamese Prompts Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="absolute -inset-0.5 rounded-xl opacity-20 blur animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(135deg, #0c97fa, #16e1f5)'}}>
                  Vietnamese Prompts
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Thư viện AI Prompts tiếng Việt
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm prompts theo từ khóa, lĩnh vực..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="focus:outline-none w-full pl-12 pr-6 py-3 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-transparent focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 text-sm focus:ring-0"
                style={{'--tw-ring-color': '#0c97fa'} as React.CSSProperties}
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/contribution"
              className="p-3 rounded-xl bg-gradient-to-r from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 text-pink-600 dark:text-pink-400 hover:from-pink-200 hover:to-red-200 dark:hover:from-pink-900/50 dark:hover:to-red-900/50 hover:text-pink-700 dark:hover:text-pink-300 transition-all duration-200 group"
              title="Đóng góp cho dự án"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200 group"
            >
              {isDark ? (
                <Sun className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              ) : (
                <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-200" />
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/contribution"
              className="p-2.5 rounded-lg bg-gradient-to-r from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 text-pink-600 dark:text-pink-400 hover:from-pink-200 hover:to-red-200 dark:hover:from-pink-900/50 dark:hover:to-red-900/50 transition-colors"
              title="Đóng góp cho dự án"
            >
              <Heart className="w-4 h-4" />
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm prompts..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="focus:outline-nonemax-h-32 overflow-y-auto hide-scrollbar w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-transparent text-sm"
              style={{'--tw-ring-color': '#0c97fa'} as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;