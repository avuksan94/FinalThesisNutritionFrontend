<template>
    <div class="content-row">
      <div class="ingredient-add">
        <ingredient-add-component></ingredient-add-component>
      </div>
    </div>
    <div>
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
    justify-content: space-between; 
    align-items: start; 
  }
  
  .ingredient-add, .ingredients-list {
    flex: 1; 
    margin: 10px; 
  }
  
  @media (max-width: 991px) {
    .content-row {
      flex-direction: column; 
    }
    .ingredient-add, .ingredients-list {
      width: 100%; 
    }
  }
  </style>
  