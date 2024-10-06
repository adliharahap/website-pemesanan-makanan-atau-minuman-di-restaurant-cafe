import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';
import Homepages from './Pages/Homepages.jsx';
import Loginpages from './Pages/Loginpages.jsx';
import LoginForm from './sections/LoginForm.jsx';
import { AnimatePresence } from 'framer-motion';
import UserPages from './Pages/UserPages.jsx';
import AdminPages from './Pages/Admin/AdminDashboardPages.jsx';
import DeclineAcces from './Pages/DeclineAcces.jsx';
import AdminMenuPages from './Pages/Admin/MenuPages/AdminMenuPages.jsx';
import AdminAddMenuPages from './Pages/Admin/MenuPages/AdminAddMenuPages.jsx';
import AdminUserPages from './Pages/Admin/UserPages/AdminUserPages.jsx';
import AdminListMejaPages from './Pages/Admin/ListMejaPages/AdminListMejaPages.jsx';

const routes = [
  {
    path: "/",
    element: <Homepages />,
  },
  {
    path: "/login",
    element: <Loginpages />,
  },
  {
    path: "/test",
    element: <LoginForm />,
  },
  {
    path: "/User/Dashboard",
    element: <UserPages />,
  },
  {
    path: "/Admin/Dashboard",
    element: <AdminPages />,
  },
  {
    path: "/Admin/Menu",
    element: <AdminMenuPages />,
  },
  {
    path : "/Admin/Add-Menu",
    element: <AdminAddMenuPages />
  },
  {
    path: "/Admin/Pengguna",
    element: <AdminUserPages />
  },
  {
    path: "/Admin/List-meja",
    element: <AdminListMejaPages />
  },
  {
    path: "/AccesDecline",
    element: <DeclineAcces />,
  }
];

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

const router = createBrowserRouter([
  {
    path: "/*",
    element: <AnimatedRoutes />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
