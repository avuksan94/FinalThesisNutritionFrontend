<template>
  <div class="container-fluid">
    <div>
      <generate-recipe-component @recipe-generated="handleRecipeGenerated"></generate-recipe-component>
    </div>
    <recipe-card v-if="$store.state.recipeData"></recipe-card>
  </div>
</template>

<script>
import GenerateRecipeComponent from './Recipe/GenerateRecipeComponent.vue'
import RecipeCard from './Recipe/RecipeCard.vue'
export default {
  components: {
    GenerateRecipeComponent,
    RecipeCard
  },
  methods: {
    handleRecipeGenerated(recipeData) {
      this.$store.commit('updateRecipeData', recipeData);
    }
  }
};
</script>

<style scoped>
@media (max-width: 991px) {
  .user-card,
  .user-health-card,
  .edit-profile-form {
    width: 100%;
  }
}
</style>
