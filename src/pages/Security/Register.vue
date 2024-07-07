<template>
  <div class="register-container">
    <custom-pop-up v-if="popup.isVisible" :title="popup.title" :message="popup.message" :confirm="popup.confirm"
      :isVisible="popup.isVisible" @confirmed="handlePopupConfirm" @cancelled="handlePopupCancel"></custom-pop-up>
    <div class="form-and-disclaimer">
      <div class="register-box">
        <h1>Register</h1>
        <form @submit.prevent="register">
          <div class="input-row">
            <div class="input-group">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" v-model="form.firstName" placeholder="First Name">
              <span class="error-message" v-if="v$.form.firstName.$error">
                <span v-if="v$.form.firstName.required.$invalid">First name is required.</span>
                <span v-else-if="v$.form.firstName.maxLength.$invalid">First name must be less than 50 characters.</span>
              </span>
            </div>
            <div class="input-group">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" v-model="form.lastName" placeholder="Last Name">
              <span class="error-message" v-if="v$.form.lastName.$error">
                <span v-if="v$.form.lastName.required.$invalid">Last name is required.</span>
                <span v-else-if="v$.form.lastName.maxLength.$invalid">Last name must be less than 50 characters.</span>
              </span>
            </div>
          </div>
          <div class="input-row">
            <div class="input-group">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="form.username" placeholder="Username">
              <span class="error-message" v-if="v$.form.username.$error">
                <span v-if="v$.form.username.required.$invalid">Username is required.</span>
                <span v-if="v$.form.username.minLength.$invalid">Username must be at least 3 characters long.</span>
                <span v-if="v$.form.username.maxLength.$invalid">Username must be less than 30 characters long.</span>
              </span>
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="form.email" placeholder="Email">
              <span class="error-message" v-if="v$.form.email.$error">
                <span v-if="v$.form.email.required.$invalid">Email is required.</span>
                <span v-else-if="v$.form.email.email.$invalid">Please enter a valid email address.</span>
              </span>
            </div>
          </div>
          <div class="input-row">
            <div class="input-group">
              <label for="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" v-model="form.phoneNumber" placeholder="Phone Number">
              <span class="error-message" v-if="v$.form.phoneNumber.$error">
                <span v-if="v$.form.phoneNumber.required.$invalid">Phone number is required.</span>
                <span v-else-if="v$.form.phoneNumber.phoneNumberPattern.$invalid">Invalid phone number format.</span>
              </span>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="form.password" placeholder="Password">
              <span class="error-message" v-if="v$.form.password.$error">
                <span v-if="v$.form.password.required.$invalid">Password is required.</span>
                <span v-else-if="v$.form.password.minLength.$invalid">Password must be at least 8 characters long.</span>
                <span v-else-if="v$.form.password.maxLength.$invalid">Password must be less than 128 characters
                  long.</span>
                <span v-else-if="v$.form.password.strongPassword.$invalid">Password must be at least 8 characters long,
                  include uppercase and lowercase letters, a number, and a special character.</span>
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
          <button type="submit" class="register-button">
            Register
          </button>
        </form>
        <div v-if="disclaimerWarning" class="warning-message">
          You must accept the disclaimer to register.
        </div>
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
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import CustomPopUp from '../Notification/CustomPopUp.vue';

const phoneNumberPattern = (value) => {
  if (!value) return true;
  return /^(?:\+385\s)?0?9\d\s?\d{2}\s?\d{2}\s?\d{3}$/.test(value);
};


const strongPassword = (value) => {
  if (!value) return true;
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
};


export default {
  components: {
    DisclaimerComponent,
    CustomPopUp
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
      disclaimerWarning: false,
      popup: {
        isVisible: false,
        title: '',
        message: '',
        confirm: false
      }
    };
  },
  validations() {
    return {
      form: {
        firstName: { required, maxLength: maxLength(50) },
        lastName: { required, maxLength: maxLength(50) },
        username: { required, minLength: minLength(3), maxLength: maxLength(30) },
        email: { required, email },
        phoneNumber: { required, phoneNumberPattern },
        password: { required, strongPassword, minLength: minLength(8), maxLength: maxLength(128) },
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
      if (!this.v$.$error) {
        if (!this.acceptedDisclaimer) {
          this.disclaimerWarning = true;
          return;
        } else {
          this.disclaimerWarning = false;
        }
        try {
          const response = await axios.post('/authentication/register', {
            ...this.form,
            enabled: true
          });
          console.log("Registration successful:", response.data);
          this.$router.push('/login');
        } catch (error) {
          this.popup.isVisible = true;
          this.popup.title = 'Registration Error';
          this.popup.message = 'Username or email already in use!';
          this.popup.confirm = false;
          console.error('Registration failed:', error);
          this.error = "Failed to register. Please check your details and try again.";
        }
      }
    },
    handleDisclaimerAccepted() {
      this.acceptedDisclaimer = true;
      this.showDisclaimer = false;
    },
    handlePopupConfirm() {
      this.popup.isVisible = false;
    },
    handlePopupCancel() {
      this.popup.isVisible = false;
    }
  }
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

.warning-message {
  color: red;
  font-size: 0.85rem;
  margin-top: 10px;
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
