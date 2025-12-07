import { createBrowserRouter } from "react-router";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../layouts/AuthLayout";
import MyTuitions from "../features/dashboard/student-dashboard/MyTuitions";
import StudentDashboardLayout from "../features/dashboard/student-dashboard/StudentDashboardLayout";
import TutorDashboardLayout from "../features/dashboard/tutor-dashboard/TutorDashboardLayout";
import AdminDashboardLayout from "../features/dashboard/admin-dashboard/AdminDashboardLayout";
import DashboardContainer from "../features/dashboard/DashboardContainer";
import PostNewTuition from "../features/dashboard/student-dashboard/PostNewTuition";

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
        path: "/tuitions",
        element: (
          <PrivateRoute>
            <MyTuitions></MyTuitions>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },

  //dashboard routes
  {
    path: "/dashboard",
    // Shob Dashboard Route gulo PrivateRoute-er bhitore thakbe
    element: (
      <PrivateRoute>
        <DashboardContainer></DashboardContainer>
      </PrivateRoute>
    ),
    children: [
      //  STUDENT DASHBOARD
      {
        path: "student", // /dashboard/student
        Component: StudentDashboardLayout, // Student Layout will render here
        children: [
          {
            index: true,
            element: <MyTuitions />,
          },
          {
            path: "post-new-tuition",
            element: <PostNewTuition />,
          },
          {
            path: "applied-tutors/:id",
            // element: <AppliedTutors />,
          },
          // ... other student routes (Payments, Profile)
        ],
      },

      // TUTOR DASHBOARD
      {
        path: "tutor", // /dashboard/tutor
        Component: TutorDashboardLayout,
        children: [
          {
            index: true,
            // element: <TutorMyApplications />,
          },
          // ... other tutor routes (Ongoing Tuitions, Revenue History)
        ],
      },

      // ADMIN DASHBOARD
      {
        path: "admin", // /dashboard/admin
        Component: AdminDashboardLayout,
        children: [
          {
            path: "user-management",
            // element: <UserManagement />,
          },
          // ... other admin routes (Tuition Management, Reports)
        ],
      },

      // Optional: Default redirect or error page for /dashboard
      {
        path: "",
        // element: <RedirectToRoleDashboard />,
      },
    ],
  },
]);
