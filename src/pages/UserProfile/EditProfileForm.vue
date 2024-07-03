<template>
  <custom-pop-up v-if="popup.isVisible" :title="popup.title" :message="popup.message" :confirm="popup.confirm"
  :isVisible="popup.isVisible" @confirmed="handlePopupConfirm" @cancelled="handlePopupCancel"></custom-pop-up>
  <card class="card" :title="$t('user_profile_form.title')">
    <div>
      <form @submit.prevent="updateProfile">
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="form-group">
              <label for="email">{{ $t('user_profile_form.email') }}</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                v-model="user.email"
                :class="{ 'is-invalid': v$.user.email.$error }"
              />
              <span v-if="v$.user.email.$error" class="error-message">
                {{ $t('edit_profile_errors.email') }}
              </span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="phoneNumber">{{ $t('user_profile_form.phone_number') }}</label>
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                placeholder="Phone Number"
                v-model="user.phoneNumber"
                :class="{ 'is-invalid': v$.user.phoneNumber.$error }"
              />
              <span v-if="v$.user.phoneNumber.$error" class="error-message">
                {{ $t('edit_profile_errors.phone_num') }}
              </span>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="form-group">
              <label for="firstName">{{ $t('user_profile_form.first_name') }}</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                placeholder="First Name"
                v-model="user.firstName"
                :class="{ 'is-invalid': v$.user.firstName.$error }"
              />
              <span v-if="v$.user.firstName.$error" class="error-message">
                {{ $t('edit_profile_errors.first_name') }}
              </span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="lastName">{{ $t('user_profile_form.last_name') }}</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                placeholder="Last Name"
                v-model="user.lastName"
                :class="{ 'is-invalid': v$.user.lastName.$error }"
              />
              <span v-if="v$.user.lastName.$error" class="error-message">
                {{ $t('edit_profile_errors.last_name') }}
              </span>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p-button type="warning" round @click.prevent="updateProfile">
            {{ $t('user_profile_form.update_btn') }}
          </p-button>
          <div v-if="error" class="error-message mt-2">
            {{ error }}
          </div>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
import axios from "axios";
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import CustomPopUp from '../Notification/CustomPopUp.vue';

export default {
  components : {
    CustomPopUp
  },
  data() {
    return {
      user: {
        userId: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      },
      error: null,
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
      user: {
        email: { required, email },
        phoneNumber: { required },
        firstName: { required },
        lastName: { required }
      }
    }
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  methods: {
    async updateProfile() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const token = localStorage.getItem("token");
        if (!token) {
          this.error = "You are not logged in.";
          return;
        }

        const userData = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          enabled: true,
          password: "",
        };

        const url = `/users/${this.user.userId}`;
        try {
          await axios.put(url, userData);
          this.$store.commit('setUserInfoUpdated', true);
          //alert(this.$t('info_messages.success_update'));
          this.setPopUpMessages('INFO', this.$t('info_messages.success_update'));
        } catch (error) {
          console.error("Error updating user data:", error);
          this.error = this.$t('edit_profile_errors.failed_to_update');
        }
      } else {
        this.error = this.$t('edit_profile_errors.error');
      }
    },
    async fetchUserData() {
      const username = localStorage.getItem("nutrioUser");
      const token = localStorage.getItem("token");

      if (!username || !token) {
        console.error("Username or token not found in storage.");
        return;
      }

      const url = `usersBasic/${username}`;
      try {
        const response = await axios.get(url);
        this.user.userId = response.data.id;
        this.user.username = response.data.username;
        this.user.firstName = response.data.firstName;
        this.user.lastName = response.data.lastName;
        this.user.email = response.data.email;
        this.user.phoneNumber = response.data.phoneNumber;
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
        }
      }
    },
    handlePopupConfirm() {
      this.popup.isVisible = false;
    },
    handlePopupCancel() {
      this.popup.isVisible = false;
    },
    setPopUpMessages(messageLevel, message) {
      this.popup.isVisible = true;
      this.popup.title = messageLevel;
      this.popup.message = message;
      this.popup.confirm = false;
    }
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
.is-invalid {
  border-color: red; 
}

.error-message {
  color: red;
  font-size: 0.75rem;
  margin-top: 4px;
}
</style>

