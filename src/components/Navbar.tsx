import { LogIn, LogOut, Package, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, signIn, signOut } = useAuth();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost">
          <div className="text-primary flex items-center space-x-2">
            <Package className="h-8 w-8 text-accent-color" />
            <h1 className="text-3xl font-bold">Binventory</h1>
          </div>
        </Link>
      </div>
      {user && (
        <div className="navbar-center hidden md:block">
          <Link to="/add" className="btn btn-primary">
            <Plus className="mr-2 h-5 w-5" />
            Add Bin
          </Link>
        </div>
      )}
      <div className="navbar-end">
        {user && (
          <div className="mx-4 md:hidden">
            <Link to="/add" className="btn btn-primary">
              <Plus className="h-5 w-5" />
            </Link>
          </div>
        )}
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-circle">
                <Avatar
                  name={user.displayName ?? undefined}
                  image={user.photoURL ?? undefined}
                />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 justify-start p-2 shadow"
              >
                <li>
                  <ThemeToggle />
                </li>
                <li>
                  <a onClick={signOut} className="">
                    <LogOut size={12} />
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button className="btn btn-ghost" onClick={signIn}>
            <LogIn size={12} /> Sign In
          </button>
        )}
      </div>
    </div>
  );
}
