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
    component: lazy(() => import('@/pages')),
    //子路由模式，同时需要在嵌入子路由的页面中添加 <Outlet/>
    children: [
      { path: 'home', component: lazy(() => import('@/pages/home')) },
      {
        path: 'path-visualizer',
        guard: true,
        component: lazy(() => import('@/pages/pathVisualizer')),
      },
      {
        path: 'sort-visualizer',
        guard: true,
        component: lazy(() => import('@/pages/sortVisualizer')),
      },
      { path: 'admin', component: lazy(() => import('@/pages/admin')) },
    ],
  },
  { path: '*', component: lazy(() => import('@/pages/404')) },
];

export default defineRoutes(routes);
