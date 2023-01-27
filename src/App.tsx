import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import ItemsRoutes from './components/Items/ItemsRoutes';
import Login from './components/Login/Login';
import PrivateRoute from './components/Common/PrivateRoute';
import PublicRoute from './components/Common/PublicRoute';
import { Paths } from './constants';
import { UserContextProvider } from './contexts/UserContext';
import './style/styles.scss';
import { ItemsContextProvider } from './contexts/ItemsContext';

const App = () => (
  <Router>
    <Switch>
      <PublicRoute path={Paths.Login} component={Login} />
      <PrivateRoute
        path={Paths.Items}
        component={() => (
          <UserContextProvider>
            <ItemsContextProvider>
              <ItemsRoutes />
            </ItemsContextProvider>
          </UserContextProvider>
        )}
      />
      <PrivateRoute path={Paths.Root} component={() => <Redirect to={Paths.Items} />} />
    </Switch>
  </Router>
);

export default App;
