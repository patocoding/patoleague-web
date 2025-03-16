"use client";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import PlButton from "@/app/components/button/button";

export default function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const [championships, setChampionships] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);

  const [matchData, setMatchData] = useState({
    championshipId: "",
    team1Id: "",
    team2Id: "",
    date: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [matchesRes, championshipsRes, teamsRes] = await Promise.all([
        api.get("/matches"),
        api.get("/championships"),
        api.get("/teams"),
      ]);
      setMatches(matchesRes.data);
      setChampionships(championshipsRes.data);
      setTeams(teamsRes.data);
    } catch (err) {
      console.log(err)
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateMatch() {
    try {
      await api.post("/matches", matchData);
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Erro ao criar partida:", err);
    }
  }

  async function handleUpdateMatch(matchId, updatedData) {
    try {
      await api.patch(`/matches/${matchId}`, updatedData);
      setEditingMatch(null);
      fetchData();
    } catch (err) {
      console.error("Erro ao atualizar partida:", err);
    }
  }

  async function handleDeleteMatch(matchId) {
    if (!confirm("Tem certeza que deseja excluir esta partida?")) return;
    try {
      await api.delete(`/matches/${matchId}`);
      fetchData();
    } catch (err) {
      console.error("Erro ao excluir partida:", err);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Partidas</h2>

      <PlButton hierarchy="primary" onClick={() => setShowModal(true)}>
        Criar Partida
      </PlButton>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4 mt-4">
        {matches.map((match) => (
          <li key={match.id} className="p-4 bg-gray-100 rounded-lg flex justify-between">
            {editingMatch === match.id ? (
              <div>
                <input
                  type="number"
                  placeholder="Placar Time Casa"
                  value={match.homeScore || ""}
                  onChange={(e) =>
                    setMatches(matches.map((m) => (m.id === match.id ? { ...m, homeScore: e.target.value } : m)))
                  }
                  className="border p-2 rounded-md mr-2"
                />
                <input
                  type="number"
                  placeholder="Placar Time Fora"
                  value={match.awayScore || ""}
                  onChange={(e) =>
                    setMatches(matches.map((m) => (m.id === match.id ? { ...m, awayScore: e.target.value } : m)))
                  }
                  className="border p-2 rounded-md mr-2"
                />
                <input
                  type="text"
                  placeholder="Status"
                  value={match.status || ""}
                  onChange={(e) =>
                    setMatches(matches.map((m) => (m.id === match.id ? { ...m, status: e.target.value } : m)))
                  }
                  className="border p-2 rounded-md mr-2"
                />
                <PlButton
                  hierarchy="secondary"
                  onClick={() => handleUpdateMatch(match.id, { homeScore: match.homeScore, awayScore: match.awayScore })}
                >
                  Salvar
                </PlButton>
              </div>
            ) : (
              <>
                <div>
                <p className="text-gray-700 text-sm">{match.championship?.name || "Sem Campeonato"}</p>
                  <h3 className="text-xl font-semibold">
                    {match.teamHome.name} vs {match.teamAway.name}
                  </h3>
                  <p>Data: {match.date}</p>
                  <p>Status: {match.status}</p>
                </div>
                <div className="flex gap-2">
                  <PlButton hierarchy="secondary" onClick={() => setEditingMatch(match.id)}>
                    Editar
                  </PlButton>
                  <PlButton hierarchy="danger" onClick={() => handleDeleteMatch(match.id)}>
                    Excluir
                  </PlButton>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Modal para Criar Partida */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Criar Partida</h3>

            <select
              value={matchData.championshipId}
              onChange={(e) => setMatchData({ ...matchData, championshipId: e.target.value })}
              className="border p-2 w-full mb-2"
            >
              <option value="">Selecione um Campeonato</option>
              {championships.map((champ) => (
                <option key={champ.id} value={champ.id}>
                  {champ.name}
                </option>
              ))}
            </select>

            <select
              value={matchData.team1Id}
              onChange={(e) => setMatchData({ ...matchData, team1Id: e.target.value })}
              className="border p-2 w-full mb-2"
            >
              <option value="">Selecione o Time 1</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <select
              value={matchData.team2Id}
              onChange={(e) => setMatchData({ ...matchData, team2Id: e.target.value })}
              className="border p-2 w-full mb-2"
            >
              <option value="">Selecione o Time 2</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={matchData.date}
              onChange={(e) => setMatchData({ ...matchData, date: e.target.value })}
              className="border p-2 w-full mb-2"
            />

            <div className="flex gap-2">
              <PlButton hierarchy="primary" onClick={handleCreateMatch}>
                Criar
              </PlButton>
              <PlButton hierarchy="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </PlButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
