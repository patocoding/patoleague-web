"use client";
import { useEffect, useState } from "react";
import api from "@/config/axios";

export default function PublicStandings() {
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      console.log(err)
      setError("Erro ao carregar standings");
    } finally {
      setLoading(false);
    }
  }

  function getMedal(index) {
    if (index === 0) return "🥇"; // Ouro
    if (index === 1) return "🥈"; // Prata
    if (index === 2) return "🥉"; // Bronze
    return "";
  }

  return (
    <div className="p-6 font-[Inter]">
      <h2 className="text-2xl font-bold mb-4 font-[Poppins]">Classificações</h2>
      <div className="h-1 bg-red-500"></div>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {Object.keys(standings).map((championshipId) => (
        <div key={championshipId} className="mb-8 p-4  rounded-lg">
          <h3 className="text-xl font-semibold mb-2 font-[Poppins]">{standings[championshipId].name}</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-center">Pts</th>
                  <th className="p-3 text-center">PJ</th>
                  <th className="p-3 text-center">V</th>
                  <th className="p-3 text-center">D</th>
                  <th className="p-3 text-center">PF</th>
                  <th className="p-3 text-center">PS</th>
                  <th className="p-3 text-center">SD</th>
                </tr>
              </thead>
              <tbody>
                {standings[championshipId].standings.map((standing, index) => (
                  <tr key={standing.id} className="border-b">
                    <td className="p-3 ">{getMedal(index)}</td>
                    <td className="p-3">{standing.team.name}</td>
                    <td className="p-3 text-center">{standing.points}</td>
                    <td className="p-3 text-center">{standing.matchesPlayed}</td>
                    <td className="p-3 text-center">{standing.wins}</td>
                    <td className="p-3 text-center">{standing.losses}</td>
                    <td className="p-3 text-center">{standing.pointsFor}</td>
                    <td className="p-3 text-center">{standing.pointsAgainst}</td>
                    <td className="p-3 text-center">{standing.pointsDifference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
