import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login.jsx";
import EmployeeRegister from "../pages/Register/EmployeeRegister.jsx";
import HrRegister from "../pages/Register/HrRegister";

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
    ],
  },
]);
