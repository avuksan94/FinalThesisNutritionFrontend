// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store.js';
//Globalization support
import { createI18n } from 'vue-i18n';
import messages from './locales/index.js';

//Validation
import { VuelidatePlugin } from '@vuelidate/core'

//Prettier alerts

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css';  
import 'primeicons/primeicons.css';  

import NutrioDashboard from './plugins/nutrioDashboard.js';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081/healthAPI';
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    //config.headers['Content-Type'] = 'application/json';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const savedLanguage = localStorage.getItem('language') || 'en';

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage, 
  fallbackLocale: 'en', 
  messages
});

const app = createApp(App);

app.use(PrimeVue); 
app.use(router);
app.use(i18n);
app.use(VuelidatePlugin);
app.use(store);
app.use(NutrioDashboard);

app.mount('#app');
