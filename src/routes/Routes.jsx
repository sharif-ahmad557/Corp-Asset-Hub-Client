import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login.jsx";

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
        path: "join-employee",
        element: (
          <div className="text-center mt-20">
            Employee Register Page Coming Soon
          </div>
        ),
      },
      {
        path: "join-hr",
        element: (
          <div className="text-center mt-20">HR Register Page Coming Soon</div>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
