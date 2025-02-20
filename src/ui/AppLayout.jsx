import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function AppLayout() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <div className="relative">
        <SideBar isSideBarOpen={isSideBarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
}