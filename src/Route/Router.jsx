import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import CategoryAdd from "../Page/CategoryAdd/CategoryAdd";
import ItemAdd from "../Page/ItemAdd/ItemAdd";
import SupplierAdd from "../Page/SupplierAdd/SupplierAdd";
import DueBillAdd from "../Page/DueBill/DueBillAdd";
import DueBillView from "../Page/DueBill/DueBillView";
import Login from "../Page/Login/Login";
import Registration from "../Page/Registration/Registration";
import User from "../Page/User/User";
import MonthlyReportByPurchase from "../Page/MonthlyReport/MonthlyReportByPurchase";
import MonthlyReportByBillStatus from "../Page/MonthlyReport/MonthlyReportByBillStatus";
import CompanyWiseReport from "../Page/MonthlyReport/CompanyWiseReport";
import SupplierWiseReport from "../Page/MonthlyReport/SupplierWiseReport";
import PrivateRoute from "../ProtectedRoute/PrivateRoute";
import Dashboard from "../Page/Dashboard/Dashboard";
import DueBillDetails from "../Page/DueBill/DueBillDetails";
import Paidbill from "../Page/Paybill/Paidbill";
import Paybill from "../Page/Paybill/Paybill";
import BillReceive from "../Page/BillReceive/BillReceive";
import BillReceived from "../Page/BillReceive/BillReceived";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-category",
        element: (
          <PrivateRoute>
            <CategoryAdd></CategoryAdd>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-item",
        element: (
          <PrivateRoute>
            <ItemAdd></ItemAdd>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-supplier",
        element: (
          <PrivateRoute>
            <SupplierAdd></SupplierAdd>
          </PrivateRoute>
        ),
      },
      {
        path: "/due-bill-add/:id",
        element: (
          <PrivateRoute>
            <DueBillAdd></DueBillAdd>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://bill-manage-server.vercel.app/api/supplierInfo/${params.id}`
          ),
      },
      {
        path: "/due-bill-view/:id",
        element: (
          <PrivateRoute>
            <DueBillView></DueBillView>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://bill-manage-server.vercel.app/api/supplierInfo/${params.id}`
          ),
      },
      {
        path: "/due-bill-details/:id",
        element: (
          <PrivateRoute>
            <DueBillDetails></DueBillDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://bill-manage-server.vercel.app/api/due-bill/${params.id}`
          ),
      },

      {
        path: "/due-bill-receive",
        element: (
          <PrivateRoute>
            <BillReceive></BillReceive>
          </PrivateRoute>
        ),
      },
      {
        path: "/bill-received",
        element: (
          <PrivateRoute>
            <BillReceived></BillReceived>
          </PrivateRoute>
        ),
      },
      {
        path: "/due-bill-pay",
        element: (
          <PrivateRoute>
            <Paybill></Paybill>
          </PrivateRoute>
        ),
      },
      {
        path: "/due-bill-paid",
        element: (
          <PrivateRoute>
            <Paidbill></Paidbill>
          </PrivateRoute>
        ),
      },
      {
        path: "/monthly-purchase-report",
        element: (
          <PrivateRoute>
            <MonthlyReportByPurchase></MonthlyReportByPurchase>
          </PrivateRoute>
        ),
      },
      {
        path: "/monthly-billStatus-report",
        element: (
          <PrivateRoute>
            <MonthlyReportByBillStatus></MonthlyReportByBillStatus>
          </PrivateRoute>
        ),
      },

      {
        path: "/company-wise-report",
        element: (
          <PrivateRoute>
            <CompanyWiseReport></CompanyWiseReport>
          </PrivateRoute>
        ),
      },
      {
        path: "/supplier-wise-report",
        element: (
          <PrivateRoute>
            <SupplierWiseReport></SupplierWiseReport>
          </PrivateRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <User></User>
          </PrivateRoute>
        ),
      },

      {
        path: "/register",
        element: (
          <PrivateRoute>
            <Registration></Registration>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
