import React from "react";
import { Link, Outlet } from "react-router";
import Footer from "../../../components/reusable/Footer";
import { FaUsers } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa6";
import { FaLayerGroup } from "react-icons/fa";
import {
  Book,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  BookPlus,
  DollarSign,
  Home,
  Landmark,
  Settings,
  UserPen,
  UserRound,
  UserRoundCog,
  UserRoundMinus,
  UsersRound,
} from "lucide-react";
import UseRole from "../../../hooks/useRole";

export default function AdminDashboardLayout() {
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
                <Link
                  to="/dashboard/admin/user-management"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Users Management"
                >
                  <FaUsers className="text-2xl"></FaUsers>
                  <span className="is-drawer-close:hidden">
                    Users Management
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/admin/tuition-management"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Tuition Management"
                >
                  <FaLayerGroup className="text-2xl"></FaLayerGroup>
                  <span className="is-drawer-close:hidden">
                    Tuition Management
                  </span>
                </Link>
              </li>

              <li>
                {/* Total Earnings */}
                <Link
                  to="/dashboard/admin/total-earning"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Total Earnings"
                >
                  <Landmark />
                  <span className="is-drawer-close:hidden">Total Earnings</span>
                </Link>
              </li>

              {role === "admin" && (
                <>
                  {/* approve */}
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
  );
}
