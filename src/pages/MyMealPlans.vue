<template>
    <div class="container-fluid">
      <div>
        <display-multiple-meal-plans></display-multiple-meal-plans>
      </div>
    </div>
  </template>
  
  <script>
  import DisplayMultipleMealPlans from './Recipe/DisplayMultipleMealPlans.vue'
  export default {
    components: {
      DisplayMultipleMealPlans
    },
  };
  </script>
  <style scoped>
  @media (max-width: 991px) {
    .user-card, .user-health-card, .edit-profile-form {
      width: 100%; 
    }
  }</style>
  