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
import Features from "../components/Shared/Features.jsx";
import Pricing from "../components/Shared/Pricing.jsx";
import About from "../components/Shared/About.jsx";
import Contact from "../components/Shared/Contact.jsx";
import Profile from "../pages/Dashboard/HR/Profile.jsx";
import MyTeam from "../pages/Dashboard/Employee/MyTeam.jsx";
import MyProfile from "../pages/Dashboard/Employee/Profile.jsx";
import AssetDetails from "../pages/AssetDetails/AssetDetails.jsx";
import PaymentHistory from "../pages/Dashboard/HR/Payment/PaymentHistory";
import UpdateAsset from "../pages/Dashboard/HR/UpdateAsset";

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
        path: "asset-details/:id",
        element: (
          <PrivateRoute>
            <AssetDetails />
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
        path: "my-team",
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
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
      {
        path: "Profile",
        element: (
          <PrivateRoute>
            <HRRoute>
              <Profile />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <HRRoute>
              <PaymentHistory />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "assets/update/:id",
        element: (
          <PrivateRoute>
            <HRRoute>
              <UpdateAsset />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      { path: "/features", element: <Features /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
