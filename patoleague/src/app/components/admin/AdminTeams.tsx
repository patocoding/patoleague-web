"use client";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import PlButton from "../button/button";
import PlModal from "../modal/PlModal";

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isManagePlayersModalOpen, setIsManagePlayersModalOpen] = useState(false);

  const [editTeam, setEditTeam] = useState({
    id: null,
    name: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    fetchTeams();
    fetchPlayers();
  }, []);

  async function fetchTeams() {
    try {
      const response = await api.get("/teams");
      setTeams(response.data);
    } catch (err) {
      setError("Erro ao carregar times");
    } finally {
      setLoading(false);
    }
  }

  async function fetchPlayers() {
    try {
      const response = await api.get("/players");
      setPlayers(response.data);
    } catch (err) {
      setError("Erro ao carregar jogadores");
    }
  }

  async function handleEditTeam() {
    if (!editTeam.id) return;

    try {
      await api.patch(`/teams/${editTeam.id}`, editTeam);
      alert("Time atualizado com sucesso!");
      setIsEditModalOpen(false);
      fetchTeams();
    } catch (err) {
      setError("Erro ao atualizar time");
    }
  }

  async function handleAddPlayerToTeam() {
    if (!selectedTeam || !selectedPlayer) return;

    try {
      await api.patch(`/players/${selectedPlayer}`, { teamId: selectedTeam.id });
      alert("Jogador adicionado ao time!");
      fetchTeams();
      fetchPlayers();
    } catch (err) {
      setError("Erro ao adicionar jogador ao time");
    }
  }

  async function handleRemovePlayerFromTeam(playerId) {
    try {
      await api.patch(`/players/${playerId}`, { teamId: null });
      alert("Jogador removido do time!");
      fetchTeams();
      fetchPlayers();
    } catch (err) {
      setError("Erro ao remover jogador do time");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Times</h2>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {teams.map((team) => (
          <li key={team.id} className="p-4 bg-gray-100 flex justify-between rounded-lg">
            <div>
              <h3 className="text-xl font-semibold">{team.name}</h3>
              <p>Localização: {team.city}, {team.state}</p>
              <p className="text-sm text-gray-500">Jogadores: {team.players.length}</p>
            </div>
            <div className="flex gap-2">
              <PlButton
                hierarchy="secondary"
                onClick={() => {
                  setEditTeam(team);
                  setIsEditModalOpen(true);
                }}
              >
                Editar
              </PlButton>

              <PlButton
                hierarchy="primary"
                onClick={() => {
                  setSelectedTeam(team);
                  setIsManagePlayersModalOpen(true);
                }}
              >
                Gerenciar Jogadores
              </PlButton>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal para Editar Time */}
      <PlModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl font-bold">Editar Time</h2>
        <div className="mt-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do Time"
            value={editTeam.name}
            onChange={(e) => setEditTeam({ ...editTeam, name: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="text"
            placeholder="Cidade"
            value={editTeam.city}
            onChange={(e) => setEditTeam({ ...editTeam, city: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="text"
            placeholder="Estado"
            value={editTeam.state}
            onChange={(e) => setEditTeam({ ...editTeam, state: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <PlButton hierarchy="primary" onClick={handleEditTeam}>
            Atualizar
          </PlButton>
        </div>
      </PlModal>

      {/* Modal para Gerenciar Jogadores */}
      <PlModal isOpen={isManagePlayersModalOpen} onClose={() => setIsManagePlayersModalOpen(false)}>
        <h2 className="text-xl font-bold">Gerenciar Jogadores de {selectedTeam?.name}</h2>

        {/* Adicionar jogador */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Adicionar Jogador</h3>
          <select
            className="border p-4 rounded-lg w-full"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
          >
            <option value="">Selecione um jogador</option>
            {players
              .filter((player) => !player.team) // Apenas jogadores sem time
              .map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name} ({player.position})
                </option>
              ))}
          </select>
          <PlButton hierarchy="primary" onClick={handleAddPlayerToTeam} className="mt-2">
            Adicionar ao Time
          </PlButton>
        </div>

        {/* Jogadores do Time */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Jogadores no Time</h3>
          <ul className="mt-2">
            {selectedTeam?.players.length > 0 ? (
              selectedTeam.players.map((player) => (
                <li
                  key={player.id}
                  className="p-4 bg-gray-200 flex justify-between items-center rounded-lg mt-2"
                >
                  <span>{player.name} ({player.position})</span>
                  <PlButton hierarchy="danger" onClick={() => handleRemovePlayerFromTeam(player.id)}>
                    Remover
                  </PlButton>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Nenhum jogador neste time</p>
            )}
          </ul>
        </div>
      </PlModal>
    </div>
  );
}
