import { createBrowserRouter } from "react-router";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        
        element: <Home></Home>,
      },

      {
        path: "/",
        element: <PrivateRoute></PrivateRoute>,
        loader: () => fetch("/serviceCenters.json").then(res => res.json())
      },
      {
        path: "/send-percel",
        element: <PrivateRoute></PrivateRoute>,
        loader: () => fetch("/serviceCenters.json").then(res => res.json())
      },
      {
        path: "/",
        loader: () => fetch("/serviceCenters.json").then(res => res.json())
      },
      {
        path: "/",
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
    ]
  },
  // {
  //   path: '/dashboard',
  //   element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
  //   children: [
  //     {
  //       path: 'my-parcels',
  //       element: <MyPercels></MyPercels>
  //     },
  //     {
  //       path: 'payment/:parcelId',
  //       element: <Payment></Payment>
  //     },
  //     {
  //       path: 'payment-success',
  //       element: <PaymentSuccess></PaymentSuccess>
  //     },
  //     {
  //       path: 'payment-cancelled',
  //       element: <PaymentCancelled></PaymentCancelled>
  //     },
  //     {
  //       path: 'approve-rider',
  //       element: <AdminRoute><ApproveRider></ApproveRider></AdminRoute>
  //     },
  //     {
  //       path: 'users-management',
  //       // element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
  //       element: <UserManagement></UserManagement>
  //     },
  //     {
  //       path: '*',
  //       element: <ErrorPage></ErrorPage>
  //     },
  //   ]
  // }
]);