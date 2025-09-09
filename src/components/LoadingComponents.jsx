import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-solid rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Fetching Dog Breeds
        </h3>
        <p className="text-sm text-gray-500">
          Please wait while we load the amazing dog breeds for you...
        </p>
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
      {/* Card Header Skeleton */}
      <div className="bg-gray-300 px-6 py-4">
        <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-400 rounded w-1/2"></div>
      </div>

      {/* Card Body Skeleton */}
      <div className="p-6">
        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        {/* Details Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="h-3 bg-gray-300 rounded w-8 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="h-3 bg-gray-300 rounded w-10 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Skeleton */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export { LoadingSpinner, LoadingCard };
