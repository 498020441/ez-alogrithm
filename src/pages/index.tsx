import React from 'react';
import { Outlet } from 'react-router';
import { Layout, NavBar } from '@/components';

const Entry: React.FC<any> = () => {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Entry;
