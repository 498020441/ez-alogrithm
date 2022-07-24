import React, { useReducer, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Layout, NavBar } from '@/components';
import { AuthCtx, AuthReducer, AuthInitState } from '@/context/auth';
import '@/theme/global.less';

const Entry: React.FC<any> = () => {
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitState);
  const navigate = useNavigate();

  useEffect(() => {
    // navigate('home');
  }, []);
  return (
    <>
      <AuthCtx.Provider value={{ state: authState, dispatch: authDispatch }}>
        <NavBar></NavBar>
        <Layout>
          {/* 子路由页面 */}
          <Outlet />
        </Layout>
      </AuthCtx.Provider>
    </>
  );
};

export default Entry;
