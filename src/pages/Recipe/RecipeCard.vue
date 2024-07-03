<template>
  <card class="card-recipe" v-if="displayRecipe">
    <div class="recipe-container">
      <div class="recipe-left">
        <h5>{{ $t('recipe_card.ingredients') }}</h5>
        <ul>
          <li v-for="ingredient in displayRecipe.ingredients" :key="ingredient.ingredientId">
            {{ ingredient.quantity }} {{ ingredient.unit }} - {{ ingredient.name }}
          </li>
        </ul>
        <h5>{{ $t('recipe_card.preparation_steps') }}</h5>
        <ol>
          <li v-for="(step, index) in displayRecipe.preparationSteps" :key="index">
            {{ step }}
          </li>
        </ol>
        <button @click="deleteUserRecipe(displayRecipe.id)" class="delete-recipe-btn">
          <i class="bi bi-eraser"></i> {{ $t('recipe_card.delete_recipe') }}
        </button>
      </div>
      <div class="recipe-right">
        <div class="author">
          <h4 class="title">
            {{ displayRecipe.title }}
            <br />
            <small>{{ displayRecipe.description }}</small>
          </h4>
        </div>
        <div class="recipe-details">
          <h5>{{ $t('recipe_card.nutrition_summary') }}</h5>
            <ul>
              <li>{{ $t('recipe_card.total_calories') }} {{ displayRecipe.nutritionSummary.totalCalories }}g</li>
              <li>{{ $t('recipe_card.total_protein') }} {{ displayRecipe.nutritionSummary.totalProtein }}g</li>
              <li>{{ $t('recipe_card.total_carbs') }} {{ displayRecipe.nutritionSummary.totalCarbs }}g</li>
              <li>{{ $t('recipe_card.total_fats') }} {{ displayRecipe.nutritionSummary.totalFats }}g</li>
              <li>{{ $t('recipe_card.total_fiber') }} {{ displayRecipe.nutritionSummary.totalFiber }}g</li>
              <li>{{ $t('recipe_card.total_sugar') }} {{ displayRecipe.nutritionSummary.totalSugar }}g</li>
            </ul>
          <h5>{{ $t('recipe_card.cooking_time') }} {{ displayRecipe.cookingTime }} {{ $t('recipe_card.time_value') }}</h5>
          <h5>{{ $t('recipe_card.servings') }} {{ displayRecipe.servings }}</h5>
          <div v-if="displayRecipe.notes" class="notes">
            <h5>{{ $t('recipe_card.notes') }}</h5>
            <p>{{ displayRecipe.notes }}</p>
          </div>
          <div v-if="displayRecipe.healthWarning" class="health-warning">
            <h5>{{ $t('recipe_card.health_warning') }}</h5>
            <p>{{ displayRecipe.healthWarning }}</p>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>
  
<script>
import axios from 'axios'
export default {
  computed: {
    displayRecipe() {
      console.log('Current recipe data:', this.recipe);
      return this.$store.state.recipeData;
    }
  },
  methods: {
    async deleteUserRecipe(recipeId) {
      const username = localStorage.getItem("nutrioUser");
      const token = localStorage.getItem("token");

      if (!username || !token) {
        console.error("Username or token not found in storage.");
        return;
      }

      const recipeURL = `/recipesByUser/${recipeId}`;
      try {
        await axios.delete(recipeURL, { headers: { Authorization: `Bearer ${token}` } });
        this.$store.commit('removeRecipeData', recipeId);
      } catch (error) {
        console.error("Error deleting the recipe:", error);
      }
    }
  }
};
</script>
  
<style scoped>
.card-recipe {
  max-width: 1200px;
  margin: auto;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}

.recipe-container {
  display: flex;
  width: 100%;
}

.recipe-left,
.recipe-right {
  flex: 1;
  margin: 10px;
}

.author {
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.recipe-details h5 {
  margin-top: 20px;
  font-size: 18px;
  margin-bottom: 10px;
}

.recipe-details ul,
.recipe-details ol {
  margin: 0;
  padding-left: 20px;
}

.notes {
  background-color: #f3bb45;
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.health-warning {
  background-color: #d9534f;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
}

.delete-recipe-btn {
  background-color: #d9534f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}</style>
