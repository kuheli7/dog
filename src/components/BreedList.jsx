import React, { useState, useEffect } from 'react';
import BreedCard from './BreedCard';
import { LoadingSpinner, LoadingCard } from './LoadingComponents';
import ErrorMessage from './ErrorMessage';
import { dogBreedService } from '../services/dogBreedService';

const BreedList = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [hypoallergenicFilter, setHypoallergenicFilter] = useState('all');

  // Fetch breeds on component mount
  useEffect(() => {
    fetchBreeds();
  }, []);

  // Filter breeds based on search term and hypoallergenic filter
  useEffect(() => {
    let filtered = breeds;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(breed =>
        breed.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        breed.attributes.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by hypoallergenic status
    if (hypoallergenicFilter !== 'all') {
      const isHypoallergenic = hypoallergenicFilter === 'hypoallergenic';
      filtered = filtered.filter(breed => breed.attributes.hypoallergenic === isHypoallergenic);
    }

    setFilteredBreeds(filtered);
  }, [breeds, searchTerm, hypoallergenicFilter]);

  const fetchBreeds = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await dogBreedService.getAllBreedsComplete();
      
      if (result.success) {
        setBreeds(result.data);
        setFilteredBreeds(result.data);
      } else {
        setError(result.error || 'Failed to fetch dog breeds');
      }
    } catch (err) {
      setError('An unexpected error occurred while fetching dog breeds');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchBreeds();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setHypoallergenicFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setHypoallergenicFilter('all');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Dog Breed Explorer</h1>
            <p className="text-lg text-gray-600">Discover amazing dog breeds from around the world</p>
          </div>
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
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Dog Breed Explorer</h1>
            <p className="text-lg text-gray-600">Discover amazing dog breeds from around the world</p>
          </div>
          <div className="flex flex-col items-center justify-center min-h-64 space-y-6 bg-red-50 rounded-lg border border-red-200 p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-red-900 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-red-700 mb-4 max-w-md">
                {error || "We couldn't fetch the dog breeds at the moment. Please check your internet connection and try again."}
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dog Breed Explorer</h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover amazing dog breeds from around the world
          </p>
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            {filteredBreeds.length} breed{filteredBreeds.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by breed name or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Hypoallergenic Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="hypoallergenic-filter" className="text-sm font-medium text-gray-700">
                Filter:
              </label>
              <select
                id="hypoallergenic-filter"
                value={hypoallergenicFilter}
                onChange={handleFilterChange}
                className="block w-40 px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Breeds</option>
                <option value="hypoallergenic">Hypoallergenic</option>
                <option value="non-hypoallergenic">Non-Hypoallergenic</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || hypoallergenicFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredBreeds.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No breeds found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or clearing the filters.
            </p>
          </div>
        ) : (
          /* Breeds Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Data provided by{' '}
            <a 
              href="https://dogapi.dog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Dog API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreedList;
