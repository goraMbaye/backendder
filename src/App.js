import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chantiers from "./pages/Chantiers";
import Etapes from "./pages/Etapes";
import CreateChantier from "./pages/CreateChantier";

// Layout + sécurité
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ===================== */}
        {/* 🔓 LOGIN */}
        {/* ===================== */}
        <Route path="/" element={<Login />} />

        {/* ===================== */}
        {/* 🔐 PROTECTED AREA */}
        {/* ===================== */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* CHANTIERS */}
          <Route path="/chantiers" element={<Chantiers />} />

          {/* ➕ CREATE CHANTIER */}
          <Route path="/chantiers/create" element={<CreateChantier />} />

          {/* ÉTAPES */}
          <Route path="/etapes/:id" element={<Etapes />} />

        </Route>

        {/* ===================== */}
        {/* ❌ REDIRECTION PROPRE */}
        {/* ===================== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;