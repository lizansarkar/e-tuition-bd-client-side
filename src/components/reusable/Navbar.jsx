import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import logoPath from "../../assets/logo.png";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logOut } = UseAuth();

  // Mobile Menu bondho korar jonyo ekta common function
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Logout handle function
  const handleLogout = async () => {
    try {
      await logOut();
      closeMobileMenu();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Profile Avatar er jonyo common styles
  const profileBorderColor = "border-primary";

  // Navigation Links
  const navLinks = (
    <>
      <li>
        <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/my-tuitions" onClick={closeMobileMenu}>My Tuitions</NavLink>
      </li>
      <li>
        <NavLink to="/all-tuitions" onClick={closeMobileMenu}>All Tuitions</NavLink>
      </li>
      <li>
        <NavLink to="/tutors" onClick={closeMobileMenu}>Tutors</NavLink>
      </li>
      <li>
        <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
      </li>
      <li>
        <NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink>
      </li>

      {/* Conditional Dashboard Link (Mobile-e eta Navigation Menu-r ekta part) */}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            onClick={closeMobileMenu}
            className="font-semibold text-primary"
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  // === DEXTOP Auth Action Buttons (Hover Logic - No Change Needed) ===
  const DesktopAuthActions = () => {
    if (user) {
      const [isHoverOpen, setIsHoverOpen] = useState(false);

      return (
        // Desktop Hover Logic
        <div
          className="relative"
          onMouseEnter={() => setIsHoverOpen(true)}
          onMouseLeave={() => setIsHoverOpen(false)}
        >
          {/* Avatar Button */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar p-0 cursor-pointer"
          >
            <div
              className={`w-10 rounded-full border-2 ${profileBorderColor} overflow-hidden transition-all`}
            >
              <img
                alt={user.displayName || "User Profile"}
                src={
                  user.photoURL || "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Dropdown Menu (Conditional Rendering for Hover) */}
          <ul
            className={`
              menu menu-sm absolute right-0 top-full mt-3 z-[50] p-2 shadow 
              bg-base-100 rounded-box w-52 transform transition-all duration-200 
              ${
                isHoverOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2"
              }
            `}
          >
            <li>
              <a className="font-semibold text-gray-800 dark:text-gray-200 pointer-events-none">
                {user.displayName || "User"}
              </a>
            </li>
            {/* Desktop dropdown-e shudhu Profile/Settings/Logout thakuk, Dashboard uporei ache */}
            <li>
              <NavLink to="/profile" onClick={closeMobileMenu}>
                Profile Settings
              </NavLink>
            </li>
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
        <NavLink to="/login" className="btn btn-sm btn-primary">Login</NavLink>
        <NavLink to="/register" className="btn btn-sm btn-outline">Register</NavLink>
      </div>
    );
  };

  // === Loading State Management ===
  if (loading) {
    // ... (Loading state code)
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
          
          {/* Mobile Menu Button (Hamburger/Close Icon) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost p-1"
            >
              {mobileMenuOpen ? (
                // Close Icon (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold ml-2 sm:ml-0">
            <img
              className="h-[50px] w-[200px]"
              src={logoPath}
              alt="eTuitionBD Logo"
            />
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

          {user ? (
            <div 
                className={`md:hidden w-8 h-8 rounded-full border-2 ${profileBorderColor} overflow-hidden cursor-pointer`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // <<< MOBILE CLICK LOGIC
            >
              <img
                alt={user.displayName || "User Profile"}
                src={
                  user.photoURL || "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg"
                }
                className="w-full h-full object-cover"
              />
            </div>
          ) : ( // User log in na thakle (Mobile-e Sign In button)
            <div className="md:hidden">
                <NavLink to="/login" onClick={closeMobileMenu} className="btn btn-sm btn-primary">
                    Login
                </NavLink>
            </div>
          )}
        </div>
      </div>

      <div 
        className={`
          md:hidden fixed top-0 left-0 w-64 h-full bg-base-100 z-50 shadow-2xl transform 
          transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        // Menu open hole background-e click korle bondho korar jonyo
        onClick={() => setMobileMenuOpen(false)} 
      >
        <div className="p-4 flex flex-col h-full overflow-y-auto">
          
          {/* Top Bar: Close Button and Logo */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <Link to="/" className="text-2xl font-extrabold" onClick={closeMobileMenu}>
                <img
                    className="h-[50px] w-auto"
                    src={logoPath}
                    alt="eTuitionBD Logo"
                />
            </Link>
            <button
                onClick={closeMobileMenu}
                className="btn btn-ghost p-1"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
          </div>
          
          <ul className="menu menu-vertical p-0 space-y-1 flex-1 pt-4">
            {navLinks}
          </ul>

          {/* 🚩 MOBILE USER PROFILE AND LOGOUT SECTION (Shudhu User thakle dekhabe) */}
          {user ? (
            <div className="pt-4 mt-4 space-y-3 border-t border-gray-200">
              
              {/* Profile Details Button (Apnar dewa chobir moto) */}
              <NavLink
                to="/profile"
                onClick={closeMobileMenu}
                className="block w-full text-center px-4 py-2 bg-secondary text-white font-medium rounded-lg hover:opacity-90 transition-all shadow-md"
              >
                Hello, {user.displayName || "User"} (Profile)
              </NavLink>

              {/* Log Out Button */}
              <button
                onClick={handleLogout}
                className="block w-full text-center px-4 py-2 text-red-600 font-semibold border border-red-500 rounded-lg hover:bg-red-50 transition-all"
              >
                Log Out
              </button>
              
            </div>
          ) : (
            // User logged out thakle ekhane Login/Register button dekhte parbe
            <div className="pt-4 mt-4 space-y-3 border-t border-gray-200">
                <NavLink to="/login" onClick={closeMobileMenu} className="btn btn-sm btn-primary w-full">
                    Login
                </NavLink>
                <NavLink to="/register" onClick={closeMobileMenu} className="btn btn-sm btn-outline w-full">
                    Register
                </NavLink>
            </div>
          )}
        </div>
      </div>
      
      {/* Optional: Overlay (Menu open thakle background dim korar jonyo) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}
    </div>
  );
};

export default Navbar;