import React from 'react';
import ProductPage from '@/pages/ProductPage';
import HomePage from '@/pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import About from './pages/About';
import Menu from './pages/Menu';
import Location from './pages/Location';
import Login from './pages/Login';
import Register from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import { ROUTES } from '@/data/routes';
import Cart from '@/pages/Cart';
import NotFoundPage from '@/pages/NotFoundPage';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: ROUTES.main,
    element: <Layout />,
    children: [
      {
        path: ROUTES.main,
        element: <HomePage />,
      },
      {
        path: ROUTES.products,
        element: <ProductPage />,
      },
      {
        path: ROUTES.about,
        element: <About />,
      },
      {
        path: ROUTES.menu,
        element: <Menu />,
      },
      {
        path: ROUTES.locations,
        element: <Location />,
      },
      {
        path: ROUTES.cart,
        element: <Cart />,
      },
      {
        path: ROUTES.profile,
        element: <Profile />,
      },
      {
        path: ROUTES.notFound,
        element: <NotFoundPage />,
      },
    ],
  },

  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.register,
    element: <Register />,
  },
  {
    path: ROUTES.forgotPassword,
    element: <ForgotPassword />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
