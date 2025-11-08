const StatsSectionSkeleton = () => {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Prompts Count Skeleton */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-100 dark:border-gray-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-lg mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-3 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
        </div>

        {/* Categories Count Skeleton */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-emerald-100 dark:border-gray-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="h-8 w-12 bg-gray-300 dark:bg-gray-600 rounded-lg mb-2 animate-pulse" />
              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-3 w-36 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
        </div>

        {/* Types Count Skeleton */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-purple-100 dark:border-gray-600 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-lg mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-3 w-28 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default StatsSectionSkeleton;

