import React from 'react';
import { Outlet } from 'react-router';
import { NavBar } from '@/components';
import './index.less';

const Home: React.FC<any> = () => {
  return (
    <>
      <NavBar />
      {/* 嵌套路由，子路由占位 */}
      <Outlet />
    </>
  );
};

export default Home;
