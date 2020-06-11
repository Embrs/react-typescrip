import Login from 'Pages/Login';
import Dashboard from 'Pages/Dashboard';
import Page1 from 'Pages/Page1';
import Page2 from 'Pages/Page2';
import Page3 from 'Pages/Page3';
import paths from 'Route/paths';

const routes = [
  {
    path: paths.Login,
    component: Login,
    exact: true,
    breadcrumbName: 'Login',
    role: 'default',
  },

  {
    path: paths.Dashboard,
    component: Dashboard,
    breadcrumbName: 'Dashboard',
    role: 'default',
    routes: [
      {
        path: paths.Page1,
        component: Page1,
        breadcrumbName: 'Page1',
        role: 'p1',
      },
      {
        path: paths.Page2,
        component: Page2,
        breadcrumbName: 'Page2',
        role: 'p2',
      },
      {
        path: paths.Page3,
        component: Page3,
        breadcrumbName: 'Page3',
        role: 'p3',
      },
    ],
  },
];

export default routes;
