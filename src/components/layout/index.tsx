import React from 'react';
import './index.less';

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <div className="split_line"></div>
      <div className="layout">{children}</div>
    </>
  );
};

export default React.memo(Layout);
