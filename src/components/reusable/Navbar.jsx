import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logoPath from "../../assets/logo.png";
import Loading from "../ui/Loading";
import useAuth from "../../hooks/UseAuth";
import UseRole from "../../hooks/useRole";
import { User, Settings, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  const { role } = UseRole();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    closeMobileMenu();
    let path = "/dashboard";
    if (role === "admin") path = "/dashboard/admin";
    else if (role === "tutor") path = "/dashboard/tutor";
    else if (role === "student") path = "/dashboard/student";
    navigate(path);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileProfileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      closeMobileMenu();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navLinks = (
    <>
      {["Home", "All Tuitions", "All Tutor", "Blogs", "About", "Contact"].map((item) => (
        <li key={item} className="list-none">
          <NavLink
            to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
            onClick={closeMobileMenu}
            className={({ isActive }) => 
              `block px-4 py-2 text-sm lg:text-base transition-all duration-300 bg-transparent hover:bg-transparent focus:bg-transparent ${isActive ? "active text-primary font-bold" : "text-gray-700 dark:text-gray-200"}`
            }
          >
            <span className="nav-underlined">{item}</span>
          </NavLink>
        </li>
      ))}

      {user && role && (
        <li onClick={handleDashboardClick} className="list-none font-bold cursor-pointer flex">
          <span className="px-4 py-2 text-primary hover:scale-105 transition-transform flex items-center gap-1">
            <LayoutDashboard size={18} /> Dashboard
          </span>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-md border-b border-base-300">
      <div className="navbar container mx-auto px-4 py-2">
        
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="btn btn-ghost btn-circle">
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
          <Link to="/" className="flex items-center transition-transform hover:scale-105 ml-2 md:ml-0">
            <img className="h-10 sm:h-12 w-auto object-contain" src={logoPath} alt="eTuitionBD Logo" />
          </Link>
        </div>

        {/* Navbar Center (Desktop) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1 px-1 font-medium bg-transparent">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-2">
          {loading ? <span className="loading loading-dots loading-sm text-primary"></span> : (
            user ? (
              <div className="dropdown dropdown-end hidden md:block">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary overflow-hidden">
                  <img src={user?.photoURL || "https://i.ibb.co/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg"} alt="User" />
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-56 border border-base-200">
                  <li className="menu-title text-primary font-bold">{user.displayName}</li>
                  <li><NavLink to="/profile-settings" className="flex items-center gap-2"><Settings size={16}/> Settings</NavLink></li>
                  <div className="divider my-1"></div>
                  <li><button onClick={handleLogout} className="text-red-500 font-bold flex items-center gap-2"><LogOut size={16}/> Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link to="/login" className="btn btn-sm btn-ghost hover:text-primary">Login</Link>
                <Link to="/register" className="btn btn-sm btn-primary px-6 rounded-full shadow-lg">Register</Link>
              </div>
            )
          )}
          
          {user && (
            <div className="md:hidden border-2 border-primary rounded-full p-0.5 cursor-pointer" onClick={() => setMobileProfileOpen(!mobileProfileOpen)}>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={user.photoURL || "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg"} className="w-full h-full object-cover" alt="Profile" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- MOBILE DRAWER MENU (BLUR ADDED) --- */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-base-100/90 backdrop-blur-xl z-[60] shadow-2xl transition-transform duration-300 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden border-r border-base-300`}>
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-3">
            <img className="h-10 w-auto" src={logoPath} alt="Logo" />
            <button onClick={closeMobileMenu} className="btn btn-sm btn-circle btn-ghost"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <ul className="menu menu-vertical pb-10 space-y-2 flex-1 bg-[#fffffff3] w-full">
            {navLinks}
          </ul>
        </div>
      </div>

      {/* --- MOBILE PROFILE DROPDOWN (BLUR ADDED) --- */}
      <div className={`fixed inset-x-4 top-20 bg-base-100/95 backdrop-blur-lg z-[60] rounded-2xl shadow-2xl p-4 border border-base-300 transition-all duration-300 md:hidden ${mobileProfileOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-5"}`}>
         <div className="flex items-center gap-3 mb-4 p-2 bg-primary/10 rounded-xl">
            <img className="w-12 h-12 rounded-full border-2 border-primary" src={user?.photoURL} alt="User" />
            <div>
              <p className="font-bold text-base-content">{user?.displayName}</p>
              <p className="text-xs text-gray-500 truncate w-40">{user?.email}</p>
            </div>
         </div>
         <ul className="space-y-1">
            <li><Link to="/profile-settings" onClick={closeMobileMenu} className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-colors"><Settings size={18}/> Profile Settings</Link></li>
            <li><button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 w-full rounded-lg font-semibold transition-colors"><LogOut size={18}/> Sign Out</button></li>
         </ul>
      </div>

      {/* Overlay */}
      {(mobileMenuOpen || mobileProfileOpen) && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[55] md:hidden transition-opacity" onClick={closeMobileMenu} />
      )}
    </div>
  );
};

export default Navbar;