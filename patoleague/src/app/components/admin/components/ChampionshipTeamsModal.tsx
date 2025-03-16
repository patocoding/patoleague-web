"use client";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import PlModal from "../../modal/PlModal";

export default function ChampionshipTeamsModal({ isOpen, onClose, championshipId }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!championshipId) return;
    fetchTeams();
  }, [championshipId]);

  async function fetchTeams() {
    try {
      setLoading(true);
      const response = await api.get(`/championship-teams/${championshipId}`);
      setTeams(response.data);
    } catch (err) {
      setError("Erro ao carregar os times");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PlModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold">Times do Campeonato</h2>

      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : teams.length === 0 ? (
        <p className="text-gray-600">Nenhum time participando ainda.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {teams.map((team) => (
            <li key={team.id} className="p-2 border-b">
              {team.name}
            </li>
          ))}
        </ul>
      )}
    </PlModal>
  );
}
