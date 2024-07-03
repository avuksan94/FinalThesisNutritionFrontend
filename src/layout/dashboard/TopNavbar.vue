<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click.stop="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">
              <p> <i class="bi bi-door-open"></i> {{ $t('logout') }} </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    routeName() {
      const routeTitleKey = this.$route.meta.title;
      return routeTitleKey ? this.$t(routeTitleKey) : this.$route.name;
    },
  },
  mounted() {
    this.fetchLoggedInUser();
  },
  data() {
    return {
      loggedInUser: null
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      console.log("Toggling sidebar");
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
      console.log("Hiding sidebar");
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('nutrioUser');
      this.$store.commit('resetState');
      this.$router.push('/login');
    },
    fetchLoggedInUser() {
      this.loggedInUser = localStorage.getItem('nutrioUser') || 'Guest';
    }
  },
};
</script>

<style scoped>
</style>
