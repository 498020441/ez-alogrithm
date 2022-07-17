import React from 'react';
import { useNavigate } from 'react-router';
import { CustomButton, CustomDropDown } from '@/components';
import NavConfig from './config.ts';
import './index.less';

const NavBar: React.FC<any> = (props: any) => {
  const navigate = useNavigate();

  const handleClick = (item: INavConfig) => {
    item?.path && navigate(item.path);
  }

  return (
    <div className="nav_bar_wrapper">
      <div className="nav_bar_left">Easy-Algorithm</div>
      <div className="nav_bar_right">
        {NavConfig?.length > 0 ? (
          <>
            {NavConfig.map((item: INavConfig, index: number) => {
              if (item?.children && item.children.length > 0) {
                return (
                  <CustomDropDown options={item.children} key={'nav_' + index} onClick={handleClick}>
                    <CustomButton
                      className='nav_bar_item'
                      prefixIcon={item?.prefix || ''}
                      suffixIcon={item?.suffix || ''}
                    >
                      {item.name}
                    </CustomButton>
                  </CustomDropDown>
                );
              }
              return (
                <CustomButton
                  key={'nav_' + index}
                  className='nav_bar_item'
                  prefixIcon={item?.prefix || ''}
                  suffixIcon={item?.suffix || ''}
                  onClick={() => handleClick(item)}
                >
                  {item.name}
                </CustomButton>
              );
            })}
          </>
        ) : null}
      </div>
    </div >
  );
};

export default React.memo(NavBar);
