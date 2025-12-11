import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login.jsx";
import EmployeeRegister from "../pages/Register/EmployeeRegister.jsx";
import HrRegister from "../pages/Register/HrRegister";
import PrivateRoute from "./PrivateRoute.jsx";
import HRRoute from "./HRRoute.jsx";
import AssetList from "../pages/Dashboard/HR/AssetList.jsx";
import AddAsset from "../pages/Dashboard/HR/AddAsset.jsx";
import RequestAsset from "../pages/Dashboard/Employee/RequestAsset.jsx";
import MyAssets from "../pages/Dashboard/Employee/MyAssets.jsx";
import AllRequests from "../pages/Dashboard/HR/AllRequests";
import MyEmployeeList from "../pages/Dashboard/HR/MyEmployeeList";
import Payment from "../pages/Dashboard/HR/Payment/Payment";
import ErrorPage from "../pages/Shared/ErrorPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "join-employee",
        element: <EmployeeRegister />,
      },
      {
        path: "join-hr",
        element: <HrRegister />,
      },
      {
        path: "add-asset",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AddAsset />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "asset-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AssetList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "request-asset",
        element: (
          <PrivateRoute>
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "my-assets",
        element: (
          <PrivateRoute>
            <MyAssets />
          </PrivateRoute>
        ),
      },
      {
        path: "all-requests",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AllRequests />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-employee-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <MyEmployeeList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "upgrade-package",
        element: (
          <PrivateRoute>
            <HRRoute>
              <Payment />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "upgrade-package",
        element: (
          <PrivateRoute>
            <HRRoute>
              <Payment />
            </HRRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
