import Vue from "vue";
import VueRouter from "vue-router";
import StudentsPage from "../pages/StudentsPage.vue";
import StudentDetailPage from "../pages/StudentDetailPage.vue";
import SectionsPage from "../pages/SectionsPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    redirect: () => {
      return { name: "StudentsPage" };
    },
  },
  {
    path: "/students",
    name: "StudentsPage",
    component: StudentsPage,
  },
  {
    path: "/student/:id",
    name: "StudentDetailPage",
    component: StudentDetailPage,
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
