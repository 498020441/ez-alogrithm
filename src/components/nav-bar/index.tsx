import React, { Children } from 'react';
import { useNavigate } from 'react-router';
import { CustomButton, CustomDropDown } from '@/components';
import NavConfig from './config.ts';
import './index.less';

const NavBar: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  const formatChildren = (
    children: Array<INavConfig>,
  ): Array<IDropDownItem> => {
    const options: Array<IDropDownItem> = children.map((item: INavConfig) => ({
      label: item.name || '',
      value: item.name || '',
      linkTo: item.path || '',
    }));
    return options;
  };
  return (
    <div className="nav_bar_wrapper">
      <div className="nav_bar_left">Easy-Algorithm</div>
      <div className="nav_bar_right">
        {NavConfig?.length > 0 ? (
          <>
            {NavConfig.map((item: INavConfig, index: number) => {
              if (item?.children && item.children.length > 0) {
                return (
                  <CustomDropDown options={formatChildren(item.children)}>
                    <CustomButton
                      prefixIcon={item?.prefix || ''}
                      suffixIcon={item?.suffix || ''}
                    >
                      {item.name}
                    </CustomButton>
                  </CustomDropDown>
                );
              }
              return (
                <div
                  key={'navBar_' + index}
                  onClick={() => {
                    item?.path && navigate(item.path);
                  }}
                >
                  <CustomButton
                    prefixIcon={item?.prefix || ''}
                    suffixIcon={item?.suffix || ''}
                  >
                    {item.name}
                  </CustomButton>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
