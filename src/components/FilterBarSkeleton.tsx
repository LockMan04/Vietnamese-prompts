const FilterBarSkeleton = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 border-b border-gray-200/50 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse">
              <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
            <div>
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 animate-pulse" />
              <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Filter Content */}
        <div className="space-y-4">
          {/* Category Filter */}
          <div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBarSkeleton;

