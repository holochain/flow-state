import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@/apps/portfolio/views/Projects.vue")
  },
  {
    path: "/kanban/:uuid",
    name: "Kanban Board",
    component: () => import("@/apps/portfolio/views/KanbanBoard.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
