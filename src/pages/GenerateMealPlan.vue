<template>
    <div class="container-fluid">
      <div>
       <generate-meal-plan-component></generate-meal-plan-component>
      </div>
      <meal-plan-card v-if="$store.state.mealPlanData"></meal-plan-card>
    </div>
  </template>
  
  <script>
import GenerateMealPlanComponent from './Recipe/GenerateMealPlanComponent.vue';
import MealPlanCard from './Recipe/MealPlanCard.vue'
  export default {
    components: {
        GenerateMealPlanComponent,
        MealPlanCard
    },
  };
  </script>
  
  <style scoped>
  @media (max-width: 991px) {
    .user-card, .user-health-card, .edit-profile-form {
      width: 100%;
    }
  }</style>
  