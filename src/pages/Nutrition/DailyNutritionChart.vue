<template>
    <div class="row">
        <div class="col-md-4">
            <div class="card-user">
                <Chart type="pie" :data="nutritionData" :options="chartOptions" class="chart-style" />
            </div>
        </div>
    </div>
</template>
  
<script>
import Chart from 'primevue/chart';
import axios from 'axios';

export default {
    components: {
        Chart
    },
    data() {
        return {
            nutritionData: null,
            chartOptions: this.setChartOptions(),
            displayDate: ""
        }
    },
    mounted() {
        this.fetchNutritionData();
    },
    methods: {
        async fetchNutritionData() {
            const username = localStorage.getItem("nutrioUser");
            const token = localStorage.getItem("token");
            if (!username || !token) {
                console.error("Username or token not found in storage.");
                return;
            }
            try {
                const response = await axios.get(`/nutritionTrackersByUsername/${username}`);
                const data = response.data;
                this.nutritionData = this.setChartData(data);
                this.displayDate = new Date(data.forDay).toLocaleDateString();
            } catch (error) {
                console.error('Error fetching nutrition data:', error);
            }
        },
        setChartData(data) {
            return {
                labels: [
                    this.$t('nutrition_charts.calories'),
                    this.$t('nutrition_charts.protein'),
                    this.$t('nutrition_charts.carbs'),
                    this.$t('nutrition_charts.fats'),
                    this.$t('nutrition_charts.fiber'),
                    this.$t('nutrition_charts.sugar')
                ],
                datasets: [{
                    data: [
                        data.totalCalories,
                        data.totalProtein,
                        data.totalCarbs,
                        data.totalFats,
                        data.totalFiber,
                        data.totalSugar
                    ],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#E7E9ED',
                        '#4BC0C0',
                        '#F7464A'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#E7E9ED',
                        '#4BC0C0',
                        '#F7464A'
                    ]
                }]
            };
        },
        setChartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#555'
                        }
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            };
        }
    }
};
</script>
  
<style scoped>
.card-user {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white; 
    width: 600px; 
    height: 300px; 
}

.chart-style {
    height: 100%; 
    width: 100%; 
}
</style>

  