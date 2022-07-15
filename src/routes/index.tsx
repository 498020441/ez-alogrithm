import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from './config.ts';
import GuardRoute from './widgets/guard';
const routerList = [...routes];

//实现路由守卫功能，重定向功能, 切换页面过度效果
const OnRouteBefore: React.FC<any> = ({ route }: any, index: number) => {
  if (route?.redirect) {
    return <Navigate to={route.redirect} replace />;
  }
  return (
    <>
      {route.guard ? (
        <GuardRoute>
          <route.component />
        </GuardRoute>
      ) : (
        <route.component />
      )}
    </>
  );
};

// 封装路由切换
const ViewRouter: React.FC<any> = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        {children}
        <Suspense fallback={null}>
          <Routes>
            {routerList.map((_route: IRoute, index: number) => {
              return (
                <Route
                  key={index + '_route'}
                  path={_route.path}
                  element={<OnRouteBefore route={_route} index={index} />}
                >
                  {/* 开启router-view模式 */}
                  {_route?.children && _route.children.length > 0 ? (
                    <>
                      {_route.children.map((item: IRoute, i: number) => {
                        return (
                          <Route
                            key={i + '_subRoute'}
                            path={item.path}
                            element={<OnRouteBefore route={item} index={i} />}
                          />
                        );
                      })}
                    </>
                  ) : null}
                </Route>
              );
            })}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default React.memo(ViewRouter);
