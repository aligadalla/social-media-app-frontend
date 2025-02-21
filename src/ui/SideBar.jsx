import { NavLink } from "react-router-dom";
import { FaHome, FaComments } from "react-icons/fa";

export default function SideBar({ isSideBarOpen, setIsSidebarOpen }) {
  return (
    <>
      {/* Background blur below the header */}
      <div
        className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isSideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-md p-4 flex flex-col transition-transform duration-300 ease-in-out ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="text-xl font-semibold text-gray-800 mb-4">SideBar</p>

        <nav className="space-y-2">
          <NavLink
            to="/feed"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded transition"
          >
            <FaHome className="mr-3" /> Feed
          </NavLink>

          <NavLink
            to="/chat"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded transition"
          >
            <FaComments className="mr-3" /> Chat App
          </NavLink>
        </nav>
      </div>
    </>
  );
}