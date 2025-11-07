import React from 'react';
import { Search, X } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="text-center py-16">
      <div className="relative mb-6">
        <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto" />
        <div className="absolute inset-0 animate-pulse">
          <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 opacity-50 mx-auto" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Không tìm thấy kết quả
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Không có prompt nào phù hợp với bộ lọc hiện tại. Hãy thử điều chỉnh tiêu chí tìm kiếm.
      </p>
      
      <button
        onClick={onClearFilters}
        className="btn-vp-primary inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <X className="w-4 h-4" />
        <span>Xóa bộ lọc</span>
      </button>
    </div>
  );
};

export default EmptyState;