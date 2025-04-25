import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./modules/MainPage/page/MainPage.vue";
import LoginPage from "./modules/Auth/Login/LoginPage.vue";
import RegisterPage from "./modules/Auth/Register/RegisterPage.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
