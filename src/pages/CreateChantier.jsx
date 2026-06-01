import { useEffect, useState } from "react";
import API from "../api/api";

export default function Chantiers() {
  const [chantiers, setChantiers] = useState([]);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    nom: "",
    lieu: "",
    date_debut: "",
    date_fin_prevue: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("chantiers/");
    setChantiers(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createChantier = async (e) => {
    e.preventDefault();

    try {
      await API.post("chantiers/", form);

      setForm({
        nom: "",
        lieu: "",
        date_debut: "",
        date_fin_prevue: "",
      });

      setOpen(false);
      fetchData();

    } catch (err) {
      console.log(err.response?.data);
      alert("Erreur création chantier");
    }
  };

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Chantiers</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Nouveau chantier
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Nom</th>
              <th className="p-4 text-left">Lieu</th>
            </tr>
          </thead>

          <tbody>
            {chantiers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-4">{c.nom}</td>
                <td className="p-4">{c.lieu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================== */}
      {/* 🔥 MODAL POPUP */}
      {/* ===================== */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-bold mb-4">
              Nouveau chantier
            </h2>

            <form onSubmit={createChantier} className="space-y-4">

              <input
                name="nom"
                placeholder="Nom chantier"
                value={form.nom}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                name="lieu"
                placeholder="Lieu"
                value={form.lieu}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="date"
                name="date_debut"
                value={form.date_debut}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="date"
                name="date_fin_prevue"
                value={form.date_fin_prevue}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Créer
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}