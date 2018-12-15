import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: { requiresAuth: true },
      component: () => import("./views/Home.vue")
    },
    {
      path: "/books",
      name: "books",
      meta: { requiresAuth: true },
      component: () => import("./views/Books.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/SignIn.vue")
    },
    {
      path: "/join",
      name: "join",
      component: () => import("./views/Join.vue")
    },
    {
      path: "/favorites",
      name: "favorites",
      meta: { requiresAuth: true },
      component: () => import("./views/Favorites.vue")
    },
    {
      path: "/authors",
      name: "authors",
      meta: { requiresAuth: true },
      component: () => import("./views/Authors.vue")
    },
    {
      path: "/book/:book_id",
      name: "book",
      props: true,
      meta: { requiresAuth: true },
      component: () => import("./views/BookDetails.vue")
    },
    {
      path: "/magic",
      name: "magic",
      meta: { requiresAuth: true },
      component: () => import("./views/Magic.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: "/signin",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
