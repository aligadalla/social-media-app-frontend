import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function AppLayout() {
    return (
        <>
        <Header/>
        <SideBar/>
        <Outlet/>
        </>
    )
}