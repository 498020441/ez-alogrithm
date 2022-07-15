import { Navigate } from 'react-router-dom';

const getAuth = () => {
  return true;
};

// 路由守卫 可以在此鉴权、鉴定登录
export default function GuardRoute({ children = <></> }) {
  //获取token
  const isToken = getAuth();
  if (isToken) {
    //如果有token，那就去往该组件包裹的页面
    return <>{children}</>;
  } else {
    //跳转去登录页面
    return <Navigate to="/404" replace />;
  }
}
