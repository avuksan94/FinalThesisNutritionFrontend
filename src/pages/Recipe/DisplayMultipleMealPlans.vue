<template>
  <div v-if="mealPlans.length > 0">
    <div v-for="(mealPlan, index) in mealPlans" :key="index" class="card-meal-plan">
      <div class="meal-plan-header">
        <h3>{{ $t('generate_meal_plan.meal_plan_for') }} {{ formatDate(mealPlan.createdAt) }}</h3>
        <div class="row justify-content-center">
        <button @click="deleteUserMealPlan(mealPlan.id)" class="delete-mp-btn">
          <i class="bi bi-eraser"></i> {{ $t('meal_plan_card.meal_card_delete_meal') }}
        </button>
      </div>
      </div>
      <div class="meal-plan-details">
        <div class="meals-container">
          <div v-for="(meal, mealIndex) in mealPlan.meals" :key="mealIndex" class="meal-section">
            <h4>{{ meal.meal }}</h4>
            <div class="recipe-card">
              <h5 class="title">
                {{ meal.recipe.title }}
                <br />
                <small>{{ meal.recipe.description }}</small>
              </h5>
              <div class="recipe-details">
                <h6>{{ $t('recipe_card.ingredients') }}</h6>
                <ul>
                  <li v-for="ingredient in meal.recipe.ingredients" :key="ingredient.id">
                    {{ ingredient.quantity }} {{ ingredient.unit }} - {{ ingredient.name }}
                  </li>
                </ul>
                <h6>{{ $t('recipe_card.preparation_steps') }}</h6>
                <ol>
                  <li v-for="(step, stepIndex) in meal.recipe.preparationSteps" :key="stepIndex">
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
                <h6>{{ $t('recipe_card.notes') }}</h6>
                <p>{{ meal.recipe.notes }}</p>
                <h6 v-if="meal.recipe.healthWarning">{{ $t('recipe_card.health_warning') }}</h6>
                <p v-if="meal.recipe.healthWarning">{{ meal.recipe.healthWarning }}</p>

                <notification-component v-model:visible="notifications[mealIndex].visible"
                  :message="notifications[mealIndex].message" :type="notifications[mealIndex].type"
                  :icon="notifications[mealIndex].icon" :color="notifications[mealIndex].color"
                  :size="notifications[mealIndex].size" />
                <button @click.stop="handleAddingCalories(mealIndex, meal.recipe.nutritionSummary)"
                  class="just-ate-this-btn">
                  <i class="bi bi-activity"></i> {{ $t('recipe_card.add_to_nutrition_tracker') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <nothing-here-component v-else></nothing-here-component>
</template>  

<script>
import axios from 'axios';
import NotificationComponent from "../Notification/NotificationComponent.vue";
import NothingHereComponent from "../PlaceHolderComponents/NothingHereComponent.vue";

export default {
  components: {
    NotificationComponent,
    NothingHereComponent
  },
  data() {
    return {
      notifications: [],
      mealPlans: []
    };
  },
  mounted() {
    this.fetchUserMeals();
  },
  methods: {
    initNotifications(meals) {
      this.notifications = meals.map(() => ({
        visible: false,
        message: '',
        type: 'success',
        icon: '✓',
        color: '#3eb27c',
        size: 'small'
      }));
    },
    triggerNotification(index, message) {
      this.notifications[index].message = message;
      this.notifications[index].visible = true;
      setTimeout(() => {
        this.notifications[index].visible = false;
      }, 3000);
    },
    handleAddingCalories(index, nutritionData) {
      this.triggerNotification(index, this.$t('recipe_card.add_to_nutrition_message'));
      this.addNutrientsToTracker(nutritionData);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-GB');
    },
    async fetchUserMeals() {
      const username = localStorage.getItem("nutrioUser");
      const token = localStorage.getItem("token");

      if (!username || !token) {
        console.error("Username or token not found in storage.");
        return;
      }

      const urlUser = `/mealPlansGenByUsername/${username}`;
      try {
        const response = await axios.get(urlUser);
        this.mealPlans = response.data;
        this.initNotifications(response.data.flatMap(plan => plan.meals));
      } catch (error) {
        console.error("Error fetching user meal plans:", error);
      }
    },
    async addNutrientsToTracker(nutritionData) {
      const username = localStorage.getItem("nutrioUser");
      const token = localStorage.getItem("token");

      if (!username || !token) {
        console.error("Username or token not found in storage.");
        return;
      }

      const dataToSend = {
        calories: nutritionData.totalCalories,
        protein: nutritionData.totalProtein,
        carbs: nutritionData.totalCarbs,
        fats: nutritionData.totalFats,
        fiber: nutritionData.totalFiber,
        sugar: nutritionData.totalSugar
      };

      const urlUser = `/nutritionUpdateTrackersByUsername/${username}`;
      try {
        await axios.put(urlUser, dataToSend);
      } catch (error) {
        console.error("Error updating nutrition tracker:", error);
      }
    },
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
        this.mealPlans = this.mealPlans.filter(plan => plan.id !== mealPlanId);
        this.triggerNotification(this.mealPlans.findIndex(plan => plan.id === mealPlanId), this.$t('meal_plan_card.meal_deleted_successfully'));
      } catch (error) {
        console.error("Error deleting the meal plan:", error);
      }
    }

  }
};
</script>


<style scoped>
.card-meal-plan {
  max-width: 1200px;
  margin: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.meal-plan-details {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.meal-plan-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.meals-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.meal-section {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  margin: 10px;
  min-width: 300px;
  transition: all 0.3s ease;
}

.recipe-card {
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.recipe-details h6,
.recipe-details p,
.recipe-details ul,
.recipe-details ol {
  margin-top: 0;
  margin-bottom: 10px;
}

.recipe-details ul,
.recipe-details ol {
  padding-left: 20px;
}

.just-ate-this-btn {
  background-color: #3eb27c;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
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

@media (max-width: 768px) {
  .meals-container {
    flex-direction: column;
  }

  .meal-section {
    min-width: 100%;
  }
}
</style>
