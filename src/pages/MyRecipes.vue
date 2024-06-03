<template>
    <display-multiple-recipes></display-multiple-recipes>
</template>
  
<script>
import DisplayMultipleRecipes from './Recipe/DisplayMultipleRecipes.vue';
export default {
  components: {
    DisplayMultipleRecipes
  },
  data() {
    return {
     
    };
  }
};
</script>
<style scoped>
@media (max-width: 991px) {
  .display-multiple-recipes {
    width: 100%;
  }
}</style>
  