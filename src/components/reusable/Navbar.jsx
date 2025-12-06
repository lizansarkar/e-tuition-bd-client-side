import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import UseAuth from "../../hooks/UseAuth";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logOut } = UseAuth();

  // Mobile Menu bondho korar jonyo ekta common function
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Logout handle function
  const handleLogout = async () => {
    try {
      await logOut();
      closeMobileMenu(); // Logout er por mobile menu bondho
      console.log("User successfully logged out!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Profile Avatar er jonyo common styles
  const profileBorderColor = "border-primary"; // Primary color use kora holo (#CAEB66)

  // Navigation Links (Dashboard links user login thakle dekhabe)
  const navLinks = (
    <>
      <li>
        <NavLink to="/" onClick={closeMobileMenu}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/tuitions" onClick={closeMobileMenu}>
          Tuitions
        </NavLink>
      </li>
      <li>
        <NavLink to="/tutors" onClick={closeMobileMenu}>
          Tutors
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" onClick={closeMobileMenu}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" onClick={closeMobileMenu}>
          Contact
        </NavLink>
      </li>

      {/* Conditional Links for Logged-in users */}
      {user && (
        <>
          <li>
            <NavLink to="/dashboard" onClick={closeMobileMenu} className="font-semibold text-primary">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  // === DEXTOP Auth Action Buttons (Dropdown/Login/Register) ===
  const DesktopAuthActions = () => {
    if (user) {
      return (
        <div className="dropdown dropdown-end">
          {/* Avatar Button */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar p-0"
          >
            <div
              className={`w-10 rounded-full border-2 ${profileBorderColor} overflow-hidden transition-all`}
            >
              <img
                alt={user.displayName || "User Profile"}
                src={
                  user.photoURL || "https://i.ibb.co/Ld1111S/default-user.png"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="font-semibold text-gray-800 dark:text-gray-200 pointer-events-none">
                {user.displayName || "User"}
              </a>
            </li>
            <li><NavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</NavLink></li>
            <li><NavLink to="/profile" onClick={closeMobileMenu}>Profile Settings</NavLink></li>
            <li>
              <button onClick={handleLogout} className="text-red-600 font-semibold">
                Logout
              </button>
            </li>
          </ul>
        </div>
      );
    }

    // Logged Out
    return (
      <div className="flex gap-2">
        <NavLink to="/login" className="btn btn-sm btn-primary">
          Login
        </NavLink>
        <NavLink to="/register" className="btn btn-sm btn-outline">
          Register
        </NavLink>
      </div>
    );
  };
  
  // === Loading State Management ===
  if (loading) {
    return (
      <div className="sticky top-0 z-50 bg-base-100 shadow-lg flex justify-center items-center h-16">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // === Main Return (Navbar Structure) ===
  return (
    <div className="sticky top-0 z-50 bg-base-200 shadow-sm">
      <div className="navbar container mx-auto p-4 sm:p-4">
        {/* Left side: Logo and Mobile Menu */}
        <div className="navbar-start">
          
          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost p-1"
            >
              {mobileMenuOpen ? (
                // Close Icon (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold ml-2 sm:ml-0">
            <span className="text-primary">e</span>TuitionBD
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2 px-1 text-base font-medium">
            {navLinks}
          </ul>
        </div>

        {/* Right side: User/Auth Buttons */}
        <div className="navbar-end flex items-center gap-3">
          {/* Desktop Auth Actions */}
          <div className="hidden md:flex">
             <DesktopAuthActions />
          </div>

          {/* Mobile: User Avatar (Right side) if logged in */}
          {user && (
            <div className="md:hidden w-8 h-8 rounded-full border-2 border-primary overflow-hidden">
              <img
                alt={user.displayName || "User Profile"}
                src={
                  user.photoURL || "https://i.ibb.co/Ld1111S/default-user.png"
                }
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* === মোবাইল মেনু (ড্রপডাউন - Transition-less) === */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-base-100 border-t border-gray-100 z-40 shadow-xl pb-4">
          <ul className="menu menu-vertical p-4 space-y-1">
            {navLinks}
            
            {/* মোবাইল: Auth Actions (Conditional - Profile/Logout or Sign In/Sign Up) */}
            <div className="pt-4 mt-2 space-y-2 border-t border-gray-200">
              {user ? (
                // LOGGED IN: Profile and Logout Buttons
                <>
                  <NavLink
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="block w-full text-center px-4 py-2 bg-primary text-gray-900 font-medium rounded-lg hover:opacity-90 transition-all"
                  >
                    Hello, {user.displayName || "User"} (Profile)
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-4 py-2 text-red-600 font-semibold border border-red-500 rounded-lg hover:bg-red-50 transition-all"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                // LOGGED OUT: Sign In and Register Buttons
                <>
                  <NavLink
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block w-full text-center px-4 py-2 bg-primary text-gray-900 font-semibold rounded-lg shadow-md hover:opacity-90"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;