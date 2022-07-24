import React, { Suspense, useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import routes from './config.ts';
import GuardRoute from './widgets/guard';
import { Transition } from '@/components';
const routerList = [...routes];

const withTransition = (path: string, _routes: Array<IRoute>) => {
  let res: boolean = true;
  _routes.forEach((route: IRoute) => {
    if (route.path === path) {
      res = route?.transition ? true : false;
    }
  });
  return res;
};

// 封装路由切换
const ViewRouter: React.FC<any> = (props: any) => {
  return (
    <>
      <BrowserRouter>
        {props.children}
        <Suspense fallback={null}>
          <RoutesWrapper />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

const RoutesWrapper = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState<any>(location);
  const updateDisplayLocation = () => {
    setDisplayLocation({ ...location });
  };
  // 监听切换路由
  useEffect(() => {
    console.log(location.pathname, displayLocation.pathname);
    // 切换到没有过渡效果的页面以及从没有过渡效果的页面返回时，直接更新location
    if (
      !withTransition(displayLocation.pathname, routes) ||
      !withTransition(location.pathname, routes)
    ) {
      updateDisplayLocation();
    }
  }, [location]);

  return (
    <Routes location={displayLocation}>
      {routerList.map((_route: IRoute, index: number) => {
        return (
          <Route
            key={index + '_route'}
            path={_route.path}
            element={<OnRouteBefore routeItem={_route} />}
          >
            {/* 开启router-view模式 */}
            {_route?.children && _route.children.length > 0 ? (
              <>
                {_route.children.map((item: IRoute, i: number) => {
                  return (
                    <>
                      {item?.default ? (
                        <Route
                          index
                          key={i + '_subRoute'}
                          element={
                            <OnRouteBefore
                              parent={_route}
                              routeItem={item}
                              location={location.pathname}
                              displayLocation={displayLocation.pathname}
                              updateDisplayLocation={updateDisplayLocation}
                            />
                          }
                        />
                      ) : null}
                      <Route
                        path={item.path}
                        key={i + '_subRoute'}
                        element={
                          <OnRouteBefore
                            parent={_route}
                            routeItem={item}
                            location={location.pathname}
                            displayLocation={displayLocation.pathname}
                            updateDisplayLocation={updateDisplayLocation}
                          />
                        }
                      />
                    </>
                  );
                })}
              </>
            ) : null}
          </Route>
        );
      })}
    </Routes>
  );
};

//实现 切换页面过渡效果，重定向功能，路由守卫功能，，
const OnRouteBefore: React.FC<{
  displayLocation?: string;
  updateDisplayLocation?: () => void;
  location?: string;
  parent?: IRoute;
  routeItem: IRoute;
}> = ({
  updateDisplayLocation = () => {},
  location,
  displayLocation,
  routeItem,
  parent,
}) => {
  const navigate = useNavigate();
  let RouteComponent = <routeItem.component />;
  if (parent?.transition) {
    const { transitionConfig } = routeItem;
    RouteComponent = (
      <Transition
        type={transitionConfig?.type}
        duration={transitionConfig?.duration}
        location={location as string}
        displayLocation={displayLocation as string}
        updateDisplayLocation={updateDisplayLocation}
      >
        {RouteComponent}
      </Transition>
    );
  }
  if (parent?.guard) {
    RouteComponent = <GuardRoute>{RouteComponent}</GuardRoute>;
  }

  return <>{RouteComponent}</>;
};

export default React.memo(ViewRouter);
