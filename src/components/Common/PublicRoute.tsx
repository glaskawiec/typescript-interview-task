import { FC } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Paths } from '~/constants';

const PublicRoute: FC<RouteProps> = ({ path, component }) => {
  const { push } = useHistory();
  const token = localStorage.getItem('token');

  if (token) {
    push(Paths.Items);
  }

  return <Route path={path} component={component} />;
};

export default PublicRoute;
