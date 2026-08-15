import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Car, Menu, X, User, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLink =
  "text-sm transition-colors hover:text-white text-inkDim [&.active]:text-white";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-amber">
            <Car size={18} color="#0E1117" strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">DRVN</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/cars" className={({ isActive }) => `${navLink} ${isActive ? "active" : ""}`}>
            Fleet
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${navLink} ${isActive ? "active" : ""}`}>
            How it works
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${navLink} ${isActive ? "active" : ""}`}>
            Support
          </NavLink>
          {user && (
            <NavLink to="/my-rentals" className={({ isActive }) => `${navLink} ${isActive ? "active" : ""}`}>
              My rentals
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={({ isActive }) => `${navLink} ${isActive ? "active" : ""}`}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          {user ? (
            <>
              <span className="flex items-center gap-1.5 text-xs text-inkDim">
                <User size={13} /> {user.name}
              </span>
              <button onClick={handleLogout} className="btn-secondary !px-4 !py-2 text-xs">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-inkDim hover:text-white">
                Sign in
              </Link>
              <Link to="/register" className="btn-primary !px-4 !py-2 text-xs">
                Get started
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/cars" onClick={() => setOpen(false)} className={navLink}>Fleet</Link>
            <Link to="/about" onClick={() => setOpen(false)} className={navLink}>How it works</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className={navLink}>Support</Link>
            {user && (
              <Link to="/my-rentals" onClick={() => setOpen(false)} className={navLink}>
                My rentals
              </Link>
            )}
            {user?.role === "admin" && (
              <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-sm text-amber">
                <LayoutDashboard size={14} /> Admin dashboard
              </Link>
            )}
            <div className="mt-2 flex items-center gap-3 border-t border-line pt-4">
              {user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="btn-secondary w-full !py-2 text-xs"
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary flex-1 !py-2 text-xs">
                    Sign in
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1 !py-2 text-xs">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
