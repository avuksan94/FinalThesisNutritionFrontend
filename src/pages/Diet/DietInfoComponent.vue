<template>
    <div class="diet-info">
        <h4 class="title">
            <i class="bi bi-clipboard2-heart"></i> 
            {{ $t(`diets.${currentDiet.key}.name`) }} {{ $t('common.diet') }}
        </h4>
        <p>{{ $t(`diets.${currentDiet.key}.description`) }}</p>
        <a :href="$t(`diets.${currentDiet.key}.url`)" target="_blank">{{ $t('common.show_more') }}</a>
    </div>
</template>

  
<script>
export default {
    data() {
        return {
        currentDietIndex: 0,
        diets: [
            { key: 'vegan'},
            { key: 'vegetarian' },
            { key: 'ketogenic' },
            { key: 'paleo' },
            { key: 'gluten_free' },
            { key: 'mediterranean' },
            { key: 'low_carb' },
            { key: 'dairy_free' }
        ]
    };
    },
    mounted() {
        //console.log("All diets data:", this.diets);
        this.startRotation();
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        startRotation() {
            this.interval = setInterval(() => {
                this.currentDietIndex = (this.currentDietIndex + 1) % this.diets.length;
            }, 20000); // switch every 20 seconds
        }
    },
    computed: {
        currentDiet() {
            return this.diets[this.currentDietIndex];
        }
    }
};
</script>
  
<style scoped>
.diet-info {
    max-width: 600px; 
    margin: 20px auto; 
    padding: 20px; 
    border-radius: 10px; 
    background-color: white; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

h4{
    color: black;
}

a {
    color: #2a7bf6; 
    text-decoration: none;
}

a:hover {
    text-decoration: underline; 
}

@media (max-width: 768px) {
    .diet-info {
        padding: 10px;
        max-width: 100%;
    }

    h2, p {
        font-size: 14px;
    }
}

</style>
