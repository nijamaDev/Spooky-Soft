import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/Blog';
import UserPage from './pages/Users';
import LoginPage from './pages/Login';
import Page404 from './pages/Page404';
import ProductsPage from './pages/Products';
import DashboardAppPage from './pages/Dashboard';
import RegisterUser from './pages/RegisterUser';
import EditUser from './pages/EditUser';
import RegisterNew from './pages/RegisterNew';
import EditNew from './pages/EditNew';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'register', element: <RegisterUser /> },
        { path: 'edit_user', element: <EditUser /> },
        { path: 'create_post', element: <RegisterNew /> },
        { path: 'edit_post', element: <EditNew /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
