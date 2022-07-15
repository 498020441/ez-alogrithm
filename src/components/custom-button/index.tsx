import React, { ReactElement } from 'react';
import './index.less';

const CustomButton: React.FC<IButton> = ({
  border = false,
  backgroundColor = '',
  onClick = () => {},
  content = '',
  children,
  disable = false,
  loading = false,
  prefixIcon = '',
  suffixIcon = '',
}: IButton) => {
  return (
    <>
      <div
        className={`custom_button_wrapper ${disable ? 'btn_disable' : ''}`}
        onClick={() => onClick}
      >
        {prefixIcon ? (
          <i className={`iconfont ${prefixIcon} prefix_icon_style`} />
        ) : null}
        {children || content}
        {suffixIcon ? (
          <i className={`iconfont ${suffixIcon} suffix_icon_style`} />
        ) : null}
      </div>
    </>
  );
};

export default React.memo(CustomButton);
