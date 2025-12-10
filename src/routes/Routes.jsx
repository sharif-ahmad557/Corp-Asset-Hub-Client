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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
    ],
  },
]);
