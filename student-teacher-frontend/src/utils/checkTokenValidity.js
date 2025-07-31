import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    // Handle demo tokens (tokens that start with 'demo-token-')
    if (token && token.startsWith('demo-token-')) {
      // Extract timestamp from demo token (demo-token-1234567890)
      const timestamp = token.split('-')[2];
      if (timestamp) {
        const tokenTime = parseInt(timestamp);
        const currentTime = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // Check if token is older than 24 hours
        return (currentTime - tokenTime) > sessionDuration;
      }
      return false; // If no timestamp, never expire
    }
    
    // Handle real JWT tokens
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    // If token can't be decoded, treat it as expired
    return true;
  }
};

// Debug function to check token status
export const debugToken = (token) => {
  if (!token) {
    return { valid: false, reason: 'No token provided' };
  }
  
  if (token.startsWith('demo-token-')) {
    const timestamp = token.split('-')[2];
    if (timestamp) {
      const tokenTime = parseInt(timestamp);
      const currentTime = Date.now();
      const sessionDuration = 24 * 60 * 60 * 1000;
      const isExpired = (currentTime - tokenTime) > sessionDuration;
      
      return {
        valid: !isExpired,
        type: 'demo',
        tokenTime: new Date(tokenTime).toLocaleString(),
        currentTime: new Date(currentTime).toLocaleString(),
        sessionDuration: '24 hours',
        isExpired
      };
    }
    return { valid: true, type: 'demo', reason: 'No timestamp' };
  }
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const isExpired = decoded.exp < currentTime;
    
    return {
      valid: !isExpired,
      type: 'jwt',
      exp: new Date(decoded.exp * 1000).toLocaleString(),
      currentTime: new Date(currentTime * 1000).toLocaleString(),
      isExpired
    };
  } catch (error) {
    return { valid: false, type: 'invalid', reason: error.message };
  }
}; 