import React from "react";
import Footer from "../../../components/reusable/Footer";
import { Link, Outlet } from "react-router";
import { BookOpen, BookOpenCheck, Home, Settings } from "lucide-react";
import UseRole from "../../../hooks/useRole";
import { IoTrendingUpOutline } from "react-icons/io5";

export default function TutorDashboardLayout() {
    const { role } = UseRole();
  return (
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
                  {/* My Applications */}
                  <Link
                    to="/dashboard/tutor/my-applications"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Applications"
                  >
                    <BookOpen />
                    <span className="is-drawer-close:hidden">My Applications</span>
                  </Link>
                </li>

                <li>
                  {/* Tutor Ongoing Tuitions */}
                  <Link
                    to="/dashboard/tutor/ongoing-tuitions"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Tutor Ongoing Tuitions"
                  >
                    <BookOpenCheck />
                    <span className="is-drawer-close:hidden">
                      Tutor Ongoing Tuitions
                    </span>
                  </Link>
                </li>

                <li>
                  {/* Applied Tutors */}
                  <Link
                    to="/dashboard/tutor/tutor-revenue-history"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Revenue History"
                  >
                    <IoTrendingUpOutline className="text-2xl"/>
                    <span className="is-drawer-close:hidden">
                      Revenue History
                    </span>
                  </Link>
                </li>
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
  );
}
