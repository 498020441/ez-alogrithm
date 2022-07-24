import React, { useRef, useCallback } from 'react';

const useRendered = (): [boolean, Function] => {
  const _isRendered = useRef<any>(false);
  const _update = useCallback(() => {
    _isRendered.current = !_isRendered.current;
  }, []);
  return [_isRendered.current, _update];
};
export default useRendered;
