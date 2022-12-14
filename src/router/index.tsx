import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { RoutesType } from './utils';

const Home = React.lazy(() => import('@/views/Home'));
const RouteMock = React.lazy(() => import('@/views/RouteMock'));
const First = React.lazy(() => import('@/views/RouteMock/first'));
const Second = React.lazy(() => import('@/views/RouteMock/second'));
const Basis = React.lazy(() => import('@/views/Basis'));
const Drag = React.lazy(() => import('@/views/Drag'));

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
  },
  {
    path: '/routeMock',
    element: <RouteMock />,
    // 嵌套路由
    children: [
    // 配置父路由下的默认子路由
      {
        element: <First />,
        index: true,
      },
      {
        path: 'first',
        element: <First />
      },
      // http://localhost:3001/routeMock/first/:123
      {
        path: 'first/:pageId', // 动态路由
        element: <First />
      },
      {
        path: 'second',
        element: <Second />
      }
    ]
  },
  {
    path: '/basis',
    element: <Basis />
  },
  {
    path: '/drag',
    element: <Drag />
  }
]

const GetRoutes = () => {
  const router = useRoutes(routers)
  return router;
}

const ConstantRoute = () => {
  return (
    <Router>
      <Suspense fallback={ (<Home />)}>
        <GetRoutes />
      </Suspense>
    </Router>
  );
};

export default ConstantRoute;