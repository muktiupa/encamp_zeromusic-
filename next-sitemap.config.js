const axios = require('axios');

// Utility function to validate and format URLs
const validateAndFormatUrls = (urls) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL || 'https://encampadventures.com';
  return urls
    .filter((url) => typeof url === 'string' && url.trim().length > 0) // Validate URLs
    .map((url) => {
      if (!url.startsWith('http')) {
        return `${baseUrl}${url}`;
      }
      return new URL(url).pathname; // Convert full URL to path
    });
};

// Function to fetch dynamic paths from the API
const fetchDynamicPaths = async () => {
  try {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_APIURL,
      headers: {
        'Accept-Encoding': 'compress',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    });
    const response = await axiosInstance.get('/listofurls'); // Fetch list of URLs
    const urls = response?.data?.allUrls ?? [];
    if (!Array.isArray(urls)) {
      console.error('Invalid data format received from API:', urls);
      return [];
    }
    console.log('Dynamic paths fetched:', urls); // Debug log
    const formattedUrls = validateAndFormatUrls(urls);
    console.log('Formatted paths:', formattedUrls); // Debug log
    return formattedUrls;
  } catch (error) {
    console.error('Error fetching dynamic paths:', error.message, error.stack);
    return [];
  }
};

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_BASEURL || 'https://encampadventures.com', // Base URL of the site
  generateRobotsTxt: true, // Generate robots.txt file
  generateIndexSitemap: false, // Generate an index sitemap
  exclude: [
    '/api/*', // Exclude all API routes
    '/404', // Exclude the 404 page
    '/zfm/*',
    '/ipdf/*',
    '/invoicetemplate',
    '/vehicleinvoicetemplate',
    '/decathlon',
    '/details.pdf'
  ],
  transform: async (config, path) => ({
    loc: path, // URL of the page
    changefreq: 'daily', // Change frequency for search engines
    priority: 0.7, // Priority of the URL
    lastmod: new Date().toISOString(), // Last modified date
  }),
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }, // Allow all user agents
    ],
  },
  additionalPaths: async (config) => {
    try {
      const dynamicPaths = await fetchDynamicPaths();
      return dynamicPaths.map((path) => ({
        loc: path,
        changefreq: 'daily', 
        priority: 0.8, 
        lastmod: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error generating additional paths:', error.message, error.stack);
      return [];
    }
  },
};

module.exports = config;
