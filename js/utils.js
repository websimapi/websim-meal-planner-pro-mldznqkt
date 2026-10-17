/**
 * Safely access nested object properties without throwing errors
 * @param {Object} obj - The object to access
 * @param {string} path - Dot notation path to the property
 * @param {*} defaultValue - Default value to return if path doesn't exist
 * @returns {*} - The value at path or defaultValue if not found
 */
export function getNestedValue(obj, path, defaultValue = null) {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
}

/**
 * Debounce a function to prevent excessive calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}