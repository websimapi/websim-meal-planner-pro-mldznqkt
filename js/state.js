import { ref, computed } from 'vue';

export function AppState() {
  // State
  const activeTab = ref('menu');
  const favorites = ref([]);
  const menuWeeks = ref([
    Array(7).fill().map(() => ({ breakfast: null, lunch: null, dinner: null })),
    Array(7).fill().map(() => ({ breakfast: null, lunch: null, dinner: null }))
  ]);
  const shoppingItems = ref([]);
  
  // New menu settings
  const weekStartDay = ref(0); // 0 = Monday, 1 = Tuesday, ... 6 = Sunday
  const numberOfWeeks = ref(2); // Default is 2 weeks
  
  // New checklist items
  const householdEssentials = ref([]);
  const kitchenInventory = ref([]);
  
  // Dark mode setting
  const darkMode = ref(localStorage.getItem('meal-planner-dark-mode') === 'true');
  
  // Recipe form
  const recipeForm = ref({
    title: '',
    description: '',
    ingredients: [{ amount: '', name: '', category: 'Produce' }],
    instructions: '',
    isDefault: false,
    category: 'Lunch/Dinner' // Default category
  });
  
  // Search and filters
  const searchTerm = ref('');
  const selectorSearchTerm = ref('');
  const categoryFilter = ref('All');
  const defaultFilter = ref(false);
  
  // Modals control
  const showAddRecipeModal = ref(false);
  const showAddFromUrlModal = ref(false);
  const showViewRecipeModal = ref(false);
  const showRecipeSelectorModal = ref(false);
  const showConfirmModal = ref(false);
  const showAddItemModal = ref(false);
  
  // URL import
  const recipeUrl = ref('');
  const urlError = ref('');
  const isLoading = ref(false);
  
  // Selected items for operations
  const selectedRecipe = ref({});
  const selectedDay = ref({ week: 0, day: 0, mealType: 'dinner' });
  const selectedList = ref('');
  const newItemName = ref('');
  const newItemCategory = ref('Pantry');
  
  // Confirmation modal
  const confirmAction = ref(() => {});
  const confirmTitle = ref('');
  const confirmMessage = ref('');
  
  // Editing state
  const editingRecipe = ref(false);
  
  // Recipe categories
  const recipeCategories = ref(['Holiday', 'Breakfast', 'Lunch/Dinner', 'Dessert']);
  
  // Kitchen categories
  const kitchenCategories = ref(['Produce', 'Dairy & Cold Food', 'Meat & Seafood', 'Pantry', 'Frozen', 'Bakery', 'Spices', 'Other']);
  const kitchenCategoryFilter = ref('All');
  
  // Import/Export state
  const showImportModal = ref(false);
  const importOption = ref('merge');
  const fileSelected = ref(false);
  const importError = ref('');
  
  // Add settings menu state
  const showSettingsMenu = ref(false);
  
  // Computed properties
  const filteredFavorites = computed(() => {
    let filtered = favorites.value;
    
    // Filter by search term
    if (searchTerm.value) {
      const term = searchTerm.value.toLowerCase();
      filtered = filtered.filter(recipe => {
        return recipe.title.toLowerCase().includes(term) || 
               recipe.description.toLowerCase().includes(term);
      });
    }
    
    // Filter by default status
    if (defaultFilter.value) {
      filtered = filtered.filter(recipe => recipe.isDefault);
    }
    
    // Filter by category
    if (categoryFilter.value !== 'All') {
      filtered = filtered.filter(recipe => recipe.category === categoryFilter.value);
    }
    
    return filtered;
  });
  
  const filteredSelectorFavorites = computed(() => {
    if (!selectorSearchTerm.value) return favorites.value;
    
    const term = selectorSearchTerm.value.toLowerCase();
    return favorites.value.filter(recipe => {
      return recipe.title.toLowerCase().includes(term) || 
             recipe.description.toLowerCase().includes(term);
    });
  });
  
  const groupedShoppingItems = computed(() => {
    const grouped = {};
    
    shoppingItems.value.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    
    return grouped;
  });
  
  const groupedKitchenItems = computed(() => {
    const filtered = kitchenCategoryFilter.value === 'All' 
      ? kitchenInventory.value 
      : kitchenInventory.value.filter(item => item.category === kitchenCategoryFilter.value);
    
    const grouped = {};
    
    filtered.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    
    return grouped;
  });
  
  return {
    activeTab,
    favorites,
    menuWeeks,
    shoppingItems,
    householdEssentials,
    kitchenInventory,
    darkMode,
    recipeForm,
    weekStartDay,
    numberOfWeeks,
    searchTerm,
    selectorSearchTerm,
    categoryFilter,
    defaultFilter,
    showAddRecipeModal,
    showAddFromUrlModal,
    showViewRecipeModal,
    showRecipeSelectorModal,
    showConfirmModal,
    showAddItemModal,
    recipeUrl,
    urlError,
    isLoading,
    selectedRecipe,
    selectedDay,
    selectedList,
    newItemName,
    newItemCategory,
    confirmAction,
    confirmTitle,
    confirmMessage,
    editingRecipe,
    recipeCategories,
    kitchenCategories,
    kitchenCategoryFilter,
    filteredFavorites,
    filteredSelectorFavorites,
    groupedShoppingItems,
    groupedKitchenItems,
    showImportModal,
    importOption,
    fileSelected,
    importError,
    showSettingsMenu
  };
}