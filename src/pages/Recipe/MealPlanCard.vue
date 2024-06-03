<template>
  <card class="card-meal-plan">
    <div class="meal-plan-details">
      <div class="meal-plan-header">
        <h3>{{ $t('generate_meal_plan.meal_plan_for') }} {{ displayMealPlan.createdAt }}</h3>
      </div>
      <div class="meals-container">
        <div v-for="meal in displayMealPlan.meals" :key="meal.meal" class="meal-section">
          <h4>{{ meal.meal }}</h4>
          <div class="recipe-card">
            <div>
              <h5 class="title">
                {{ meal.recipe.title }}
                <br />
                <small>{{ meal.recipe.description }}</small>
              </h5>
            </div>
            <div class="recipe-details">
              <h6>{{ $t('recipe_card.ingredients') }}</h6>
              <ul>
                <li v-for="ingredient in meal.recipe.ingredients" :key="ingredient.ingredientId">
                  {{ ingredient.quantity }} {{ ingredient.unit }} - {{ ingredient.name }}
                </li>
              </ul>
              <h6>{{ $t('recipe_card.preparation_steps') }}</h6>
              <ol>
                <li v-for="(step, index) in meal.recipe.preparationSteps" :key="index">
                  {{ step }}
                </li>
              </ol>
              <h6>{{ $t('recipe_card.nutrition_summary') }}</h6>
              <ul>
                <li>{{ $t('recipe_card.total_calories') }} {{ meal.recipe.nutritionSummary.totalCalories }}g</li>
                <li>{{ $t('recipe_card.total_protein') }} {{ meal.recipe.nutritionSummary.totalProtein }}g</li>
                <li>{{ $t('recipe_card.total_carbs') }} {{ meal.recipe.nutritionSummary.totalCarbs }}g</li>
                <li>{{ $t('recipe_card.total_fats') }} {{ meal.recipe.nutritionSummary.totalFats }}g</li>
                <li>{{ $t('recipe_card.total_fiber') }} {{ meal.recipe.nutritionSummary.totalFiber }}g</li>
                <li>{{ $t('recipe_card.total_sugar') }} {{ meal.recipe.nutritionSummary.totalSugar }}g</li>
              </ul>
              <h6>{{ $t('recipe_card.cooking_time') }}</h6>
              <p>{{ meal.recipe.cookingTime }} {{ $t('recipe_card.time_value') }}</p>
              <h6>{{ $t('recipe_card.servings') }}</h6>
              <p>{{ meal.recipe.servings }}</p>
              <h6 v-if="meal.recipe.notes">{{ $t('recipe_card.notes') }}</h6>
              <p>{{ meal.recipe.notes }}</p>
              <h6 v-if="meal.recipe.healthWarning">{{ $t('recipe_card.health_warning') }}</h6>
              <p v-if="meal.recipe.healthWarning">{{ meal.recipe.healthWarning }}</p>
            </div>
          </div>
        </div>
      </div>
      <button @click="deleteUserMealPlan(displayMealPlan.id)" class="delete-mp-btn">
          <i class="bi bi-eraser"></i> {{ $t('recipe_card.delete_recipe') }}
        </button>
    </div>
  </card>
</template>
  
  
<script>
import axios from 'axios';
export default {
  data() {
    return {
      mealPlan: {
        healthTrackerId: "",
        createdAt: new Date(),
        meals: [],
      },
    };
  },
  methods: {
    async deleteUserMealPlan(mealPlanId) {
      const username = localStorage.getItem("nutrioUser");
      const token = localStorage.getItem("token");

      if (!username || !token) {
        console.error("Username or token not found in storage.");
        return;
      }

      const recipeURL = `/mealPlansGen/${mealPlanId}`;
      try {
        await axios.delete(recipeURL, { headers: { Authorization: `Bearer ${token}` } });
        this.$store.commit('removeMealPlanData', mealPlanId);
      } catch (error) {
        console.error("Error deleting the meal plan:", error);
      }
    }
  },
  computed: {
    displayMealPlan() {
      console.log('Current meal plan data:', this.mealPlan);
      return this.$store.state.mealPlanData;
    }
  }
};
</script>
  
<style scoped>
.card-meal-plan {
  max-width: 1200px;
  margin: auto;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.meal-plan-details {
  padding: 20px;
}

.meal-plan-header {
  text-align: center;
  margin-bottom: 20px;
}

.meals-container {
  display: flex;
  justify-content: space-around;
}

.meal-section {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  margin: 10px;
}

.recipe-card {
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.author {
  text-align: center;
}

.author .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.recipe-details h6 {
  margin-top: 10px;
  font-size: 16px;
  margin-bottom: 5px;
}

.recipe-details ul,
.recipe-details ol {
  margin: 0;
  padding-left: 20px;
}

.delete-mp-btn {
  background-color: #d9534f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
