import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepages from './Pages/Homepages.jsx';
import Loginpages from './Pages/Loginpages.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/slice.js';

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
