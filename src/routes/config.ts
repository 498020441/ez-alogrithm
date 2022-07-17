import { lazy } from 'react';

// 向routes中插入公用的属性，避免重复定义
const defineRoutes = (routes: Array<IRoute>) => {
  routes.forEach((item: any) => {
    item.exact = true;
  });
  return routes;
};

const routes: Array<IRoute> = [
  {
    path: '/',
    redirect: '/ez-algorithm',
    component: lazy(() => import('@/pages/home')),

  },
  {
    path: '/path-visualizer',
    guard: true,
    component: lazy(() => import('@/pages/pathVisualizer')),
  },
  {
    path: '/sort-visualizer',
    guard: true,
    component: lazy(() => import('@/pages/sortVisualizer')),
  },

  // {
  //   path: '/ez-algorithm',
  //   component: lazy(() => import('@/pages/home')),
  //   // 使用route view 模式
  //   meta: { name: '主页' },
  //   guard: true,
  //   children: [
  //     {
  //       path: 'path-visualizer',
  //       guard: true,
  //       component: lazy(() => import('@/pages/pathVisualizer')),
  //     },
  //     {
  //       path: 'sort-visualizer',
  //       guard: true,
  //       component: lazy(() => import('@/pages/sortVisualizer')),
  //     },
  //   ],
  // },
  { path: '/admin', component: lazy(() => import('@/pages/admin')) },
  { path: '*', component: lazy(() => import('@/pages/404')) },
];

export default defineRoutes(routes);
