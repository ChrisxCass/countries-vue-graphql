import axios from 'axios';

const unplashApi = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
      'Authorization': 'Client-ID m3b8aoFC4OG6h7X0R73F2jLFXOL9rAokW_9W3SpmZX4',
      'Content-Type': 'application/json'
      },
  });

export default unplashApi;