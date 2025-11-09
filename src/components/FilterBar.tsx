import { Filter, X, FileText, Image, Video, Hash, Layers, Heart, ArrowUpDown, ChevronDown } from 'lucide-react';
import type { SortOrder } from '../types';

interface FilterOptions {
  category: string;
  type: string;
  searchTerm: string;
  showFavorites?: boolean;
}

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onToggleFavorites: () => void;
  categories: string[];
  types: string[];
  isFiltering?: boolean;
  sortOrder: SortOrder;
  onSortChange: (sortOrder: SortOrder) => void;
}

const FilterBar = ({ filters, onFilterChange, onToggleFavorites, categories, types, isFiltering = false, sortOrder, onSortChange }: FilterBarProps) => {
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? '' : category
    });
  };

  const handleTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      type: filters.type === type ? '' : type
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      type: '',
      searchTerm: filters.searchTerm
    });
  };

  const hasActiveFilters = filters.category || filters.type;

  return (
    <div className="bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 border-b border-gray-200/50 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg vp-filter-icon-primary">
              <Filter className="w-5 h-5 vp-text-primary" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bộ lọc thông minh</h3>
                {isFiltering && (
                  <div className="vp-loader animate-spin rounded-full h-4 w-4 border-b-2 vp-border-color"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isFiltering ? 'Đang lọc kết quả...' : 'Lọc theo lĩnh vực và loại prompt'}
              </p>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
            >
              <X className="w-4 h-4" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>

        {/* Filter Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Categories */}
          <div className="xl:col-span-1 bg-white dark:bg-gray-800/50 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 min-w-0">
            <div className="flex items-center space-x-2 mb-4">
              <Hash className="w-4 h-4 vp-text-primary" />
              <h4 className="font-medium text-gray-900 dark:text-white">Lĩnh vực ({categories.length})</h4>
            </div>
            <div className="max-h-44 overflow-y-auto hide-scrollbar p-1">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      filters.category === category
                        ? 'vp-filter-selected transform scale-105'
                        : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Types & Actions */}
          <div className="xl:col-span-1 bg-white dark:bg-gray-800/50 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 min-w-0 flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="w-4 h-4 vp-text-secondary" />
              <h4 className="font-medium text-gray-900 dark:text-white">Loại prompt</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {types.filter(type => type && type.trim() !== '').map((type) => {
                const typeConfig = {
                  'text': { label: 'Văn bản', icon: FileText },
                  'text-to-image': { label: 'Tạo hình ảnh', icon: Image },
                  'text-to-video': { label: 'Tạo video', icon: Video }
                };
                const config = typeConfig[type as keyof typeof typeConfig];
                if (!config) return null;
                return (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 whitespace-nowrap ${
                      filters.type === type
                        ? 'vp-filter-selected transform scale-105'
                        : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
                    }`}
                  >
                    <config.icon className="w-4 h-4" />
                    <span>{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sorting and Favorites */}
          <div className="xl:col-span-1 bg-white dark:bg-gray-800/50 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 min-w-0 flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <ArrowUpDown className="w-4 h-4 vp-text-tertiary" />
              <h4 className="font-medium text-gray-900 dark:text-white">Sắp xếp & Hành động</h4>
            </div>
            <div className="flex flex-wrap gap-2">
               {/* Favorites Button */}
               <button
                onClick={onToggleFavorites}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 whitespace-nowrap ${
                  filters.showFavorites
                    ? 'vp-filter-selected transform scale-105'
                    : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Yêu thích</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative inline-block text-left">
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    const value = e.target.value as SortOrder;
                    if (['id-asc', 'id-desc', 'title-asc', 'title-desc'].includes(value)) {
                      onSortChange(value);
                    }
                  }}
                  className="appearance-none vp-filter-selected pl-4 pr-10 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 whitespace-nowrap"
                >
                  <option value="id-asc">ID Tăng dần</option>
                  <option value="id-desc">ID Giảm dần</option>
                  <option value="title-asc">Tên A-Z</option>
                  <option value="title-desc">Tên Z-A</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;