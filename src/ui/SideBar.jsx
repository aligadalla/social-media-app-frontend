import { NavLink } from "react-router-dom";

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

        <nav>
          <NavLink
            to="/feed"
            onClick={() => setIsSidebarOpen(false)}
            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded transition"
          >
            Feed
          </NavLink>
        </nav>

        <nav>
          <NavLink
            to="/chat"
            onClick={() => setIsSidebarOpen(false)}
            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded transition"
          >
            Chat App
          </NavLink>
        </nav>
      </div>
    </>
  );
}