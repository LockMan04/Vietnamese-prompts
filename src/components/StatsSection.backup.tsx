import React from 'react';
import { FileText, Folder, Users } from 'lucide-react';

interface StatsSectionProps {
  totalPrompts: number;
  totalCategories: number;
  totalTypes: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ totalPrompts, totalCategories, totalTypes }) => {
  const stats = [
    {
      icon: FileText,
      label: 'Tổng số prompts',
      value: totalPrompts,
      bgGradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
      darkBgGradient: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(59, 130, 246, 0.2))',
      iconBg: 'rgba(59, 130, 246, 0.2)',
      iconColor: '#2563eb',
      textGradient: 'linear-gradient(135deg, #2563eb, #3b82f6)'
    },
    {
      icon: Folder,
      label: 'Lĩnh vực',
      value: totalCategories,
      bgGradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      darkBgGradient: 'linear-gradient(135deg, rgba(4, 120, 87, 0.2), rgba(16, 185, 129, 0.2))',
      iconBg: 'rgba(16, 185, 129, 0.2)',
      iconColor: '#059669',
      textGradient: 'linear-gradient(135deg, #059669, #10b981)'
    },
    {
      icon: Users,
      label: 'Loại prompt',
      value: totalTypes,
      bgGradient: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
      darkBgGradient: 'linear-gradient(135deg, rgba(109, 40, 217, 0.2), rgba(147, 51, 234, 0.2))',
      iconBg: 'rgba(147, 51, 234, 0.2)',
      iconColor: '#7c3aed',
      textGradient: 'linear-gradient(135deg, #7c3aed, #8b5cf6)'
    }
  ];

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg"
            style={{
              background: 'var(--theme-bg, white)',
              borderColor: 'var(--theme-border, #e5e7eb)'
            }}
          >
            {/* Background circle decoration */}
            <div 
              className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 transform -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: stat.iconColor }}
            />
            
            <div className="relative">
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: stat.iconBg }}
                >
                  <stat.icon 
                    className="w-6 h-6" 
                    style={{ color: stat.iconColor }}
                  />
                </div>
                <div>
                  <h3 
                    className="text-3xl font-bold"
                    style={{
                      background: stat.textGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {stat.value}
                  </h3>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: stat.iconColor }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {index === 0 && 'Tổng số prompts trong thư viện'}
                {index === 1 && 'Đa dạng chủ đề và ngành nghề'}
                {index === 2 && 'Text, Hình ảnh, Video AI'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;