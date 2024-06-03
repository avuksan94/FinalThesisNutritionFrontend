<template>
  <div class="container-fluid">
    <div class="row chart-row">
      <div class="col-6">
        <h3>{{ $t('nutrition_charts.daily_chart') }}</h3>
        <daily-nutrition-chart></daily-nutrition-chart>
      </div>
      <div class="col-6">
        <h3>{{ $t('nutrition_charts.weekly_sum') }}</h3>
        <weekly-nutrition-sum-up-horizontal-bar-chart></weekly-nutrition-sum-up-horizontal-bar-chart>
      </div>
    </div>
    <div class="row chart-row">
      <div class="col-6">
        <h3>{{ $t('nutrition_charts.weekly_calories') }}</h3>
        <weekly-calories-bar-chart></weekly-calories-bar-chart>
      </div>
      <div class="col-6">
        <h3>{{ $t('nutrition_charts.weekly_protein') }}</h3>
        <weekly-protein-bar-chart></weekly-protein-bar-chart>
      </div>
    </div>
    <div class="row chart-row">
      <div class="col-6">
        <h3>{{ $t('nutrition_charts.weekly_carbs') }}</h3>
        <weekly-carb-bar-chart></weekly-carb-bar-chart>
      </div>
      <div class="col-6">
        <h3>{{ $t('nutrition_charts.weekly_fats') }}</h3>
        <weekly-fats-bar-chart></weekly-fats-bar-chart>
      </div>
    </div>
    <div class="row chart-row">
      <div class="col-6">
        <h3>{{ $t('nutrition_charts.weekly_fiber') }}</h3>
        <weekly-fiber-bar-chart></weekly-fiber-bar-chart>
      </div>
      <div class="col-6">
        <h3>{{ $t('nutrition_charts.weekly_sugar') }}</h3>
        <weekly-sugar-bar-chart></weekly-sugar-bar-chart>
      </div>
    </div>
  </div>
</template>

  <script>
  
  import DailyNutritionChart from "./Nutrition/DailyNutritionChart.vue"
  import WeeklyCaloriesBarChart from "./Nutrition/WeeklyCaloriesBarChart.vue";
  import WeeklyProteinBarChart from "./Nutrition/WeeklyProteinBarChart.vue";
  import WeeklyCarbBarChart from "./Nutrition/WeeklyCarbBarChart.vue";
  import WeeklyFatsBarChart from "./Nutrition/WeeklyFatsBarChart.vue";
  import WeeklyFiberBarChart from "./Nutrition/WeeklyFiberBarChart.vue";
  import WeeklySugarBarChart from "./Nutrition/WeeklySugarBarChart.vue";
  import WeeklyNutritionSumUpHorizontalBarChart from "./Nutrition/WeeklyNutritionSumUpHorizontalBarChart.vue"
  
  export default {
    components: {
        DailyNutritionChart,
        WeeklyNutritionSumUpHorizontalBarChart,
        WeeklyCaloriesBarChart,
        WeeklyProteinBarChart,
        WeeklyCarbBarChart,
        WeeklyFatsBarChart,
        WeeklyFiberBarChart,
        WeeklySugarBarChart
    },
    
  }
  </script>
  
<style scoped>
.chart-row h3 {
    margin-bottom: 10px; 
    text-align: center; 
}

.chart-row {
  margin-bottom: 20px; 
}

.chart-row .col-6 .card {
  margin-right: 10px; /* Add right margin to the left chart container */
  margin-left: 10px;  /* Add left margin to the right chart container */
}


.card {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
}
.h-30rem {
    height: 30rem;
}

@media (max-width: 768px) {
  .chart-row .col-6 .card {
    margin-right: 5px;
    margin-left: 5px;
  }
}

</style>
