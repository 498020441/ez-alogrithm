import React, { useState } from 'react';
import { CustomButton } from '@/components';
import { useNavigate } from 'react-router';
import './index.less';

const CustomDropDown: React.FC<IDropDown> = ({ children, options, style }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (item: INavConfig) => {
    navigate(item.path);
  };
  const handleMouseHover = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div
      className={'drop_down_wrapper'}
      style={style}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {options?.length > 0 ? (
        <div className={`drop_down_panel ${isHover ? 'expand' : 'collapse'}`}>
          {options.map((item: INavConfig, index: number) => {
            return (
              <CustomButton
                key={`drop_item_${index}}`}
                className="drop_down_item"
                prefixIcon={item?.prefix || ''}
                suffixIcon={item?.suffix || ''}
                onClick={() => handleClick(item)}
              >
                {item.name}
              </CustomButton>

            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(CustomDropDown);
