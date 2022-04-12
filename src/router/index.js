import Vue from "vue";
import VueRouter from "vue-router";
import StudentsPage from "../pages/StudentsPage.vue";
import SectionsPage from "../pages/SectionsPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: StudentsPage,
  },
  {
    path: "/students",
    name: "StudentsPage",
    component: StudentsPage,
  },
  {
    path: "/sections",
    name: "SectionsPage",
    component: SectionsPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
