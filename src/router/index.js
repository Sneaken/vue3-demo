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
  {
    path: '/responsive-api',
    name: 'ResponsiveApi',
    component: () => import('@/views/ResponsiveApi'),
    children: [
      {
        path: 'reactive',
        name: 'Reactive',
        component: () => import('@/views/ResponsiveApi/Reactive'),
      },
      {
        path: 'ref',
        name: 'Ref',
        component: () => import('@/views/ResponsiveApi/Ref'),
      },
      {
        path: 'computed',
        name: 'Computed',
        component: () => import('@/views/ResponsiveApi/Computed'),
      },
      {
        path: 'readonly',
        name: 'Readonly',
        component: () => import('@/views/ResponsiveApi/Readonly'),
      },
      {
        path: 'watchEffect',
        name: 'WatchEffect',
        component: () => import('@/views/ResponsiveApi/WatchEffect'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
