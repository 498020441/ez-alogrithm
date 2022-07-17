import React from 'react';
import './index.less';

const CustomButton: React.FC<IButton> = ({
  backgroundColor = '',
  border = false,
  content = '',
  children,
  className = '',
  disable = false,
  loading = false,
  onClick = () => { },
  prefixIcon = '',
  suffixIcon = '',
  type = 'default',
}: IButton) => {
  const btnCls = () => {
    let cls = 'custom_button_wrapper'
    if (type !== 'default') {
      cls = `${cls} ${type} btn_${disable ? 'disabled' : 'mask'}`
    } else {
      cls = `${cls} ${disable ? 'btn_disabled' : 'default'} ${className} ${border ? 'with_border' : ''} `
    }
    return cls
  }

  const handleClick = () => {
    if (!disable) {
      onClick()
    }
  }

  return (
    <>
      <button
        type='button'
        className={btnCls()}
        onClick={handleClick}
      >
        {prefixIcon ? (
          <i className={`iconfont ${prefixIcon} prefix_icon_style`} />
        ) : null}
        {children || content}
        {suffixIcon ? (
          <i className={`iconfont ${suffixIcon} suffix_icon_style`} />
        ) : null}
      </button>
    </>
  );
};

export default React.memo(CustomButton);
