import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

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
        path: "/rider",
        element: <PrivateRoute><Rider></Rider></PrivateRoute>,
        loader: () => fetch("/serviceCenters.json").then(res => res.json())
      },
      {
        path: "/send-percel",
        element: <PrivateRoute><SendPercel></SendPercel></PrivateRoute>,
        loader: () => fetch("/serviceCenters.json").then(res => res.json())
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("/serviceCenters.json").then(res => res.json())
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>
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
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    // children: [
    //   {
    //     path: 'my-parcels',
    //     element: <MyPercels></MyPercels>
    //   },
    //   {
    //     path: 'payment/:parcelId',
    //     element: <Payment></Payment>
    //   },
    //   {
    //     path: 'payment-success',
    //     element: <PaymentSuccess></PaymentSuccess>
    //   },
    //   {
    //     path: 'payment-cancelled',
    //     element: <PaymentCancelled></PaymentCancelled>
    //   },
    //   {
    //     path: 'approve-rider',
    //     element: <AdminRoute><ApproveRider></ApproveRider></AdminRoute>
    //   },
    //   {
    //     path: 'users-management',
    //     // element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
    //     element: <UserManagement></UserManagement>
    //   },
    //   {
    //     path: '*',
    //     element: <ErrorPage></ErrorPage>
    //   },
    // ]
  }
]);