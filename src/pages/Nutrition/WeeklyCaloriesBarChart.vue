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
        this.fetchCaloriesData();
        this.chartOptions = this.setChartOptions();
    },
    methods: {
        async fetchCaloriesData() {
            const username = localStorage.getItem('nutrioUser');
            const token = localStorage.getItem('token');
            if (!username || !token) {
                console.error('Username or token not found in storage.');
                return;
            }
            try {
                const response = await axios.get(`/nutritionTrackersWeeklyByUsername/${username}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const weeklyData = response.data;
                this.chartData = this.setChartData(weeklyData);
            } catch (error) {
                console.error('Error fetching weekly calories data:', error);
            }
        },
        setChartData(weeklyData) {
            const days = weeklyData.map(item => new Date(item.forDay).toLocaleDateString());
            const calories = weeklyData.map(item => item.totalCalories);

            return {
                labels: days,
                datasets: [
                    {
                        label: this.$t('nutrition_charts.calories'),
                        backgroundColor: '#FF6384',
                        data: calories
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
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
}
.h-30rem {
    height: 30rem;
}
</style>
