import React, { ReactElement } from 'react';
import './index.less';

const CustomButton: React.FC<IButton> = ({
  backgroundColor = '',
  content = '',
  children,
  className = '',
  disable = false,
  loading = false,
  onClick = () => { },
  prefixIcon = '',
  suffixIcon = '',
  type = '',
}: IButton) => {
  console.log('type', type)
  const btnCls = () => {
    let cls = 'custom_button_wrapper'
    if (type) {
      cls = `${cls} ${type} btn_${disable ? 'disabled' : 'mask'}`
    } else {
      cls = `${cls} ${className} ${disable ? 'btn_disabled' : ''}`
    }
    return cls
  }
  return (
    <>
      <div
        className={btnCls()}
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
