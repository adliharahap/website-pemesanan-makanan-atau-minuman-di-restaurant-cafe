import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/slice.js';
import Homepages from './Pages/Homepages.jsx';
import Loginpages from './Pages/Loginpages.jsx';
import LoginForm from './sections/LoginForm.jsx';
import { AnimatePresence } from 'framer-motion';

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
