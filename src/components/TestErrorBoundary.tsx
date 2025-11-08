import { useState } from 'react';
import { Bug } from 'lucide-react';

const TestErrorBoundary = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test Error: Đây là lỗi test để kiểm tra Error Boundary!');
  }

  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setShouldThrow(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-sm font-medium transition-colors"
        title="Test Error Boundary"
      >
        <Bug className="w-4 h-4" />
        <span>Test Error Boundary</span>
      </button>
    </div>
  );
};

export default TestErrorBoundary;

