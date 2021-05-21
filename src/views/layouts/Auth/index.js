import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from '../../../routes';

function Auth() {
  const getRoutes = () => {
    return routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Switch>
        {getRoutes()}
        <Redirect from="/auth" to="/auth/login" />
      </Switch>
    </div>
  );
}

export default Auth;
