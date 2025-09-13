import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2" style={{ borderColor: '#0c97fa' }}></div>
        <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 opacity-20" style={{ borderColor: '#0c97fa' }}></div>
      </div>
      <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg font-medium">
        Đang tải dữ liệu...
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-500 text-sm">
        Vui lòng chờ trong giây lát
      </p>
    </div>
  );
};

export default LoadingScreen;