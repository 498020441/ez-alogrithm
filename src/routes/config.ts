import { lazy } from 'react';

// 向routes中插入公用的属性，避免重复定义, 且配置不会覆盖下面定义好的配置
const defineRoutes = (routes: Array<IRoute>) => {
  routes.forEach((item: IRoute) => {
    if (!item?.guard) {
      item.guard = true; //一级路由定义了guard 后， 子路由不需要配置guard
      if (item?.children && item.children.length > 0) {
        // 切换页面过度效果 只有在子路由模式下才会启用
        item.transition = true;
      }
    }
  });
  return routes;
};

const routes: Array<IRoute> = [
  {
    path: '/',
    component: lazy(() => import('@/pages')),
    //子路由模式，同时需要在嵌入子路由的页面中添加 <Outlet/>
    children: [
      {
        path: 'home',
        component: lazy(() => import('@/pages/home')),
        default: true, // <Route index element={...}>
      },
      {
        path: 'path-visualizer',
        component: lazy(() => import('@/pages/pathVisualizer')),
      },
      {
        path: 'sort-visualizer',
        component: lazy(() => import('@/pages/sortVisualizer')),
      },
    ],
  },
  { path: '/admin', component: lazy(() => import('@/pages/admin')) },
  { path: '*', component: lazy(() => import('@/pages/404')), guard: false },
];

export default defineRoutes(routes);
