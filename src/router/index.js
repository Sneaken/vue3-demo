import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/set-up',
  },
  {
    path: '/set-up',
    name: 'SetUp',
    component: () => import('@/views/SetUp'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
