// layouts
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import UserLayout from "@/layouts/User.vue";

import Login from "@/views/Login.vue";

// views for AdminArea
import Dashboard from "@/views/admin/Dashboard.vue";

// views for User Area
import Register from "@/views/auth/Register.vue";
import UserSummary from "@/views/auth/UserSummary.vue";
import UserTransactions from "@/views/auth/UserTransactions.vue";
import Withdraw from "@/views/auth/Withdraw.vue";
import Transfer from "@/views/auth/Transfer.vue";
import Deposit from "@/views/auth/Deposit.vue";

import store from "./state/store";
import { createWebHashHistory, createRouter } from "vue-router";
import jwt_decode from "jwt-decode";

const ensureAdmin = (to, from, next) => {
    try {
        const decodedToken = jwt_decode(store.state.token);
        if (decodedToken.access === "admin") {
            next()
        } else {
            next("/auth")
        }

    } catch (error) {
        console.log(error)
        next("/auth")
    }
};

const ensureUser = (to, from, next) => {
    try {
        const decodedToken = jwt_decode(store.state.token);
        if (decodedToken.access === "user") {
            next()
        } else {
            next("/auth")
        }

    } catch (error) {
        console.log(error)
        next("/auth")
    }
};


// routes

const routes = [
    {
        path: "/auth",
        redirect: "/auth/login",
        component: Auth,
        children: [
            {
                path: "/auth/login",
                component: Login,
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
        component: UserLayout,
        beforeEnter: ensureUser,
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
        path: "/admin",
        redirect: "/admin/dashboard",
        component: Admin,
        beforeEnter: ensureAdmin,
        children: [
            {
                path: "/admin/dashboard",
                component: Dashboard,
            },
            {
                path: "/admin/logout",
                component: Dashboard,
                beforeEnter: (t, f, n) => {
                    store.commit('clearState');
                    n("/auth");
                }
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/auth"
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
