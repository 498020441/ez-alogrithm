import React, { useContext, useCallback } from 'react';
import { AuthCtx } from '@/context/auth';
/* import other ctx here*/

const useCustomCtx = (type: string) => {
  const { state, dispatch } = useContext(type === 'auth' ? AuthCtx : AuthCtx);
  const setState = useCallback(
    (payload: any) => {
      if (dispatch) {
        dispatch({ type: 'setState', payload });
      }
    },
    [dispatch],
  );

  return [state, setState];
};

export default useCustomCtx;
