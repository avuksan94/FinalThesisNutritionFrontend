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
import NothingHereComponent from "../PlaceHolderComponents/NothingHereComponent.vue"

export default {
    components : {
        NothingHereComponent
    },
    data() {
        return {
            recipes: []
        };
    },
    mounted() {
        this.fetchUserRecipes();
    },
    methods: {
        async fetchUserRecipes() {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");
            const language = localStorage.getItem("language") ? localStorage.getItem("language").toUpperCase() : 'EN';

            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }

            const allRcipesURL = `/recipesByLang/${language}`;
            try {
                const response = await axios.get(allRcipesURL);
                this.recipes = response.data.map(recipe => ({
                    ...recipe,
                    visible: false
                }));
            } catch (error) {
                console.error("Error fetching all recipes:", error);
            }
        },
        toggleVisibility(recipe) {
            this.recipes.forEach(r => {
                if (r !== recipe) {
                    r.visible = false;
                }
            });
            recipe.visible = !recipe.visible;
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
}</style>
