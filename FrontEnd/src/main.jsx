import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepages from './Pages/Homepages.jsx';
import Loginpages from './Pages/Loginpages.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepages />,
  },
  {
    path : "/login",
    element : <Loginpages />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
