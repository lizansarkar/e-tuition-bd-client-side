import React from "react";
import { NavLink, Outlet } from "react-router";
import Footer from "../components/reusable/Footer";
import logoPath from "../assets/logo.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center p-4 sm:p-8">
      <header className="py-6 w-full max-w-7xl px-4 sm:px-6">
        <div className="flex justify-center">
          <NavLink to="/" className="inline-flex items-center">
            <img
              src={logoPath}
              alt="eTuitionBD Logo"
              className="h-10 w-auto sm:h-12 object-contain transition-all duration-300"
            />
          </NavLink>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center w-full max-w-full">
        <div className="w-full max-w-md">
          <div
            className="py-10"
          >
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer / Extra Space if needed */}
      <Footer></Footer>
    </div>
  );
}
