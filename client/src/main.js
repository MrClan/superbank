import { createApp } from "vue";
import store from "./state/store";
import { createWebHashHistory, createRouter } from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

import AdminLogin from "@/views/admin/AdminLogin.vue";
import UserLogin from "@/views/auth/UserLogin.vue";
import Register from "@/views/auth/Register.vue";
import UserDashboard from "@/views/auth/UserDashboard.vue";
import UserSummary from "@/views/auth/UserSummary.vue";
import UserTransactions from "@/views/auth/UserTransactions.vue";
import Withdraw from "@/views/auth/Withdraw.vue";
import Transfer from "@/views/auth/Transfer.vue";
import Deposit from "@/views/auth/Deposit.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";

// routes

const routes = [
  {
    path: "/admin",
    redirect: "/admin/auth/login",
    component: Admin,
    children: [
      {
        path: "/admin/auth/login",
        component: AdminLogin,
      },
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: UserLogin,
      },
      {
        path: "/auth/register",
        component: Register,
      }
    ],
  },
  {
    path: "/user",
    redirect: "/user/summary",
    component: UserDashboard,
    children: [
      {
        path: "/user/summary",
        component: UserSummary,
      },
      {
        path: "/user/transactions",
        component: UserTransactions,
      },
      {
        path: "/user/withdraw",
        component: Withdraw,
      },
      {
        path: "/user/transfer",
        component: Transfer,
      },
      {
        path: "/user/deposit",
        component: Deposit,
      },]
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/",
    redirect: "/auth",
    component: Index,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
