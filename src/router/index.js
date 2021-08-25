import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "index",
    path: "/",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Auction"),
  },
  {
    name: "auction",
    path: "/auction",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Auction"),
    kor_name: "경매"
  },
  {
    name: "comunity",
    path: "/comunity",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Comunity"),
    kor_name: "커뮤니티"
  },
  {
    name: "login",
    path: "/login",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Login"),
    kor_name: "로그인"
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
