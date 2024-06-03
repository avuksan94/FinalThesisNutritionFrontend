<template>
  <div class="row">
    <div class="col-md-6">
      <user-card></user-card>
    </div>
    <div class="col-md-6">
      <user-health-card></user-health-card>
    </div>
    <div class="col-12">
      <edit-profile-form></edit-profile-form>
    </div>
    <div class="col-12">
      <user-health-form></user-health-form>
    </div>
  </div>
</template>

<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import UserCard from "./UserProfile/UserCard.vue";
import UserHealthCard from "./UserProfile/UserHealthCard.vue";
import UserHealthForm from "./UserProfile/UserHealthForm.vue";
export default {
  components: {
    EditProfileForm,
    UserCard,
    UserHealthCard,
    UserHealthForm
  },
};
</script>
<style scoped>
@media (max-width: 991px) {
  .user-card, .user-health-card, .edit-profile-form {
    width: 100%; /* Makes each component take full width on smaller screens */
  }
}</style>
