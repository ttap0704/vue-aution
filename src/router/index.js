import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    meta: { layout: 'layout-default'},
    component: () => import('@/views/Index'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
