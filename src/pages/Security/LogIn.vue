<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Nutrio</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="form.username" placeholder="Username"
            :class="{ 'is-invalid': v$.form.username.$error }">
          <span class="error-message" v-if="v$.form.username.$error">
            <span v-if="v$.form.username.required.$invalid">Username is required.</span>
            <span v-if="v$.form.username.minLength.$invalid">Username cannot be this short.</span>
            <span v-if="v$.form.username.maxLength.$invalid">Username can not be that long.</span>
          </span>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" placeholder="Password"
            :class="{ 'is-invalid': v$.form.password.$error }">
          <span class="error-message" v-if="v$.form.password.$error">
            <span v-if="v$.form.password.required.$invalid">Password is required.</span>
            <span v-else-if="v$.form.password.minLength.$invalid">Password can not be this short.</span>
            <span v-else-if="v$.form.password.maxLength.$invalid">Password can not be that long</span>
          </span>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <div class="register-link">
        <p>Don't have an account?</p>
        <router-link to="/register">Register here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { required, minLength, maxLength, } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      error: null,
    };
  },
  validations() {
    return {
      form: {
        username: { required, minLength: minLength(3), maxLength: maxLength(30) },
        password: { required, minLength: minLength(8), maxLength: maxLength(128) }
      }
    }
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  methods: {
    async login() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await axios.post('/authentication/login', {
            username: this.form.username,
            password: this.form.password,
          });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('nutrioUser', this.form.username);
          await this.createNutritionTracker();
          await this.setUserLanguage();
          await this.checkAndRouteUser();
        } catch (error) {
          console.error('Login failed:', error);
          this.error = "Failed to login. Please check your credentials and try again.";
        }
      }
    },
    async checkAndRouteUser() {
      try {
        const trackerExistsResponse = await axios.get(`healthTrackersCheck/${this.form.username}`);
        if (trackerExistsResponse.data.exists) {
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/health-conditions-setup');
        }
      } catch (error) {
        console.error('Health tracker check failed:', error);
        this.$router.push('/dashboard');
      }
    },
    async createNutritionTracker() {
      try {
        await axios.post(`/nutritionTrackersByUsername/${this.form.username}`);
      } catch (error) {
        console.error('Nutrition creation failed:', error);
      }
    },
    async setUserLanguage() {
      try {
        const response = await axios.get(`/userProfilesByUsername/${this.form.username}`);
        const language = response.data.language.toLowerCase();
        console.log(language);
        localStorage.setItem('language', language);
        this.$i18n.locale = language;
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f3ef;
}

.login-box {
  border: 2px solid #ccc;
  background-color: white;
  padding: 40px;
  text-align: center;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.input-group {
  margin: 20px 0;
}

input {
  padding: 10px;
  border: 2px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
}

button.login-button {
  padding: 10px 20px;
  border: none;
  background-color: #3db17c;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s;
}

button.login-button:hover {
  background-color: #369f68;
}

.register-link {
  margin-top: 20px;
}

.register-link a {
  color: #3db17c;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  font-size: 0.75rem;
  margin-top: 4px;
}
</style>
