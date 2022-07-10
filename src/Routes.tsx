import { useRoutes } from "react-router-dom";
import AllSprints from "./components/AllSprints";
import Login from "./components/Login";
import Sprint from "./components/Sprint";
import Stats from "./components/Stats";
import Team from "./components/Team";

const routesConfig = [
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
    element: <Team />,
    navLinkName: 'Team',
    isNavLinkVisible: true,
  },
];

const Routes = () => {
  const routes = useRoutes(routesConfig);

  return routes;
}

export { routesConfig }
export default Routes
