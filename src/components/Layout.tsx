import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { theme } = useTheme();
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
