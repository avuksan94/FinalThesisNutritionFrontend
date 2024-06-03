<template>
  <div class="register-container">
    <div class="form-and-disclaimer">
      <div class="register-box">
        <h1>Register</h1>
        <form @submit.prevent="register">
          <div class="input-row">
            <div class="input-group">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" v-model="form.firstName" placeholder="First Name">
              <span class="error-message" v-if="v$.form.firstName.$error">
                First name is required.
              </span>
            </div>
            <div class="input-group">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" v-model="form.lastName" placeholder="Last Name">
              <span class="error-message" v-if="v$.form.lastName.$error">
                Last name is required.
              </span>
            </div>
          </div>
          <div class="input-row">
            <div class="input-group">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="form.username" placeholder="Username">
              <span class="error-message" v-if="v$.form.username.$error">
                Username is required.
              </span>
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" placeholder="Email">
              <span class="error-message" v-if="v$.form.email.$error">
                A valid email is required.
              </span>
            </div>
          </div>
          <div class="input-row">
            <div class="input-group">
              <label for="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" v-model="form.phoneNumber" placeholder="Phone Number">
              <span class="error-message" v-if="v$.form.phoneNumber.$error">
                Phone number is required.
              </span>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="form.password" placeholder="Password">
              <span class="error-message" v-if="v$.form.password.$error">
                Password is required.
              </span>
            </div>
            <div class="input-group">
              <label for="language">Language</label>
              <select id="language" v-model="form.language">
                <option disabled value="">Please select one</option>
                <option value="EN">English</option>
                <option value="HR">Croatian</option>
              </select>
            </div>
          </div>
          <button type="submit" class="register-button" :disabled="!acceptedDisclaimer">
            Register
          </button>
        </form>
        <div class="register-link">
          <p>Already have an account?</p>
          <router-link to="/login">Login here</router-link>
        </div>
      </div>
      <disclaimer-component v-if="showDisclaimer" @disclaimerAccepted="handleDisclaimerAccepted" />
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import DisclaimerComponent from './Disclaimer.vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export default {
  components: {
    DisclaimerComponent
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        language: ''
      },
      acceptedDisclaimer: false,
      showDisclaimer: true,
    };
  },
  validations() {
    return {
      form: {
        firstName: { required },
        lastName: { required },
        username: { required },
        email: { required, email },
        phoneNumber: { required },
        password: { required },
        language: { required } 
      }
    }
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  methods: {
    async register() {
      this.v$.$validate();
      if (!this.v$.$error && this.acceptedDisclaimer) {
        try {
          const response = await axios.post('/authentication/register', {
            ...this.form,
            enabled: true
          });
          console.log("Registration successful:", response.data);
          this.$router.push('/login');
        } catch (error) {
          console.error('Registration failed:', error);
          this.error = "Failed to register. Please check your details and try again.";
        }
      } else {
      }
    },
    handleDisclaimerAccepted() {
      this.acceptedDisclaimer = true;
      this.showDisclaimer = false;
    }
  },
}
</script>
  
<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f3ef;
}

.form-and-disclaimer {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 80%;
  max-width: 1200px;
}

.register-box {
  flex: 1;
  border: 2px solid #ccc;
  background-color: white;
  padding: 20px;
  text-align: center;
  margin-right: 20px;
}

.disclaimer {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #ccc;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-row {
  display: flex;
  justify-content: space-between;
}

.input-group {
  flex: 1;
  margin: 10px;
}

input,
button.register-button {
  padding: 10px;
  border: 2px solid #ccc;
  width: 100%;
  border-radius: 4px;
}

button.register-button {
  background-color: #3db17c;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-top: 20px;
}

button.register-button:hover {
  background-color: #369f68;
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

select {
  padding: 10px;
  border: 2px solid #ccc;
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

select:focus {
  border-color: #3db17c;
}
</style>
  