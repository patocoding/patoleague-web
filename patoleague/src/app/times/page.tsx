"use client";

import { useEffect, useState } from "react";
import api from "@/config/axios";
import TeamCard from "../components/teams/TeamCard";
import Header from "../components/home/Header";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    try {
      const response = await api.get("/teams");
      setTeams(response.data);
    } catch (err) {
    console.log(err)
      setError("Erro ao carregar times");
    } finally {
      setLoading(false);
    }
  }

  return (
   <>
    <Header/>
    <div className="max-w-6xl mx-auto p-6 font-[Poppins]">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold uppercase tracking-wide text-gray-900">Equipes</h1>
        <div className="h-1 w-20 bg-red-500 mx-auto mt-2"></div>
      </div>
      {loading && <p className="text-center text-lg">Carregando...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div></>
  );
}
