import { useRoutes, RouteObject } from 'react-router-dom';
import AllSprints from './components/AllSprints';
import Login from './components/Login';
import Logout from './components/Logout';
import Sprint from './components/Sprint';
import Stats from './components/Stats';
import Team from './components/Team';
import Loading from './components/utilities/Loading';

interface Route {
  path: string;
  element?: React.ReactNode;
  children?: RouteObject[];
  navLinkName: string;
  isNavLinkVisible: boolean;
}

const routesConfig: Route[] = [
  {
    path: '/login',
    element: <Login />,
    navLinkName: 'Login',
    isNavLinkVisible: false,
  },
  {
    path: '/',
    element: <Stats />,
    navLinkName: 'Stats',
    isNavLinkVisible: true,
  },
  {
    path: '/sprints',
    children: [
      {
        index: true,
        element: <AllSprints />,
      },
      {
        path: ':sprint',
        element: <Sprint />,
      }
    ],
    navLinkName: 'Sprints',
    isNavLinkVisible: true,
  },
  {
    path: '/team',
    children: [
      {
        path: ':team',
        element: <Team />,
      }
    ],
    navLinkName: 'Team',
    isNavLinkVisible: true,
  },
  {
    path: '/logout',
    element: <Logout />,
    navLinkName: 'Logout',
    isNavLinkVisible: false,
  },
  {
    path: '/load',
    element: <Loading />,
    navLinkName: 'Loading',
    isNavLinkVisible: true,
  }
];

const Routes = () => {
  const routes = useRoutes(routesConfig);

  return routes;
};

export { routesConfig };
export default Routes;
