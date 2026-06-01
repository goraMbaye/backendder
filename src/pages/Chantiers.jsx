import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Chantiers() {

  const [chantiers, setChantiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("chantiers/");
      setChantiers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          🏗️ Chantiers
        </h1>

        <Link
          to="/chantiers/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          + Nouveau chantier
        </Link>

      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center text-gray-500">
          Chargement...
        </div>
      ) : chantiers.length === 0 ? (
        <div className="text-center text-gray-500">
          Aucun chantier disponible
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {chantiers.map((c) => (

            <div
              key={c.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 border border-gray-100"
            >

              {/* TITLE */}
              <h2 className="text-xl font-bold text-gray-800">
                {c.nom}
              </h2>

              {/* LOCATION */}
              <p className="text-gray-500 mt-1">
                📍 {c.lieu}
              </p>

              {/* DATES */}
              <div className="mt-4 text-sm text-gray-600 space-y-1">

                <p>
                  📅 Début : {c.date_debut}
                </p>

                <p>
                  📆 Fin prévue : {c.date_fin_prevue}
                </p>

              </div>

              {/* BADGE SIMPLE (optionnel statique) */}
              <div className="mt-4">

                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  Actif
                </span>

              </div>

              {/* ACTION */}
              <div className="mt-5">

                <Link
                  to={`/etapes/${c.id}`}
                  className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  Voir les étapes
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}