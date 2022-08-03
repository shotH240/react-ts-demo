import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { RoutesType } from './utils';

const Home = React.lazy(() => import('@/views/Home'))

// interface homeInterface {
//   [target: number]: number
// }

const routers: RoutesType = [
  {
    path: '/',
    // asyncElement: () => import('@/views/Home'),
    element: <Home state={{ target: 123 }} />,
    meta: {
      title: '首页',
      cdd: ''
    }
  }
]

const GetRoutes = () => {
  const router = useRoutes(routers)
  return router;
}

const ConstantRoute = () => {
  return (
    <Router>
        <GetRoutes />
    </Router>
  );
};

export default ConstantRoute;