import React from "react";
import Footer from "../../../components/reusable/Footer";
import { Link, Outlet } from "react-router";
import { Book, BookOpen, BookPlus, DollarSign, Home, Settings, UserRoundCog } from "lucide-react";
import UseRole from "../../../hooks/useRole";

export default function TutorDashboardLayout() {
    const { role } = UseRole();
  return (
    <div>
      <div className="">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Navbar */}
            <nav className="navbar w-full bg-gray-200">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <div className="px-4">Tutor Dashboard</div>
            </nav>
            {/* Page content here */}
            <Outlet></Outlet>
            <Footer></Footer>
          </div>

          <div className="drawer-side is-drawer-close:overflow-visible">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-15 is-drawer-open:w-64">
              {/* Sidebar content here */}
              <ul className="menu w-full grow gap-10">
                {/* List item */}
                <li>
                  <Link
                    to="/"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Homepage"
                  >
                    {/* Home icon */}
                    <Home></Home>
                    <span className="is-drawer-close:hidden">Homepage</span>
                  </Link>
                </li>

                {/* ********** our dashboard link start here *********** */}
                <li>
                  {/* my tuitions */}
                  <Link
                    to="/dashboard/student/my-tuitions"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Tuitions"
                  >
                    <BookOpen />
                    <span className="is-drawer-close:hidden">My Tuitions</span>
                  </Link>
                </li>

                <li>
                  {/* post new tuition */}
                  <Link
                    to="/dashboard/student/post-new-tuition"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Post New Tuition"
                  >
                    <BookPlus />
                    <span className="is-drawer-close:hidden">
                      Post New Tuition
                    </span>
                  </Link>
                </li>

                <li>
                  {/* Applied Tutors */}
                  <Link
                    to="/dashboard/student/applied-tutors"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Applied Tutors"
                  >
                    <BookPlus />
                    <span className="is-drawer-close:hidden">
                      Applied Tutors
                    </span>
                  </Link>
                </li>

                <li>
                  {/* Payments */}
                  <Link
                    to="/dashboard/student/payments"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payments"
                  >
                    <DollarSign></DollarSign>
                    <span className="is-drawer-close:hidden">Payments</span>
                  </Link>
                </li>

                <li>
                  {/* Profile Settings */}
                  <Link
                    to="/dashboard/student/profile-settings"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Profile Settings"
                  >
                    <UserRoundCog />
                    <span className="is-drawer-close:hidden">
                      Profile Settings
                    </span>
                  </Link>
                </li>

                {role === "admin" && (
                  <>
                    {/* approve rider menu add in dashboard */}
                    <li>
                      <Link
                        to="approve-rider"
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Apporve Rider"
                      >
                        <RiEBike2Fill />
                        <span className="is-drawer-close:hidden">
                          Apporve Rider
                        </span>
                      </Link>
                    </li>
                    {/* Users management menu add in dashboard */}
                    <li>
                      <Link
                        to="users-management"
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Users Manegement"
                      >
                        <FaUser />
                        <span className="is-drawer-close:hidden">Users</span>
                      </Link>
                    </li>
                  </>
                )}

                {/* List item */}
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    {/* Settings icon */}
                    <Settings></Settings>
                    <span className="is-drawer-close:hidden">Settings</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
