"use client";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import PlButton from "../button/button";
import PlModal from "../modal/PlModal";
import ChampionshipToggle from "./components/ChampionshipToggle";
import ChampionshipTeamsModal from "./components/ChampionshipTeamsModal";

export default function AdminChampionships() {
  const [championships, setChampionships] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedChampionship, setSelectedChampionship] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false);
  const [selectedChampionshipId, setSelectedChampionshipId] = useState(null);
  const [newChampionship, setNewChampionship] = useState({
    name: "",
    startDate: "",
    endDate: "",
    location: "",
    format: "",
  });

  const [editChampionship, setEditChampionship] = useState({
    id: null,
    name: "",
    startDate: "",
    endDate: "",
    location: "",
    format: "",
  });

  useEffect(() => {
    fetchChampionships();
    fetchTeams();
  }, []);

  async function fetchChampionships() {
    try {
      const response = await api.get("/championships");
      setChampionships(response.data);
    } catch (err) {
      console.log(err)
      setError("Erro ao carregar campeonatos");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeams() {
    try {
      const response = await api.get("/teams");
      setTeams(response.data);
    } catch (err) {
      console.log(err)
      setError("Erro ao carregar times");
    }
  }

  async function handleCreateChampionship() {
    try {
      const response = await api.post("/championships", newChampionship);
      if (response.status === 201) {
        alert("Campeonato criado com sucesso!");
        setIsModalOpen(false);
        fetchChampionships(); // Atualiza lista
      }
    } catch (err) {
      console.log(err)
      setError("Erro ao criar campeonato");
    }
  }

  async function handleEditChampionship() {
    if (!editChampionship.id) return;
    
    try {
      const response = await api.patch(`/championships/${editChampionship.id}`, editChampionship);
      if (response.status === 200) {
        alert("Campeonato atualizado com sucesso!");
        setIsEditModalOpen(false);
        fetchChampionships();
      }
    } catch (err) {
      console.log(err)
      setError("Erro ao atualizar campeonato");
    }
  }

  async function handleAddTeamToChampionship() {
    if (!selectedChampionship || !selectedTeam) return;
    
    try {
      const response = await api.post("/championship-teams", {
        championshipId: selectedChampionship.id,
        teamId: selectedTeam,
      });

      if (response.status === 201) {
        alert("Time adicionado ao campeonato!");
        setIsAddTeamModalOpen(false);
        fetchChampionships();
      }
    } catch (err) {
      console.log(err)
      setError("Erro ao adicionar time ao campeonato");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Campeonatos</h2>

      {/* Botão para abrir modal de criação */}
      <PlButton hierarchy="primary" onClick={() => setIsModalOpen(true)}>
        Criar Campeonato
      </PlButton>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4 mt-4">
        {championships.map((champ) => (
          <li key={champ.id} className="p-4 bg-gray-100 flex justify-between rounded-lg">
            <div>
            <h3 className="text-xl font-semibold">{champ.name}</h3>
            <p>Data: {champ.startDate} - {champ.endDate}</p>
            <p>Local: {champ.location}</p>
            <p>Formato: {champ.format}</p>
            <div className="flex gap-2 mt-2">
              <PlButton hierarchy="secondary" onClick={() => {
                setSelectedChampionship(champ);
                setIsAddTeamModalOpen(true);
              }}>
                Adicionar Time
              </PlButton>

              <PlButton hierarchy="primary" onClick={() => {
                setEditChampionship(champ);
                setIsEditModalOpen(true);
              }}>
                Editar
              </PlButton>
            </div>
            </div>
            <div className="">
              <ChampionshipToggle championshipId={champ.id} initialStatus={champ.isActive}/>
              <PlButton hierarchy="secondary" onClick={() => {
                setSelectedChampionshipId(champ.id);
                setIsTeamsModalOpen(true);
              }}>
                Ver Times
              </PlButton>
            </div>
          </li>
        ))}
      </ul>
      <ChampionshipTeamsModal
        isOpen={isTeamsModalOpen}
        onClose={() => setIsTeamsModalOpen(false)}
        championshipId={selectedChampionshipId}
      />
      {/* Modal para Criar Campeonato */}
      <PlModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold">Criar Campeonato</h2>
        <div className="mt-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do Campeonato"
            value={newChampionship.name}
            onChange={(e) => setNewChampionship({ ...newChampionship, name: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="date"
            placeholder="Data de Início"
            value={newChampionship.startDate}
            onChange={(e) => setNewChampionship({ ...newChampionship, startDate: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="date"
            placeholder="Data de Término"
            value={newChampionship.endDate}
            onChange={(e) => setNewChampionship({ ...newChampionship, endDate: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="text"
            placeholder="Localização"
            value={newChampionship.location}
            onChange={(e) => setNewChampionship({ ...newChampionship, location: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="text"
            placeholder="Formato"
            value={newChampionship.format}
            onChange={(e) => setNewChampionship({ ...newChampionship, format: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <PlButton hierarchy="primary" onClick={handleCreateChampionship}>
            Criar
          </PlButton>
        </div>
      </PlModal>
      <PlModal isOpen={isAddTeamModalOpen} onClose={() => setIsAddTeamModalOpen(false)}>
  <h2 className="text-xl font-bold">Adicionar Time a {selectedChampionship?.name}</h2>
  <div className="mt-4 flex flex-col gap-4">
    <select
      className="border p-4 rounded-lg"
      value={selectedTeam}
      onChange={(e) => setSelectedTeam(e.target.value)}
    >
      <option value="">Selecione um time</option>
      {teams
        .filter(
          (team) =>
            !selectedChampionship?.championshipTeams?.some(
              (entry) => entry.team.id === team.id
            )
        ) // 🔥 Filtra apenas os times que ainda NÃO estão no campeonato
        .map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
    </select>
    <PlButton hierarchy="primary" onClick={handleAddTeamToChampionship}>
      Adicionar Time
    </PlButton>
  </div>
</PlModal>

      {/* Modal para Editar Campeonato */}
      <PlModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl font-bold">Editar Campeonato</h2>
        <div className="mt-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do Campeonato"
            value={editChampionship.name}
            onChange={(e) => setEditChampionship({ ...editChampionship, name: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="date"
            placeholder="Data de Início"
            value={editChampionship.startDate}
            onChange={(e) => setEditChampionship({ ...editChampionship, startDate: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <input
            type="date"
            placeholder="Data de Término"
            value={editChampionship.endDate}
            onChange={(e) => setEditChampionship({ ...editChampionship, endDate: e.target.value })}
            className="border p-4 rounded-lg"
          />
          <PlButton hierarchy="primary" onClick={handleEditChampionship}>
            Atualizar
          </PlButton>
        </div>
      </PlModal>
    </div>
  );
}
