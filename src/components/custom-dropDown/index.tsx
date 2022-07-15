import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './index.less';

const CustomDropDown: React.FC<IDropDown> = ({ children, options, style }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (item: IDropDownItem) => {
    navigate(item.linkTo);
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
          {options.map((item: IDropDownItem, index: number) => {
            return (
              <div
                className="drop_down_item"
                key={`drop_item_${index}}`}
                onClick={() => handleClick(item)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(CustomDropDown);
