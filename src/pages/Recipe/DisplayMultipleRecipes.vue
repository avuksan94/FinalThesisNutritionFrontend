<template>
    <div>
        <div v-if="recipes.length > 0" class="recipe-list">
            <div v-for="(recipe, index) in recipes" :key="index" class="card-recipe" :class="{ expanded: recipe.visible }"
                @click="toggleVisibility(recipe)">
                <div>
                    <div class="author">
                        <h4 class="title">
                            {{ recipe.title }}
                            <br />
                            <small>{{ recipe.description }}</small>
                        </h4>
                    </div>
                    <div v-if="recipe.visible" class="recipe-details">
                        <br>
                        <div class="recipe-left">
                            <h5>{{ $t('recipe_card.ingredients') }}</h5>
                            <ul>
                                <li v-for="ingredient in recipe.ingredients" :key="ingredient.ingredientId">
                                    {{ ingredient.quantity }} {{ ingredient.unit }} - {{ ingredient.name }}
                                </li>
                            </ul>

                            <h5>{{ $t('recipe_card.preparation_steps') }}</h5>
                            <ol>
                                <li v-for="(step, index) in recipe.preparationSteps" :key="index">
                                    {{ step }}
                                </li>
                            </ol>
                            <notification-component v-model:visible="showNotification" :message="notificationMessage"
                                :type="notificationType" :icon="notificationIcon" :color="notificationColor"
                                :size="notificationSize"></notification-component>
                            <button @click.stop="handleAddingCalories(recipe)" class="just-ate-this-btn">
                                <i class="bi bi-activity"></i> {{ $t('recipe_card.add_to_nutrition_tracker') }}
                            </button>
                            <br>
                            <button @click.stop="handleRemovingRecipe(recipe.id)" class="delete-recipe-btn">
                                {{ $t('recipe_card.delete_recipe') }}
                            </button>
                        </div>
                        <div class="recipe-right">
                            <h5>{{ $t('recipe_card.nutrition_summary') }}</h5>
                            <ul>
                                <li>{{ $t('recipe_card.total_calories') }} {{ recipe.nutritionSummary.totalCalories }}g</li>
                                <li>{{ $t('recipe_card.total_protein') }} {{ recipe.nutritionSummary.totalProtein }}g</li>
                                <li>{{ $t('recipe_card.total_carbs') }} {{ recipe.nutritionSummary.totalCarbs }}g</li>
                                <li>{{ $t('recipe_card.total_fats') }} {{ recipe.nutritionSummary.totalFats }}g</li>
                                <li>{{ $t('recipe_card.total_fiber') }} {{ recipe.nutritionSummary.totalFiber }}g</li>
                                <li>{{ $t('recipe_card.total_sugar') }} {{ recipe.nutritionSummary.totalSugar }}g</li>
                            </ul>
                            <h5>{{ $t('recipe_card.cooking_time') }}</h5>
                            <p>{{ recipe.cookingTime }} {{ $t('recipe_card.time_value') }}</p>
                            <h5>{{ $t('recipe_card.servings') }}</h5>
                            <p>{{ recipe.servings }}</p>
                            <div v-if="recipe.notes" class="notes">
                                <h5>{{ $t('recipe_card.notes') }}</h5>
                                <p>{{ recipe.notes }}</p>
                            </div>
                            <div v-if="recipe.healthWarning" class="health-warning">
                                <h5>{{ $t('recipe_card.health_warning') }}</h5>
                                <p v-if="recipe.healthWarning">{{ recipe.healthWarning }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nothing-here-component v-else></nothing-here-component>
    </div>
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
            showNotification: false,
            notificationMessage: '',
            notificationType: 'success',
            notificationIcon: '',
            notificationColor: '',
            notificationSize: 'normal',
            recipes: []
        };
    },
    mounted() {
        this.fetchUserRecipes();
    },
    methods: {
        triggerNotification(message, type, icon, color, size) {
            this.notificationMessage = message;
            this.notificationType = type;
            this.notificationIcon = icon;
            this.notificationColor = color;
            this.notificationSize = size;
            this.showNotification = true;
        },
        handleAddingCalories(recipe) {
            this.triggerNotification('Added the meal for nutrition tracking', 'success', '✓', '#3eb27c', 'small');
            this.addNutrientsToTracker(recipe.nutritionSummary, recipe.servings);
        },
        handleRemovingRecipe(recipeId) {
            this.deleteUserRecipe(recipeId);
            this.fetchUserRecipes();
        },
        async fetchUserRecipes() {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");

            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }

            const urlUser = `/recipesByUsername/${username}`;
            try {
                const response = await axios.get(urlUser);
                this.recipes = response.data.map(recipe => ({
                    ...recipe,
                    visible: false
                }));
            } catch (error) {
                console.error("Error fetching user recipes:", error);
            }
        },
        toggleVisibility(recipe) {
            this.recipes.forEach(r => {
                if (r !== recipe) {
                    r.visible = false;
                }
            });
            recipe.visible = !recipe.visible;
        },
        async addNutrientsToTracker(nutritionData, servings) {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");

            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }

            const dataToSend = {
                calories: nutritionData.totalCalories / servings,
                protein: nutritionData.totalProtein / servings,
                carbs: nutritionData.totalCarbs / servings,
                fats: nutritionData.totalFats / servings,
                fiber: nutritionData.totalFiber / servings,
                sugar: nutritionData.totalSugar / servings
            };

            const urlUser = `/nutritionUpdateTrackersByUsername/${username}`;
            try {
                await axios.put(urlUser, dataToSend);
            } catch (error) {
                console.error("Error updating nutrition tracker:", error);
            }
        },
        async deleteUserRecipe(recipeId) {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");

            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }

            const recipeURL = `/recipesByUserSoft/${recipeId}`;
            try {
                await axios.delete(recipeURL);
                const index = this.recipes.findIndex(recipe => recipe.id === recipeId);
                if (index !== -1) {
                    this.recipes.splice(index, 1);
                }
            } catch (error) {
                console.error("Error deleting the recipe:", error);
            }
        }
    }
};
</script>

<style scoped>
.recipe-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card-recipe {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: white;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;
}

.card-recipe:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.03);
}

.card-recipe.expanded {
    grid-column: span 3;
    display: flex;
    flex-direction: column;
}

.recipe-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
    width: 100%;
}

.card-recipe.expanded .recipe-details {
    max-height: 1000px;
}

.recipe-left,
.recipe-right {
    flex: 1 1 50%;
    min-width: 300px;
    padding: 10px;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .card-recipe.expanded {
        grid-column: span 1;
    }

    .recipe-details {
        flex-direction: column;
    }

    .recipe-left,
    .recipe-right {
        flex: 1 1 100%;
        min-width: 100%;
    }

    .card-recipe {
        padding: 10px;
    }
}

.author,
.title,
.recipe-details {
    transition: all 0.3s ease;
}

.recipe-details h5,
.recipe-details p {
    margin-top: 0;
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
    padding: 10px;
    border-radius: 5px;
}

.health-warning {
    background-color: #d9534f;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
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

.delete-recipe-btn {
    background-color: #d9534f;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}
</style>
