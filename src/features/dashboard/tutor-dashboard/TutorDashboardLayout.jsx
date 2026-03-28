import React from "react";
import Footer from "../../../components/reusable/Footer";
import { Link, Outlet, useNavigate } from "react-router";
import { BookOpen, BookOpenCheck, Home, Settings, LogOut, User } from "lucide-react";
import UseRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/UseAuth";
import { IoTrendingUpOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function TutorDashboardLayout() {
  const { role } = UseRole();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      confirmButtonColor: "#03373d",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            navigate("/");
            Swal.fire("Logged Out!", "See you soon!", "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Navbar */}
          <nav className="navbar w-full bg-gray-200 sticky top-0 z-30 px-4 md:px-8">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-6"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            
            <div className="flex justify-between w-full items-center">
              <div className="px-4 font-bold">Tutor Dashboard</div>

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border border-primary mr-4"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User"
                      src={
                        user?.photoURL ||
                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-gray-200"
                >
                  <li className="menu-title text-black font-bold">
                    {user?.displayName || "Tutor User"}
                  </li>
                  <li>
                    <Link to="/dashboard/tutor/profile-settings">
                      <User size={16} /> Profile Settings
                    </Link>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 font-bold cursor-pointer"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Page content here */}
          <div className="flex-grow p-4">
            <Outlet />
          </div>
          <Footer />
        </div>

        {/* Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible z-20">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300">
            <ul className="menu w-full grow gap-10 pt-20">
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <Home size={22} />
                  <span className="is-drawer-close:hidden font-medium">Homepage</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/tutor/my-applications"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Applications"
                >
                  <BookOpen size={22} />
                  <span className="is-drawer-close:hidden font-medium">My Applications</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/tutor/ongoing-tuitions"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Tutor Ongoing Tuitions"
                >
                  <BookOpenCheck size={22} />
                  <span className="is-drawer-close:hidden font-medium">
                    Ongoing Tuitions
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/tutor/tutor-revenue-history"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Revenue History"
                >
                  <IoTrendingUpOutline size={22} />
                  <span className="is-drawer-close:hidden font-medium">
                    Revenue History
                  </span>
                </Link>
              </li>

              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  <Settings size={22} />
                  <span className="is-drawer-close:hidden font-medium">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}