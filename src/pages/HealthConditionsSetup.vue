<template>
    <div class="page-container">
      <initial-health-tracker-component></initial-health-tracker-component>
    </div>
  </template>
  
  <script>
  import InitialHealthTrackerComponent from '../pages/Heath/InitialHealthTrackerComponent.vue';
  
  export default {
    components: {
      InitialHealthTrackerComponent
    }
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Ensure it takes at least the height of the viewport */
    background-color: #f4f3ef; /* Consistent background color */
  }
  
  @media (max-width: 768px) { /* Adjusting for tablets and mobile phones */
    .page-container {
      padding: 20px; /* Adds padding to prevent elements from touching the edges */
    }
  }
  </style>
  