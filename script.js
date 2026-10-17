import { createApp, onMounted } from 'vue';
import { AppState } from './js/state.js';
import { setupMethods } from './js/methods.js';
import { loadFromLocalStorage, getSampleRecipes } from './js/storageService.js';

createApp({
  setup() {
    // Initialize state
    const state = AppState();
    
    // Setup methods with state
    const methods = setupMethods(state);
    
    // Load data on start
    onMounted(() => {
      loadFromLocalStorage(state);
      
      // Generate initial shopping list
      methods.generateShoppingList();
    });
    
    return {
      // Expose all state and methods
      ...state,
      ...methods
    };
  }
}).mount('#app');