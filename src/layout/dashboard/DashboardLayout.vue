<template>
  <div class="wrapper">
    <side-bar>
      <template v-slot:links>
        <sidebar-link to="/dashboard" :name="$t('routes.dashboard')" icon="bi bi-kanban" />
        <sidebar-link to="/stats" :name="$t('routes.user_profile')" icon="bi bi-person-circle" />
        <sidebar-link to="/generate-recipe" :name="$t('routes.generate_recipes')" icon="bi bi-plus-circle-dotted" />
        <sidebar-link to="/my-recipes" :name="$t('routes.my_recipes')" icon="bi bi-egg-fried" />
        <sidebar-link to="/generate-meal-plan" :name="$t('routes.generate_meal_plan')" icon="bi bi-plus-circle-fill" />
        <sidebar-link to="/my-meal-plans" :name="$t('routes.my_meal_plans')" icon="bi bi-heart-pulse-fill" />
        <sidebar-link to="/cookbook" :name="$t('routes.cookbook')" icon="bi bi-book" />
        <sidebar-link to="/nutrition" :name="$t('routes.user_nutrition')" icon="bi bi-pie-chart" />
        <sidebar-link to="/my-ingredients" :name="$t('routes.user_ingredients')" icon="bi bi-box2" />
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click.native="toggleSidebar"></dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "../dashboard/Content.vue";
import MobileMenu from "./MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  },
};
</script>
