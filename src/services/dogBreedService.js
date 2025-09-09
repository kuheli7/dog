import axios from 'axios';

const API_BASE_URL = 'https://dogapi.dog/api/v2';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dog Breed API Service
export const dogBreedService = {
  // Fetch all dog breeds with pagination
  async getAllBreeds(page = 1, limit = 10) {
    try {
      const response = await api.get(`/breeds?page[number]=${page}&page[size]=${limit}`);
      return {
        data: response.data.data,
        meta: response.data.meta,
        success: true,
      };
    } catch (error) {
      console.error('Error fetching dog breeds:', error);
      return {
        data: [],
        meta: null,
        success: false,
        error: error.message,
      };
    }
  },

  // Fetch all breeds without pagination (for complete list)
  async getAllBreedsComplete() {
    try {
      let allBreeds = [];
      let currentPage = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await api.get(`/breeds?page[number]=${currentPage}&page[size]=50`);
        allBreeds = [...allBreeds, ...response.data.data];
        
        // Check if there are more pages
        const meta = response.data.meta.pagination;
        hasMore = currentPage < meta.last;
        currentPage++;
      }

      return {
        data: allBreeds,
        success: true,
      };
    } catch (error) {
      console.error('Error fetching all dog breeds:', error);
      return {
        data: [],
        success: false,
        error: error.message,
      };
    }
  },

  // Fetch a specific breed by ID
  async getBreedById(id) {
    try {
      const response = await api.get(`/breeds/${id}`);
      return {
        data: response.data.data,
        success: true,
      };
    } catch (error) {
      console.error('Error fetching breed by ID:', error);
      return {
        data: null,
        success: false,
        error: error.message,
      };
    }
  },
};

export default dogBreedService;
