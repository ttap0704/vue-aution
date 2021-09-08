import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "index",
    path: "/",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Auction/Index"),
  },
  {
    name: "auction",
    path: "/auction",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Auction/Index"),
  },
  {
    name: "comunity",
    path: "/comunity",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Comunity/Index"),
  },
  {
    name: "write",
    path: "/comunity/write",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Comunity/Write"),
  },
  {
    name: "details",
    path: "/comunity/details",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Comunity/Details"),
  },
  {
    name: "comunity",
    path: "/comunity",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Comunity/Index"),
  },
  {
    name: "login",
    path: "/login",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Login"),
  },
  {
    name: "info",
    path: "/info",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Info"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
