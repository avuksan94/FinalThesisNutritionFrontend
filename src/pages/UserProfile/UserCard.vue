<template>
  <card>
    <div>
      <div>
        <img src="@/assets/img/foodPics/NutrioLogo.webp" alt="..." />
        <h4>
          {{ firstName }} {{ lastName }}
          <br />
          <a href="#">
            <small>{{ email }}</small>
          </a>
        </h4>
        <div class="row justify-content-center">
          <forget-me></forget-me>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
import axios from "axios";
import ForgetMe from "../Security/ForgetMe.vue"

export default {
  components : {
    ForgetMe
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
    };
  },
  computed: {
    userInfoUpdated() {
      return this.$store.state.userInfoUpdated;
    }
  },
  watch: {
    userInfoUpdated(newVal) {
      if (newVal) {
        this.fetchUserData();
        this.$store.commit('setHealthInfoUpdated', false); 
      }
    }
  },
  methods: {
    async fetchUserData() {
      this.username = localStorage.getItem("nutrioUser");
      const token = localStorage.getItem("token");

      if (!this.username || !token) {
        console.error("Username or token not found in storage - ERROR");
        return;
      }

      const url = `usersBasic/${this.username}`;
      try {
        const response = await axios.get(url);
        this.firstName = response.data.firstName;
        this.lastName = response.data.lastName;
        this.email = response.data.email;
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
        }
      }
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
.card {
  display: flex; 
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  border: 1px solid #ddd; 
  padding: 20px; 
  border-radius: 8px;
  background-color: white;
  width: 100%; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

img {
  width: 200px; 
  height: 200px;
  border-radius: 50%; 
  margin-bottom: 10px; 
}

h4 {
  text-align: center; 
  margin: 0;
}

a {
  text-decoration: none; 
  color: #000; 
}

a small {
  display: block; 
}
</style>
