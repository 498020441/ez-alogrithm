import { NavBar } from './components';
import ViewRouter from '@/routes/index';
import '@/theme/global.less';

function App() {
  return (
    <div className="App">
      <ViewRouter>
        <NavBar></NavBar>
      </ViewRouter>
    </div>
  );
}

export default App;
