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
import AppliedTutors from "../features/dashboard/student-dashboard/AppliedTutors";
import ProfileSettings from "../features/dashboard/student-dashboard/ProfileSettings";
import TutorMyApplications from "../features/dashboard/tutor-dashboard/TutorMyApplications";
import OngoingTuitions from "../features/dashboard/tutor-dashboard/OngoingTuitions";
import TutorRevenueHistory from "../features/dashboard/tutor-dashboard/TutorRevenueHistory";
import ViewAllUser from "../features/dashboard/admin-dashboard/ViewAllUser";
import UpdateUser from "../features/dashboard/admin-dashboard/UpdateUser";
import ModifyRole from "../features/dashboard/admin-dashboard/ModifyRole";
import DeleteAccounts from "../features/dashboard/admin-dashboard/DeleteAccounts";
import ViewTotalEarnings from "../features/dashboard/admin-dashboard/ViewTotalEarnings";
import LatestTutors from "../pages/home/LatestTutors";
import AllTutor from "../pages/home/AllTutor";
import About from "../pages/home/About";
import Contact from "../pages/home/Contact";
import AllTuitions from "../pages/home/AllTuitions";
import UserManagement from "../features/dashboard/admin-dashboard/user-management/UserManagement";
import PendingApproval from "../features/dashboard/admin-dashboard/PendingApproval";
import TuitionDetails from "../pages/home/TuitionDetails";
import Payment from "../features/dashboard/payment/Payment";
import PaymentSuccess from "../features/dashboard/payment/PaymentSuccess";
import PaymentCancelled from "../features/dashboard/payment/PaymentCancelled";
import AllSuccessPayment from "../features/dashboard/payment/AllSuccessPayment";
import ErrorPage from "../ErrorPage";

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
        path: "/my-tuitions",
        element: (
          <PrivateRoute>
            <MyTuitions></MyTuitions>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-tuitions",
        element: <AllTuitions></AllTuitions>,
      },
      {
        path: "/all-tuition/:id",
        element: <TuitionDetails></TuitionDetails>,
      },
      {
        path: "/tutors",
        element: <AllTutor></AllTutor>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
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
            path: "my-tuitions",
            element: <MyTuitions />,
          },
          {
            path: "post-new-tuition",
            element: <PostNewTuition />,
          },
          {
            path: "applied-tutors",
            element: <AppliedTutors></AppliedTutors>,
          },
          {
            path: "applied-tutors/:tuitionId",
            element: <AppliedTutors></AppliedTutors>,
          },
          {
            path: "payments",
            element: <AllSuccessPayment></AllSuccessPayment>,
          },
          {
            path: "profile-settings",
            element: <ProfileSettings></ProfileSettings>,
          },
          {
            path: "payments/:paymentId",
            element: <Payment></Payment>,
          },
          {
            path: "payment-success",
            element: <PaymentSuccess></PaymentSuccess>,
          },
          {
            path: "payment-cancelled",
            element: <PaymentCancelled></PaymentCancelled>,
          },
        ],
      },

      // TUTOR DASHBOARD
      {
        path: "tutor",
        Component: TutorDashboardLayout,
        children: [
          {
            index: true,
            element: <TutorMyApplications />,
          },
          {
            path: "my-applications",
            element: <TutorMyApplications />,
          },
          {
            path: "ongoing-tuitions",
            element: <OngoingTuitions />,
          },
          {
            path: "tutor-revenue-history",
            element: <TutorRevenueHistory />,
          },
        ],
      },

      // ADMIN DASHBOARD
      {
        path: "admin", // /dashboard/admin
        Component: AdminDashboardLayout,
        children: [
          {
            index: true,
            element: <ViewAllUser></ViewAllUser>,
          },
          {
            path: "user-management",
            element: <UserManagement></UserManagement>,
          },
          {
            path: "pending-approval",
            element: <PendingApproval></PendingApproval>,
          },
          {
            path: "view-all-users",
            element: <ViewAllUser></ViewAllUser>,
          },
          {
            path: "update-user",
            element: <UpdateUser></UpdateUser>,
          },
          {
            path: "modify-role",
            element: <ModifyRole></ModifyRole>,
          },
          {
            path: "delete-accounts",
            element: <DeleteAccounts></DeleteAccounts>,
          },
          {
            path: "total-earning",
            element: <ViewTotalEarnings></ViewTotalEarnings>,
          },
        ],
      },

      // Optional: Default redirect or error page for /dashboard
      {
        path: "",
        // element: <RedirectToRoleDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
