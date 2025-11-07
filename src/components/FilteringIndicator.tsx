
const FilteringIndicator = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="vp-loader animate-spin rounded-full h-12 w-12 border-b-2 vp-border-color"></div>
          <div className="vp-loader absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 opacity-20 vp-border-color"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Đang lọc kết quả...</p>
      </div>
    </div>
  );
};

export default FilteringIndicator;
