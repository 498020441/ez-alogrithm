import { useReducer } from 'react';
import { AuthCtx, AuthReducer, AuthInitState } from './context/auth';
import { NavBar } from './components';
import ViewRouter from '@/routes/index';
import '@/theme/global.less';

function App() {
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitState);

  return (
    <AuthCtx.Provider value={{ state: authState, dispatch: authDispatch }}>
      <div className="App">
        <ViewRouter>
          <NavBar></NavBar>
        </ViewRouter>
      </div>
    </AuthCtx.Provider>
  );
}

export default App;
