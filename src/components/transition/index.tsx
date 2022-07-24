import React, { useState, useEffect } from 'react';
import { useRendered } from '@/hooks';
import './index.less';

const Transition = ({
  children,
  updateDisplayLocation,
  direction = '',
  type = 'fade',
  duration = 200, //unit ms
  delay = 200, //unit ms
  location, // 要切换的location
  displayLocation, // 当前location
}: ITransition) => {
  const [transitionType, setType] = useState<string>('');
  const [transitionDirection, setDeirection] = useState<string>(direction);

  //step1,fadeIn Page1 (type = fade steps )
  useEffect(() => {
    if (location !== displayLocation) {
      if (type === 'fade') {
        if (!transitionType) {
          setType('fadeIn');
        } else if (transitionType === 'fadeIn') {
          setType('fadeOut');
        }
      } else if (type === 'zoom') {
        setType('zoomIn');
      } else {
        setType(type);
      }
    } else {
    }
  }, [location]);

  // step3, fadeIn Page2
  useEffect(() => {
    console.log('switch done');
    if (type === 'fade' && transitionType === 'fadeOut') {
      setType('fadeIn');
    }
  }, [displayLocation]);

  //step2, fadeOut Page1,update displayLocation
  const handleAnimatedEnd = () => {
    switch (type) {
      case 'fade':
        break;
      case 'zoom':
        setType('zoomOut');
        break;
      case 'slideIn':
        break;
      case 'slideOut':
        break;
      default:
        setType('');
        break;
    }
    updateDisplayLocation();
  };

  return (
    <div
      className={`transition_group ${transitionType} ${transitionDirection}`}
      style={{ '--duration': `${duration}ms`, '--delay': `${delay}ms` } as any}
      onAnimationEnd={handleAnimatedEnd}
    >
      {children}
    </div>
  );
};

export default React.memo(Transition);
