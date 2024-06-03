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
      </div>
    </div>
  </card>
</template>
<script>
import axios from "axios";

export default {
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
  height: 200px; /* Set image size */
  border-radius: 50%; /* Make image circular */
  margin-bottom: 10px; /* Space below the image */
}

h4 {
  text-align: center; /* Center text */
  margin: 0; /* Remove default margin */
}

a {
  text-decoration: none; /* Optional: removes underline from link */
  color: #000; /* Black text for link */
}

a small {
  display: block; /* Makes the email appear on its own line */
}
</style>
