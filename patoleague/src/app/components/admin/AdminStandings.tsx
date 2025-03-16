"use client";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import PlButton from "@/app/components/button/button";
import PlModal from "@/app/components/modal/PlModal";

export default function AdminStandings() {
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingStanding, setEditingStanding] = useState(null);
  const [editData, setEditData] = useState({
    points: 0,
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    pointsDifference: 0,
  });

  useEffect(() => {
    fetchStandings();
  }, []);

  async function fetchStandings() {
    try {
      const response = await api.get("/standings");
      const groupedStandings = response.data.reduce((acc, standing) => {
        const { championship } = standing;
        if (!acc[championship.id]) acc[championship.id] = { name: championship.name, standings: [] };
        acc[championship.id].standings.push(standing);
        return acc;
      }, {});
      setStandings(groupedStandings);
    } catch (err) {
      setError("Erro ao carregar standings");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStanding() {
    if (!editingStanding) return;
    try {
      await api.patch(`/standings/${editingStanding.id}`, editData);
      setEditingStanding(null);
      fetchStandings();
    } catch (err) {
      console.error("Erro ao atualizar standing:", err);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Classificação</h2>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {Object.keys(standings).map((championshipId) => (
        <div key={championshipId} className="mb-8 p-4 bg-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{standings[championshipId].name}</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-center">Pts</th>
                  <th className="p-3 text-center">PJ</th>
                  <th className="p-3 text-center">V</th>
                  <th className="p-3 text-center">D</th>
                  <th className="p-3 text-center">PF</th>
                  <th className="p-3 text-center">PS</th>
                  <th className="p-3 text-center">SD</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {standings[championshipId].standings.map((standing) => (
                  <tr key={standing.id} className="border-b">
                    <td className="p-3">{standing.team.name}</td>
                    <td className="p-3 text-center">{standing.points}</td>
                    <td className="p-3 text-center">{standing.matchesPlayed}</td>
                    <td className="p-3 text-center">{standing.wins}</td>
                    <td className="p-3 text-center">{standing.losses}</td>
                    <td className="p-3 text-center">{standing.pointsFor}</td>
                    <td className="p-3 text-center">{standing.pointsAgainst}</td>
                    <td className="p-3 text-center">{standing.pointsDifference}</td>
                    <td className="p-3 text-center">
                      <PlButton
                        hierarchy="secondary"
                        onClick={() => {
                          setEditingStanding(standing);
                          setEditData({
                            points: standing.points,
                            matchesPlayed: standing.matchesPlayed,
                            wins: standing.wins,
                            losses: standing.losses,
                            pointsFor: standing.pointsFor,
                            pointsAgainst: standing.pointsAgainst,
                            pointsDifference: standing.pointsDifference,
                          });
                        }}
                      >
                        Editar
                      </PlButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Modal de Edição */}
      {editingStanding && (
        <PlModal isOpen={true} onClose={() => setEditingStanding(null)}>
          <h2 className="text-xl font-bold">Editar Classificação de {editingStanding.team.name}</h2>
          <div className="mt-4 flex flex-col gap-2">
            {[
              { label: "Pontos", key: "points" },
              { label: "Partidas Jogadas", key: "matchesPlayed" },
              { label: "Vitórias", key: "wins" },
              { label: "Derrotas", key: "losses" },
              { label: "Pontos Feitos", key: "pointsFor" },
              { label: "Pontos Sofridos", key: "pointsAgainst" },
              { label: "Saldo de Pontos", key: "pointsDifference" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label htmlFor={key} className="font-semibold">{label}</label>
                <input
                  type="number"
                  name={key}
                  value={editData[key]}
                  onChange={(e) => setEditData({ ...editData, [key]: Number(e.target.value) })}
                  className="border p-4 rounded-lg w-full"
                />
              </div>
            ))}

            <PlButton hierarchy="primary" onClick={handleUpdateStanding}>
              Atualizar
            </PlButton>
          </div>
        </PlModal>
      )}
    </div>
  );
}
