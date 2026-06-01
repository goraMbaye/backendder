import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  FileBarChart2,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 bg-blue-600 p-3 rounded-lg"
      : "flex items-center gap-3 hover:bg-blue-600 p-3 rounded-lg";

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        Suivi Chantier
      </h1>

      <nav className="space-y-4">

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/chantiers" className={linkClass}>
          <Building2 size={20} />
          Chantiers
        </NavLink>

        <NavLink to="/etapes" className={linkClass}>
          <ClipboardList size={20} />
          Étapes
        </NavLink>

        <NavLink to="/rapports" className={linkClass}>
          <FileBarChart2 size={20} />
          Rapports
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Paramètres
        </NavLink>

      </nav>

    </div>
  );
}