<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <user-guide-component></user-guide-component>
        <user-health-card></user-health-card>
        <diet-info-component></diet-info-component>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <health-warning></health-warning>
      </div>
    </div>
  </div>
</template>

<script>
import UserHealthCard from "./UserProfile/UserHealthCard.vue";
import HealthWarning from "./Health/HealthWarning.vue";
import DietInfoComponent from "./Diet/DietInfoComponent.vue";
import UserGuideComponent from "./Health/UserGuideComponent.vue"

export default {
  components: {
    UserHealthCard,
    HealthWarning,
    DietInfoComponent,
    UserGuideComponent
  },
  
}
</script>
<style scoped>
.user-health-card, 
.health-warning {
  margin: 10px; 
}</style>
