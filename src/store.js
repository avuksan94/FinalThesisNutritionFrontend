import { createStore } from 'vuex';

export default createStore({
  state: {
    healthInfoUpdated: false,
    userInfoUpdated: false,
    recipeData: null,
    mealPlanData: null,
    ingredients: [],
    currentIngredient: null
  },
  actions: {
    closeUpdateForm({ commit }) {
      commit('hideUpdateForm');
    }
  },
  mutations: {
    resetState(state) {
      Object.assign(state, {
        healthInfoUpdated: false,
        userInfoUpdated: false,
        recipeData: null,
        mealPlanData: null,
        ingredients: [],
        currentIngredient: null
      });
    },
    setHealthInfoUpdated(state, value) {
      state.healthInfoUpdated = value;
    },
    setUserInfoUpdated(state, value) {
      state.userInfoUpdated = value;
    },
    setRecipeData(state, data) {
      state.recipeData = data;
    },
    setMealPlanData(state, data) {
      state.mealPlanData = data;
    },
    removeRecipeData(state, recipeId) {
      if (state.recipeData && state.recipeData.id === recipeId) {
        state.recipeData = null;
      }
    },
    removeMealPlanData(state, mealPlanId) {
      if (state.mealPlanData && state.mealPlanData.id === mealPlanId) {
        state.mealPlanData = null;
      }
    },
    setIngredients(state, ingredients) {
      state.ingredients = ingredients || [];
    },
    addIngredient(state, ingredient) {
      if (!state.ingredients) {
        state.ingredients = [];
      }
      state.ingredients.push(ingredient);
    },
    deleteIngredient(state, ingredientId) {
      state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== ingredientId);
    },
    removeIngredient(state, id) {
      const index = state.ingredients.findIndex(ing => ing.id === id);
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    setCurrentIngredient(state, ingredient) {
      state.currentIngredient = ingredient;
    },
    hideUpdateForm(state) {
      state.currentIngredient = null;
    },
  },
});
