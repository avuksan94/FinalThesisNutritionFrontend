<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
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
            chartData: null,
            chartOptions: null
        };
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
                const response = await axios.get(`/nutritionTrackersWeeklyByUsername/${username}`);
                this.chartData = this.setChartData(response.data);
                this.chartOptions = this.setChartOptions();
            } catch (error) {
                console.error('Error fetching nutrition data:', error);
            }
        },
        setChartData(data) {
            const days = data.map(day => new Date(day.forDay).toLocaleDateString('en-GB'));
            const nutrients = [
                { key: 'Calories', label: this.$t('nutrition_charts.calories') },
                { key: 'Protein', label: this.$t('nutrition_charts.protein') },
                { key: 'Carbs', label: this.$t('nutrition_charts.carbs') },
                { key: 'Fats', label: this.$t('nutrition_charts.fats') },
                { key: 'Fiber', label: this.$t('nutrition_charts.fiber') },
                { key: 'Sugar', label: this.$t('nutrition_charts.sugar') }
            ];
            const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#F7464A'];

            return {
                labels: days,
                datasets: nutrients.map((nutrient, index) => ({
                    label: nutrient.label,
                    backgroundColor: colors[index],
                    data: data.map(day => day[`total${nutrient.key}`])
                }))
            };
        },
        setChartOptions() {
            return {
                indexAxis: 'y',
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
                        ticks: {
                            color: '#555'
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: '#555'
                        },
                        grid: {
                            color: '#ddd',
                            drawBorder: false
                        }
                    }
                }
            };
        }
    }
};
</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    width: 100%;
}

.h-30rem {
    height: 30rem;
}
</style>
