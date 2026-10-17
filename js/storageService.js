export function saveToLocalStorage(state) {
  localStorage.setItem('meal-planner-favorites', JSON.stringify(state.favorites.value));
  localStorage.setItem('meal-planner-menu', JSON.stringify(state.menuWeeks.value));
  localStorage.setItem('meal-planner-household', JSON.stringify(state.householdEssentials.value));
  localStorage.setItem('meal-planner-kitchen', JSON.stringify(state.kitchenInventory.value));
  localStorage.setItem('meal-planner-week-start', state.weekStartDay.value.toString());
  localStorage.setItem('meal-planner-num-weeks', state.numberOfWeeks.value.toString());
}

export function loadFromLocalStorage(state) {
  const savedFavorites = localStorage.getItem('meal-planner-favorites');
  const savedMenu = localStorage.getItem('meal-planner-menu');
  const savedHousehold = localStorage.getItem('meal-planner-household');
  const savedKitchen = localStorage.getItem('meal-planner-kitchen');
  const savedWeekStart = localStorage.getItem('meal-planner-week-start');
  const savedNumWeeks = localStorage.getItem('meal-planner-num-weeks');
  
  if (savedFavorites) {
    const recipes = JSON.parse(savedFavorites);
    // Ensure all recipes have a category
    state.favorites.value = recipes.map(recipe => ({
      ...recipe,
      category: recipe.category || 'Lunch/Dinner'
    }));
  } else {
    // Add some default recipes for first-time users
    state.favorites.value = getSampleRecipes();
  }
  
  if (savedMenu) {
    state.menuWeeks.value = JSON.parse(savedMenu);
  }
  
  if (savedHousehold) {
    state.householdEssentials.value = JSON.parse(savedHousehold);
  } else {
    // Default household essentials
    state.householdEssentials.value = getDefaultHouseholdItems();
  }
  
  if (savedKitchen) {
    const kitchenItems = JSON.parse(savedKitchen);
    // Ensure all kitchen items have a category
    state.kitchenInventory.value = kitchenItems.map(item => ({
      ...item,
      category: item.category || 'Other'
    }));
  } else {
    // Default kitchen inventory
    state.kitchenInventory.value = getDefaultKitchenItems();
  }
  
  // Load menu settings
  if (savedWeekStart !== null) {
    state.weekStartDay.value = parseInt(savedWeekStart);
  }
  
  if (savedNumWeeks !== null) {
    state.numberOfWeeks.value = parseInt(savedNumWeeks);
    
    // Adjust number of weeks if needed
    adjustMenuWeeks(state);
  }
  
  if (savedMenu) {
    state.menuWeeks.value = JSON.parse(savedMenu);
    
    // Ensure we have the right number of weeks
    adjustMenuWeeks(state);
  }
}

// Helper function to adjust the number of weeks in the menu
function adjustMenuWeeks(state) {
  const currentWeeks = state.menuWeeks.value.length;
  const targetWeeks = state.numberOfWeeks.value;
  
  if (currentWeeks === targetWeeks) {
    return; // No adjustment needed
  }
  
  if (currentWeeks < targetWeeks) {
    // Add more weeks
    for (let i = currentWeeks; i < targetWeeks; i++) {
      state.menuWeeks.value.push(
        Array(7).fill().map(() => ({ breakfast: null, lunch: null, dinner: null }))
      );
    }
  } else {
    // Remove excess weeks
    state.menuWeeks.value = state.menuWeeks.value.slice(0, targetWeeks);
  }
}

export function getSampleRecipes() {
  return [
    {
      id: '1',
      title: 'Spaghetti Bolognese',
      description: 'Classic Italian pasta with rich meat sauce',
      ingredients: [
        { amount: '1 lb', name: 'Ground beef', category: 'Meat & Seafood' },
        { amount: '1', name: 'Onion, diced', category: 'Produce' },
        { amount: '2 cloves', name: 'Garlic, minced', category: 'Produce' },
        { amount: '1 can (14 oz)', name: 'Crushed tomatoes', category: 'Pantry' },
        { amount: '2 tbsp', name: 'Tomato paste', category: 'Pantry' },
        { amount: '1 tsp', name: 'Dried oregano', category: 'Pantry' },
        { amount: '1 tsp', name: 'Dried basil', category: 'Pantry' },
        { amount: '1 lb', name: 'Spaghetti', category: 'Pantry' },
        { amount: '1/4 cup', name: 'Parmesan cheese, grated', category: 'Dairy' }
      ],
      instructions: '1. Brown the ground beef in a large pan over medium heat.\n2. Add onions and garlic, cook until softened.\n3. Stir in crushed tomatoes, tomato paste, and herbs.\n4. Simmer for 20 minutes, stirring occasionally.\n5. Meanwhile, cook spaghetti according to package directions.\n6. Drain pasta and serve topped with sauce and grated Parmesan.',
      isDefault: true,
      category: 'Lunch/Dinner'
    },
    {
      id: '2',
      title: 'Chicken Stir Fry',
      description: 'Quick and healthy weeknight dinner with vegetables',
      ingredients: [
        { amount: '1 lb', name: 'Chicken breast, sliced', category: 'Meat & Seafood' },
        { amount: '2 cups', name: 'Mixed vegetables', category: 'Frozen' },
        { amount: '3 tbsp', name: 'Soy sauce', category: 'Pantry' },
        { amount: '1 tbsp', name: 'Honey', category: 'Pantry' },
        { amount: '2 cloves', name: 'Garlic, minced', category: 'Produce' },
        { amount: '1 tbsp', name: 'Ginger, grated', category: 'Produce' },
        { amount: '2 cups', name: 'Rice, cooked', category: 'Pantry' }
      ],
      instructions: '1. Cook rice according to package directions.\n2. Heat oil in a wok or large skillet over high heat.\n3. Add chicken and stir fry until cooked through, about 5-6 minutes.\n4. Add vegetables, garlic, and ginger, stir fry for 3-4 minutes.\n5. Mix soy sauce and honey, then add to the pan.\n6. Stir to coat everything evenly and cook for another minute.\n7. Serve over cooked rice.',
      isDefault: false,
      category: 'Lunch/Dinner'
    },
    {
      id: '3',
      title: 'Greek Salad',
      description: 'Fresh Mediterranean salad with feta cheese',
      ingredients: [
        { amount: '1', name: 'Cucumber, diced', category: 'Produce' },
        { amount: '2', name: 'Tomatoes, diced', category: 'Produce' },
        { amount: '1', name: 'Red onion, thinly sliced', category: 'Produce' },
        { amount: '1 cup', name: 'Feta cheese, crumbled', category: 'Dairy' },
        { amount: '1/2 cup', name: 'Kalamata olives', category: 'Pantry' },
        { amount: '3 tbsp', name: 'Olive oil', category: 'Pantry' },
        { amount: '2 tbsp', name: 'Red wine vinegar', category: 'Pantry' },
        { amount: '1 tsp', name: 'Dried oregano', category: 'Pantry' }
      ],
      instructions: '1. Combine cucumber, tomatoes, and red onion in a large bowl.\n2. Add olives and crumbled feta cheese.\n3. In a small bowl, whisk together olive oil, red wine vinegar, and oregano.\n4. Pour dressing over salad and toss gently to combine.\n5. Serve immediately or refrigerate for up to 1 hour before serving.',
      isDefault: false,
      category: 'Lunch/Dinner'
    },
    {
      id: '4',
      title: 'Pancakes',
      description: 'Fluffy homemade pancakes, perfect for weekend mornings',
      ingredients: [
        { amount: '1 1/2 cups', name: 'All-purpose flour', category: 'Pantry' },
        { amount: '3 1/2 tsp', name: 'Baking powder', category: 'Pantry' },
        { amount: '1 tsp', name: 'Salt', category: 'Pantry' },
        { amount: '1 tbsp', name: 'White sugar', category: 'Pantry' },
        { amount: '1 1/4 cups', name: 'Milk', category: 'Dairy' },
        { amount: '1', name: 'Egg', category: 'Dairy' },
        { amount: '3 tbsp', name: 'Butter, melted', category: 'Dairy' }
      ],
      instructions: '1. In a large bowl, sift together the flour, baking powder, salt and sugar.\n2. Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.\n3. Heat a lightly oiled griddle or frying pan over medium-high heat.\n4. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.\n5. Brown on both sides and serve hot with maple syrup and butter.',
      isDefault: false,
      category: 'Breakfast'
    },
    {
      id: '5',
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade chocolate chip cookies that are soft and chewy',
      ingredients: [
        { amount: '2 1/4 cups', name: 'All-purpose flour', category: 'Pantry' },
        { amount: '1 tsp', name: 'Baking soda', category: 'Pantry' },
        { amount: '1 tsp', name: 'Salt', category: 'Pantry' },
        { amount: '1 cup', name: 'Unsalted butter, softened', category: 'Dairy' },
        { amount: '3/4 cup', name: 'White sugar', category: 'Pantry' },
        { amount: '3/4 cup', name: 'Brown sugar', category: 'Pantry' },
        { amount: '2', name: 'Eggs', category: 'Dairy' },
        { amount: '2 tsp', name: 'Vanilla extract', category: 'Pantry' },
        { amount: '2 cups', name: 'Chocolate chips', category: 'Pantry' }
      ],
      instructions: '1. Preheat oven to 375°F (190°C).\n2. Combine flour, baking soda, and salt in a small bowl.\n3. Beat butter, white sugar, and brown sugar in a large bowl until creamy.\n4. Add eggs one at a time, beating well after each addition, then stir in vanilla.\n5. Gradually beat in flour mixture, then stir in chocolate chips.\n6. Drop by rounded tablespoon onto ungreased baking sheets.\n7. Bake for 9 to 11 minutes or until golden brown.\n8. Let stand for 2 minutes; remove to wire racks to cool completely.',
      isDefault: false,
      category: 'Dessert'
    },
    {
      id: '6',
      title: 'Roast Turkey',
      description: 'Traditional holiday roast turkey with herbs and butter',
      ingredients: [
        { amount: '12-15 lbs', name: 'Whole turkey', category: 'Meat & Seafood' },
        { amount: '1 cup', name: 'Butter, softened', category: 'Dairy' },
        { amount: '2 tbsp', name: 'Fresh rosemary, chopped', category: 'Produce' },
        { amount: '2 tbsp', name: 'Fresh thyme, chopped', category: 'Produce' },
        { amount: '2 tbsp', name: 'Fresh sage, chopped', category: 'Produce' },
        { amount: '2', name: 'Onions, quartered', category: 'Produce' },
        { amount: '2', name: 'Carrots, chopped', category: 'Produce' },
        { amount: '2', name: 'Celery stalks, chopped', category: 'Produce' },
        { amount: '1', name: 'Lemon, quartered', category: 'Produce' },
        { amount: '3 cups', name: 'Chicken broth', category: 'Pantry' }
      ],
      instructions: '1. Preheat oven to 325°F (165°C).\n2. Remove giblets and neck from turkey cavity, rinse turkey and pat dry.\n3. Mix softened butter with chopped herbs, salt, and pepper.\n4. Carefully separate the skin from the turkey breast and spread butter mixture underneath.\n5. Stuff cavity with onion, carrot, celery, and lemon quarters.\n6. Place turkey on a rack in a large roasting pan and pour chicken broth in the bottom.\n7. Roast for about 15 minutes per pound, or until a meat thermometer inserted in the thickest part reads 165°F.\n8. Baste occasionally with pan juices.\n9. Tent with foil if browning too quickly.\n10. Let rest for 20-30 minutes before carving.',
      isDefault: false,
      category: 'Holiday'
    }
  ];
}

function getDefaultHouseholdItems() {
  return [
    { id: 'h1', name: 'Paper towels', checked: false },
    { id: 'h2', name: 'Toilet paper', checked: false },
    { id: 'h3', name: 'Dish soap', checked: false },
    { id: 'h4', name: 'Laundry detergent', checked: false },
    { id: 'h5', name: 'All-purpose cleaner', checked: false },
    { id: 'h6', name: 'Trash bags', checked: false },
    { id: 'h7', name: 'Hand soap', checked: false },
    { id: 'h8', name: 'Tissues', checked: false }
  ];
}

function getDefaultKitchenItems() {
  return [
    { id: 'k1', name: 'Salt', checked: false, category: 'Spices' },
    { id: 'k2', name: 'Pepper', checked: false, category: 'Spices' },
    { id: 'k3', name: 'Olive oil', checked: false, category: 'Pantry' },
    { id: 'k4', name: 'Flour', checked: false, category: 'Pantry' },
    { id: 'k5', name: 'Sugar', checked: false, category: 'Pantry' },
    { id: 'k6', name: 'Rice', checked: false, category: 'Pantry' },
    { id: 'k7', name: 'Pasta', checked: false, category: 'Pantry' },
    { id: 'k8', name: 'Canned tomatoes', checked: false, category: 'Pantry' },
    { id: 'k9', name: 'Milk', checked: false, category: 'Dairy & Cold Food' },
    { id: 'k10', name: 'Eggs', checked: false, category: 'Dairy & Cold Food' },
    { id: 'k11', name: 'Cheese', checked: false, category: 'Dairy & Cold Food' },
    { id: 'k12', name: 'Butter', checked: false, category: 'Dairy & Cold Food' },
    { id: 'k13', name: 'Onions', checked: false, category: 'Produce' },
    { id: 'k14', name: 'Garlic', checked: false, category: 'Produce' },
    { id: 'k15', name: 'Frozen vegetables', checked: false, category: 'Frozen' },
    { id: 'k16', name: 'Bread', checked: false, category: 'Bakery' }
  ];
}