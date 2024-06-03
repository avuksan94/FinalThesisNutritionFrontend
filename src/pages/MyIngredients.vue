<template>
    <div class="content-row">
      <!-- Ingredient addition form on the left -->
      <div class="ingredient-add">
        <ingredient-add-component></ingredient-add-component>
      </div>
    </div>
    <div>
        <!-- Ingredients list on the right -->
      <div class="ingredients-list">
        <ingredients-component></ingredients-component>
      </div>
    </div>
  </template>
  
  <script>
  import IngredientsComponent from './Recipe/IngredientsComponent.vue';
  import IngredientAddComponent from './Recipe/IngredientAddComponent.vue';
  
  export default {
    components: {
      IngredientsComponent,
      IngredientAddComponent
    },
    data() {
      return {
      
      };
    }
  };
  </script>
  
  <style scoped>
  .content-row {
    display: flex;
    justify-content: space-between; /* Adjusts spacing between the two components */
    align-items: start; /* Aligns components to the top */
  }
  
  .ingredient-add, .ingredients-list {
    flex: 1; /* Each takes up equal space */
    margin: 10px; /* Adds some space around each component */
  }
  
  @media (max-width: 991px) {
    .content-row {
      flex-direction: column; /* Stacks the components vertically on smaller screens */
    }
    .ingredient-add, .ingredients-list {
      width: 100%; /* Full width for mobile */
    }
  }
  </style>
  