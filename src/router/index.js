import { createRouter, createWebHistory } from "vue-router";
import Admin from "../views/Admin.vue";
import Home from "../views/Home.vue";
import Overview from "../views/Overview.vue";
import Products from "../views/Products.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import { fb } from "@/Firebase";
import AddProducts from "../components/AddProducts.vue";

const routes = [
  {
    path: "/",
    name: "home",
    exact: true,
    component: Home,
  },
  {
    path: "/Login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "overview",
        name: "overview",
        component: Overview,
      },
      {
        path: "Products",
        name: "products",
        component: Products,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
