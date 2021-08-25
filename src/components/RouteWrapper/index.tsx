import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  component: React.ElementType,
  layout: React.ElementType,
  path: string,
}

const RouteWrapper: React.FC<Props> = ({
  component: Component,
  layout: Layout,
  path,
  ...rest
}) => {

  const publicRoutes = [
    '/login'
  ];

  const isPublic = publicRoutes.includes(path);
  const isLoggedIn = window.localStorage.getItem('accessToken') != null;

  if (!isPublic && !isLoggedIn) {
    return <Redirect to='/login'/>;
  }

  if (isPublic && !isLoggedIn && window.location.pathname === '/') {
    return <Redirect to='/login'/>;
  }

  if (isPublic && isLoggedIn) {
    return <Redirect to='/trading'/>;
  }

  return (
    <Route {...rest} render={(props) => <Layout {...props}>
      <Component {...props} />
    </Layout>
    }/>
  );
}

export default RouteWrapper;
