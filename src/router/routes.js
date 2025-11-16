const routes = [
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/login",
    component: () => import("pages/Auth/loginPage.vue"),
    name: "loginpage",
  },
  {
    path: "/register",
    component: () => import("pages/Auth/registerPage.vue"),
    name: "registerpage",
  },
  {
    path: "/dashboard-admin",
    component: () => import("src/layouts/MainLayoutAdmin.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        name: "dashboardAdminpage",
        component: () => import("pages/Admin/dashboardAdmin.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("src/layouts/MainLayoutUser.vue"),
    children: [
      {
        path: "",
        name: "dashboardUserpage",
        component: () => import("pages/User/dashboardUser.vue"),
      },
      {
        path: "profile",
        name: "profileUserpage",
        component: () => import("pages/User/editProfilePage.vue"),
      },
    ],
  },
  {
    path: "/search",
    component: () => import("src/layouts/MainLayoutUser.vue"),
    children: [
      {
        path: "",
        name: "searchPage",
        component: () => import("pages/User/catalogPage.vue"),
      },
    ],
  },
  {
    path: "/costume/:id",
    component: () => import("src/layouts/MainLayoutUser.vue"),
    children: [
      {
        path: "",
        name: "detailCostumePage",
        component: () => import("pages/User/detailCostume.vue"),
      },
    ],
  },
  {
    path: "/rental-user",
    component: () => import("src/layouts/MainLayoutUser.vue"),
    children: [
      {
        path: "pending",
        name: "pendingPageUser",
        component: () => import("pages/RentStatus/User/pendingPage.vue"),
      },
      {
        path: "ongoing",
        name: "ongoingPageUser",
        component: () => import("pages/RentStatus/User/ongoingPage.vue"),
      },
      {
        path: "active",
        name: "activePageUser",
        component: () => import("pages/RentStatus/User/activePage.vue"),
      },
      {
        path: "completed",
        name: "completedPageUser",
        component: () => import("pages/RentStatus/User/completedPage.vue"),
      },
    ],
  },
  {
    path: "/rental-list",
    component: () => import("src/layouts/MainLayoutAdmin.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "pending",
        name: "pendingPageAdmin",
        component: () => import("pages/RentStatus/Admin/pendingPageAdmin.vue"),
      },
      {
        path: "active",
        name: "activePageAdmin",
        component: () => import("pages/RentStatus/Admin/activePageAdmin.vue"),
      },
      {
        path: "returning",
        name: "returningPageAdmin",
        component: () =>
          import("pages/RentStatus/Admin/returningPageAdmin.vue"),
      },
    ],
  },
  {
    path: "/upload-cos",
    component: () => import("src/layouts/MainLayoutAdmin.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        name: "uploadPageAdmin",
        component: () => import("pages/Admin/uploadCosPage.vue"),
      },
    ],
  },
  {
    path: "/edit-cos/:id",
    component: () => import("src/layouts/MainLayoutAdmin.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        name: "editPageAdmin",
        component: () => import("pages/Admin/editCosPage.vue"),
      },
    ],
  },
  {
    path: "/costume/admin/:id",
    component: () => import("src/layouts/MainLayoutAdmin.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        name: "detailAdminCostumePage",
        component: () => import("pages/Admin/detailCosAdmin.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
