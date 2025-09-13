import React from 'react';
import { BookOpen, Tag, Zap } from 'lucide-react';

interface StatsSectionProps {
  totalPrompts: number;
  totalCategories: number;
  totalTypes: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ totalPrompts, totalCategories, totalTypes }) => {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Prompts Count */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-100 dark:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {totalPrompts}
                </h3>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Prompts có sẵn</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Tổng số prompts trong thư viện</p>
          </div>
        </div>

        {/* Categories Count */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-emerald-100 dark:border-gray-600 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <Tag className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {totalCategories}
                </h3>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Lĩnh vực</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Đa dạng chủ đề và ngành nghề</p>
          </div>
        </div>

        {/* Types Count */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-purple-100 dark:border-gray-600 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {totalTypes}
                </h3>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Loại prompt</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Text, Hình ảnh, Video AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;