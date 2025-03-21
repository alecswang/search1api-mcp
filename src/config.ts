import dotenv from "dotenv";

dotenv.config();

// Check API key
const API_KEY = process.env.SEARCH1API_KEY;

if (!API_KEY) {
  throw new Error("SEARCH1API_KEY environment variable is required");
}

// API configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.search1api.com',
  DEFAULT_QUERY: 'latest news in the world',
  ENDPOINTS: {
    SEARCH: '/search',
    CRAWL: '/crawl',
    SITEMAP: '/sitemap',
    NEWS: '/news',
    REASONING: '/v1/chat/completions',
    TRENDING: '/trending'
  }
} as const;

// Export API key
export { API_KEY };