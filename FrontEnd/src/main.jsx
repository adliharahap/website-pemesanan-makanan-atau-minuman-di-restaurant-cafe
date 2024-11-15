import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';
import Homepages from './Pages/Homepages.jsx';
import Loginpages from './Pages/Loginpages.jsx';
import { AnimatePresence } from 'framer-motion';
import UserPages from './Pages/UserPages.jsx';
import AdminPages from './Pages/Admin/AdminDashboardPages.jsx';
import DeclineAcces from './Pages/DeclineAcces.jsx';
import AdminMenuPages from './Pages/Admin/MenuPages/AdminMenuPages.jsx';
import AdminAddMenuPages from './Pages/Admin/MenuPages/AdminAddMenuPages.jsx';
import AdminUserPages from './Pages/Admin/UserPages/AdminUserPages.jsx';
import AdminListMejaPages from './Pages/Admin/ListMejaPages/AdminListMejaPages.jsx';
import AdminEditMenuPages from './Pages/Admin/MenuPages/AdminEditMenuPages.jsx';
import MenuDescriptionPages from './Pages/MenuDescriptionPages.jsx';
import AdminAddMejaPages from './Pages/Admin/ListMejaPages/AdminAddMejaPages.jsx';
import WaitersDashboard from './Pages/Waiters/WaitersDashboard.jsx';
import WaitersListMeja from './Pages/Waiters/WaitersListMejaPages.jsx';
import WaitersNewOrderPages from './Pages/Waiters/WaitersNewOrderPages.jsx';
import OrderMenuModal from './components/Waiters/OrderMenuModal.jsx';
import CartPages from './Pages/Waiters/CartPages.jsx';
import PesananSelesaiDimasakPages from './Pages/Waiters/PesananSelesaiDimasakPages.jsx';
import PesananSayaPages from './Pages/Waiters/PesananSayaPages.jsx';
import ConfirmOrdersChef from './Pages/Chef/ConfirmOrdersChef.jsx';
import PesananDimasakChef from './Pages/Chef/PesananDimasakChef.jsx';
import RecipeSearchPage from './Pages/Chef/RecipeSearchPage.jsx';
import UpdateStockMenuPage from './Pages/Chef/UpdateStockMenuPage.jsx';
import OrderReceiptPDF from './components/Waiters/OrderReceiptPDF.jsx';
import PaymentCashier from './Pages/Cashier/PaymentCashier.jsx';

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
    element: <OrderMenuModal />,
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
    path : "/Admin/Edit-Menu",
    element: <AdminEditMenuPages />
  },
  {
    path : "/MenuDescription",
    element: <MenuDescriptionPages />
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
    path: "/Admin/add-table",
    element: <AdminAddMejaPages />
  },
  {
    path: "/Waiter/Dashboard",
    element: <WaitersDashboard />
  },
  {
    path: "/Waiter/NewOrder",
    element: <WaitersNewOrderPages />
  },
  {
    path: "/Waiter/PesananSaya",
    element: <PesananSayaPages />
  },
  {
    path: "/Waiter/Daftar-Keranjang",
    element: <CartPages />
  },
  {
    path: "/Waiter/List-meja",
    element: <WaitersListMeja />
  },
  {
    path: "/Waiter/PesananSelesaiDimasak",
    element: <PesananSelesaiDimasakPages />
  },
  {
    path: "/Chef/ConfirmOrders",
    element: <ConfirmOrdersChef />
  },
  {
    path: "/Chef/OrderCooking",
    element: <PesananDimasakChef />
  },
  {
    path: "/Chef/UpdateStockMenu",
    element: <UpdateStockMenuPage />
  },
  {
    path: "/Chef/Recipe",
    element: <RecipeSearchPage />
  },
  {
    path: "/Cashier/Payment",
    element: <PaymentCashier />,
  },
  {
    path: "/AccesDecline",
    element: <DeclineAcces />,
  },
  {
    path: "/pdf-viewer",
    element: <OrderReceiptPDF />,
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
