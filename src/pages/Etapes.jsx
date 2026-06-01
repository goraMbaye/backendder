import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function Etapes() {
  const { id } = useParams();
  const [etapes, setEtapes] = useState([]);

  useEffect(() => {
    fetchEtapes();
  }, [id]);

  const fetchEtapes = async () => {
    try {
      const res = await API.get("etapes/");

      const data = res.data.filter(
        (e) => String(e.chantier) === String(id)
      );

      setEtapes(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔄 update local state
  const handleChange = (idEtape, field, value) => {
    setEtapes((prev) =>
      prev.map((e) =>
        e.id === idEtape ? { ...e, [field]: value } : e
      )
    );
  };

  // 💾 save backend
  const saveEtape = async (idEtape, data) => {
    try {
      await API.patch(`etapes/${idEtape}/`, data);
    } catch (error) {
      console.error("Erreur update:", error);
    }
  };

  // 🎨 STATUS COLORS
  const getStatusStyle = (statut) => {
    switch (statut) {
      case "termine":
        return "bg-green-100 text-green-700 border-green-300";
      case "encours":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "retard":
        return "bg-red-100 text-red-700 border-red-300";
      case "prevu":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        Étapes du chantier #{id}
      </h1>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          {/* HEADER TABLE */}
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Étape</th>
              <th className="p-4">Date prévue</th>
              <th className="p-4">Date réelle</th>
              <th className="p-4">Statut</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {etapes.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Aucune étape trouvée
                </td>
              </tr>
            ) : (
              etapes.map((e, index) => (
                <tr
                  key={e.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* INDEX */}
                  <td className="p-4 font-semibold">
                    {index + 1}
                  </td>

                  {/* NOM */}
                  <td className="p-4 font-medium">
                    {e.nom}
                  </td>

                  {/* DATE PREVUE */}
                  <td className="p-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {e.date_prevue || "—"}
                    </span>
                  </td>

                  {/* DATE REELLE (EDITABLE) */}
                  <td className="p-4">
                    <input
                      type="date"
                      value={e.date_reelle || ""}
                      onChange={(ev) =>
                        handleChange(e.id, "date_reelle", ev.target.value)
                      }
                      onBlur={() =>
                        saveEtape(e.id, {
                          date_reelle: e.date_reelle,
                        })
                      }
                      className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>

                  {/* STATUT */}
                  <td className="p-4">
                    <select
                      value={e.statut}
                      onChange={(ev) => {
                        handleChange(e.id, "statut", ev.target.value);
                        saveEtape(e.id, {
                          statut: ev.target.value,
                        });
                      }}
                      className={`border p-2 rounded-lg ${getStatusStyle(
                        e.statut
                      )}`}
                    >

                      <option value="prevu">Prévu</option>
                      <option value="encours">En cours</option>
                      <option value="termine">Terminé</option>
                      <option value="retard">Retard</option>

                    </select>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}