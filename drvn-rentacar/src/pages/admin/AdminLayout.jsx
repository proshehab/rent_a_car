import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Car, MapPin, CalendarCheck } from "lucide-react";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/cars", label: "Cars", icon: Car },
  { to: "/admin/locations", label: "Locations", icon: MapPin },
  { to: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
];

export default function AdminLayout() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[220px_1fr]">
      <aside>
        <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
          Admin
        </span>
        <nav className="mt-4 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-amber/10 text-amber"
                    : "text-inkDim hover:bg-surface2 hover:text-white"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
