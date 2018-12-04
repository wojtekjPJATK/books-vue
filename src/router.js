import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/books",
      name: "books",
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
      component: () => import("./views/Favorites.vue")
    },
    {
      path: "/authors",
      name: "authors",
      component: () => import("./views/Authors.vue")
    },
    {
      path: "/author/:author_id",
      name: "author",
      props: true,
      component: () => import("./views/AuthorDetails.vue")
    },
    {
      path: "/book/:book_id",
      name: "book",
      props: true,
      component: () => import("./views/BookDetails.vue")
    },
    {
      path: "/magic",
      name: "magic",
      component: () => import("./views/Magic.vue")
    }
  ]
});
