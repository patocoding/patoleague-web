"use client";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import PlButton from "@/app/components/button/button";
import PlModal from "@/app/components/modal/PlModal";

export default function AdminPlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [editPlayer, setEditPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    nickname: "",
    jerseyNumber: "",
    position: "",
    height: "",
    weight: "",
    age: "",
    userId: "",
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    setFilteredPlayers(
      players.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, players]);

  async function fetchPlayers() {
    try {
      const response = await api.get("/players");
      setPlayers(response.data);
    } catch (err) {
      console.log(err)
      setError("Erro ao carregar jogadores");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePlayer() {
    try {
      await api.post("/players", newPlayer);
      setIsModalOpen(false);
      fetchPlayers();
    } catch (err) {
      console.error("Erro ao criar jogador:", err);
    }
  }

  async function handleUpdatePlayer() {
    if (!editPlayer) return;
    try {
      await api.patch(`/players/${editPlayer.id}`, editPlayer);
      setIsEditModalOpen(false);
      fetchPlayers();
    } catch (err) {
      console.error("Erro ao atualizar jogador:", err);
    }
  }

  async function handleDeletePlayer(playerId) {
    if (!confirm("Tem certeza que deseja excluir este jogador?")) return;
    try {
      await api.delete(`/players/${playerId}`);
      fetchPlayers();
    } catch (err) {
      console.error("Erro ao excluir jogador:", err);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gerenciamento de Jogadores</h2>

      {/* Barra de Pesquisa */}
      <input
        type="text"
        placeholder="Buscar jogador..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 rounded-lg w-full"
      />

      {/* Botão para criar jogador */}
      <PlButton hierarchy="primary" onClick={() => setIsModalOpen(true)}>
        Criar Jogador
      </PlButton>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Apelido</th>
              <th className="p-3 text-center">Número</th>
              <th className="p-3 text-center">Posição</th>
              <th className="p-3 text-center">Idade</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.id} className="border-b">
                <td className="p-3">{player.name}</td>
                <td className="p-3">{player.nickname}</td>
                <td className="p-3 text-center">{player.jerseyNumber}</td>
                <td className="p-3 text-center">{player.position}</td>
                <td className="p-3 text-center">{player.age}</td>
                <td className="p-3 text-center flex gap-2 justify-center">
                  <PlButton
                    hierarchy="secondary"
                    onClick={() => {
                      setEditPlayer(player);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Editar
                  </PlButton>
                  <PlButton
                    hierarchy="danger"
                    onClick={() => handleDeletePlayer(player.id)}
                  >
                    Excluir
                  </PlButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Criar Jogador */}
      <PlModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold">Criar Novo Jogador</h2>
        <div className="mt-4 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nome"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="text"
            placeholder="Apelido"
            value={newPlayer.nickname}
            onChange={(e) => setNewPlayer({ ...newPlayer, nickname: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="number"
            placeholder="Número da Camisa"
            value={newPlayer.jerseyNumber}
            onChange={(e) => setNewPlayer({ ...newPlayer, jerseyNumber: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="text"
            placeholder="Posição"
            value={newPlayer.position}
            onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
            className="border p-4 rounded-lg"
          />
          
          <PlButton hierarchy="primary" onClick={handleCreatePlayer}>
            Criar
          </PlButton>
        </div>
      </PlModal>

      {/* Modal para Editar Jogador */}
      {isEditModalOpen && editPlayer && (
        <PlModal isOpen={true} onClose={() => setIsEditModalOpen(false)}>
          <h2 className="text-xl font-bold">Editar Jogador</h2>
          <div className="mt-4 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nome"
              value={editPlayer.name || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, name: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <input
              type="text"
              placeholder="Apelido"
              value={editPlayer.nickname || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, nickname: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <input
              type="number"
              placeholder="Número da Camisa"
              value={editPlayer.jerseyNumber || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, jerseyNumber: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <input
              type="text"
              placeholder="Posição"
              value={editPlayer.position || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, position: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <input
              type="number"
              placeholder="Pontos totais"
              value={editPlayer.totalPoints || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, totalPoints: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <input
              type="number"
              placeholder="Total de jogos"
              value={editPlayer.gamesPlayed || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, gamesPlayed: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <input
              type="number"
              placeholder="Total de Assistências"
              value={editPlayer.totalAssists || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, totalAssists: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <input
              type="number"
              placeholder="Total de Rebotes"
              value={editPlayer.totalRebounds || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, totalRebounds: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <input
              type="text"
              placeholder="URL PHOTO"
              value={editPlayer.photoUrl || ""}
              onChange={(e) => setEditPlayer({ ...editPlayer, photoUrl: e.target.value })}
              className="border p-4 rounded-lg"
            />
            <PlButton hierarchy="primary" onClick={handleUpdatePlayer}>
              Atualizar
            </PlButton>
          </div>
        </PlModal>
      )}
    </div>
  );
}
