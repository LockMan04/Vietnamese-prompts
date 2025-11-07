import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorScreenProps {
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ onRetry }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <div className="absolute inset-0 animate-ping">
            <AlertCircle className="w-16 h-16 text-red-500 opacity-20 mx-auto" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Đã xảy ra lỗi
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          Không thể tải dữ liệu. Vui lòng kiểm tra kết nối mạng và thử lại.
        </p>
        
        <button
          onClick={onRetry}
          className="btn-vp-primary inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Thử lại</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;