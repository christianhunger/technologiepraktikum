import Vue from "vue";
import Router from "vue-router";
import Play from "./views/Play.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Play",
      component: Play
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "leaderboard" */ "./views/Leaderboard.vue")
    }
  ]
});
