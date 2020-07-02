import React from 'react';
import { Route } from 'react-router-dom';

const userRoles = ['default', 'p1', 'p2']; // be test

// 有分頁都要引入
const RouteHander = (_routes: any) => {
  return (
    <div className="RouteHander">
      {_routes.map((route: any, i: any) => {
        const index = i;
        const { path, exact, routes, role } = route;
        const find = userRoles.find(userRole => userRole === role);
        if (find) {
          return (
            <Route
              key={index}
              path={path}
              exact={exact}
              render={(routeProps: any) => (
                <route.component {...routeProps} routes={routes} />
              )}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default RouteHander;
