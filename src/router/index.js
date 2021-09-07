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
    kor_name: "경매"
  },
  {
    name: "comunity",
    path: "/comunity",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Comunity/Index"),
    kor_name: "커뮤니티",
  },
  {
    name: "write",
    path: "/comunity/write",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Comunity/Write"),
    kor_name: "글 작성",
  },
  {
    name: "comunity",
    path: "/comunity",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Comunity/Index"),
    kor_name: "커뮤니티",
  },
  {
    name: "login",
    path: "/login",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Login"),
    kor_name: "로그인"
  },
  {
    name: "info",
    path: "/info",
    meta: { layout: "LayoutDefault" },
    component: () => import("@/views/Info"),
    kor_name: "내 정보"
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
