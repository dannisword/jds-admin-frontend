import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'
import Layout from "../layout/Layout.vue"

export const constantRoutes: Array<RouteRecordRaw> = [
  {

    path: "/",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import('../views/dashboard.vue'),
        meta: { title: "Dashboard", affix: false },
      },
      {
        path: "inbound/:id",
        name: "inbound",
        component: () => import('../views/inbounds/inbound.vue'),
        meta: { title: "Assign PCB Designer",  affix: true },
      },
      {
        path: "inboundDetail",
        name: "inboundDetail",
        component: () => import('../views/inbounds/inbound-detail.vue'),
        meta: { title: "入庫明細",  affix: true },
      },
      {
        path: "pcb-detail",
        name: "pcb-detail",
        component: () => import('../views/inbounds/pcb-detail.vue'),
        meta: { title: "Project Add",  affix: true },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/login.vue"),
    meta: { title: "登入頁面" },
  },
  {
      path: "/404",
    component: () => import("../views/404.vue"),
  },
  /*
  { path: "*", redirect: "/404", hidden: true },
  */
];

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router;
