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
    name: "register",
    path: "/auction/register",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Auction/Register"),
  },
  {
    name: "auction-details",
    path: "/auction/details/:aid",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Auction/Details"),
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
    name: "comunity-details",
    path: "/comunity/details/:pid",
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
    component: () => import("@/views/User/Login"),
  },
  {
    name: "info",
    path: "/info",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/User/Info"),
  },
  {
    name: "cash",
    path: "/cash",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/User/Cash"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
