import React, { createContext } from 'react';

interface IAuthState {
  login?: boolean;
  userInfo?: any;
}
interface AuthAction {
  type: string;
  payload: IAuthState;
}

export const AuthCtx = createContext<{
  state: IAuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({} as any);

export const AuthReducer = (
  state: IAuthState,
  action: AuthAction,
): IAuthState => {
  switch (action.type) {
    // 批量更新
    case 'setState':
      return { ...state, ...action.payload };
    // 指定更新
    case 'setLogin':
      return { ...state, login: action.payload.login };
    case 'setUserInfo':
      return { ...state, userInfo: action.payload.userInfo };
    default:
      return state;
  }
};

export const AuthInitState: IAuthState = {
  login: false,
  userInfo: {},
};
