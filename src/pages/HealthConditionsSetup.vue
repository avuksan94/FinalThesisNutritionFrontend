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
    min-height: 100vh; 
    background-color: #f4f3ef; 
  }
  
  @media (max-width: 768px) { 
    .page-container {
      padding: 20px; 
    }
  }
  </style>
  