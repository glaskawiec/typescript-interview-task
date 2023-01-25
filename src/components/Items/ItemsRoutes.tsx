import List from './List/List';
import ErrorBlock from '../Common/ErrorBlock';
import Filter from './Filter/Filter';
import LoadingScreen from '../Common/LoadingScreen';
import Header from './Header/Header';
import { Route, Switch } from 'react-router-dom';
import { Paths } from '~/constants';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import itemHasReusedPassword from '~/utils/itemHasReusedPassword';
import { useUserContext } from '../../contexts/UserContext';
import itemIsOld from '~/utils/itemIsOld';
import { ItemsContextProvider, useItemsContext } from '~/contexts/ItemsContext';

const ItemsRoutes = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const { items, isLoading, errorMessage } = useItemsContext();

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <div className='container'>
      <Header items={items} username={username} />
      <Filter items={items} />
      <Switch>
        <Route exact path={Paths.Items}>
          <List items={items} />
        </Route>
        <Route path={Paths.Weak}>
          <List items={items.filter(itemHasWeakPassword)} />
        </Route>
        <Route path={Paths.Reused}>
          <List items={items.filter((item) => itemHasReusedPassword(item, items))} />
        </Route>
        <Route path={Paths.Old}>
          <List items={items.filter(itemIsOld)} />
        </Route>
      </Switch>
    </div>
  );
};

export default ItemsRoutes;
