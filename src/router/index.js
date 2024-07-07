/*
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register','/disclaimer'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
*/

// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store.js';
import axios from 'axios';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

function isTokenExpired(token) {
  if (!token) return true;
  const jwtPayload = JSON.parse(atob(token.split('.')[1]));
  return Date.now() >= jwtPayload.exp * 1000;
}

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/disclaimer'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (authRequired && (!token || isTokenExpired(token))) {
    if (refreshToken && !isTokenExpired(refreshToken)) {
      axios.post('/authentication/refresh', { refreshToken })
        .then(response => {
          const { token: newToken } = response.data;
          localStorage.setItem('token', newToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          next(); 
        })
        .catch(() => {
          handleTokenExpiry();
          next('/login'); 
        });
    } else {
      handleTokenExpiry();
      next('/login'); 
    }
  } else {
    next();
  }
});

function handleTokenExpiry() {
  localStorage.removeItem('token');
  localStorage.removeItem('nutrioUser');
  store.commit('resetState');
}

export default router;

