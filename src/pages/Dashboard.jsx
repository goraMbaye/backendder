import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Dashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    chantiers: 0,
    termine: 0,
    encours: 0,
    retard: 0,
  });

  const [chartData, setChartData] = useState([]);

  const [lineData, setLineData] = useState([]);

  const COLORS = [
    "#16a34a",
    "#f97316",
    "#dc2626",
  ];

  useEffect(() => {

    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/");
      return;
    }

    fetchStats();

  }, []);

  const logout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
  };

  const fetchStats = async () => {

    try {

      setLoading(true);

      const chantierResponse =
        await API.get("chantiers/");

      const etapeResponse =
        await API.get("etapes/");

      const chantiers =
        chantierResponse.data;

      const etapes =
        etapeResponse.data;

      const termine =
        etapes.filter(
          (e) => e.statut === "termine"
        ).length;

      const encours =
        etapes.filter(
          (e) => e.statut === "encours"
        ).length;

      const retard =
        etapes.filter(
          (e) => e.statut === "retard"
        ).length;

      setStats({
        chantiers: chantiers.length,
        termine,
        encours,
        retard,
      });

      setChartData([
        {
          name: "Terminées",
          value: termine,
        },
        {
          name: "En cours",
          value: encours,
        },
        {
          name: "Retards",
          value: retard,
        },
      ]);

      setLineData([
        { mois: "Jan", evolution: 5 },
        { mois: "Fév", evolution: 8 },
        { mois: "Mars", evolution: 12 },
        { mois: "Avr", evolution: 16 },
        { mois: "Mai", evolution: 20 },
        { mois: "Juin", evolution: 25 },
      ]);

    } catch (error) {

      console.error(error);

      if (error.response?.status === 401) {
        logout();
      }

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">
          Chargement...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-blue-600">
          Dashboard Chantier
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Déconnexion
        </button>

      </div>

      <div className="p-8">

        {/* KPI */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Chantiers
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-4">
              {stats.chantiers}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Étapes terminées
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-4">
              {stats.termine}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              En cours
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-4">
              {stats.encours}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Retards
            </h2>

            <p className="text-5xl font-bold text-red-500 mt-4">
              {stats.retard}
            </p>
          </div>

        </div>

        {/* BAR + PIE */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              État des travaux
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="value">

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Répartition des travaux
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* EVOLUTION */}

        <div className="bg-white p-6 rounded-2xl shadow mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Évolution du chantier
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <LineChart data={lineData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="mois" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="evolution"
                stroke="#2563eb"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}