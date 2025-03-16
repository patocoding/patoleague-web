"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/config/axios";
import Image from "next/image";
import InvitePlayer from "@/app/components/teams/InvitePlayer";
import Header from "@/app/components/home/Header";
import PlayerCarousel from "@/app/components/player/PlayerCarousel";
import PlButton from "@/app/components/button/button";

export default function TeamPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isPlayerInTeam, setIsPlayerInTeam] = useState(false);
  // ✅ Obtém o usuário no useEffect (evita erros de renderização)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser && storedUser.id) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (!id || !user) return;

    const fetchTeam = async () => {
      try {
        const response = await api.get(`/teams/${id}`);
        setTeam(response.data);
        
        if (response.data.players?.some((player) => player.user?.id === user.id)) {
          setIsPlayerInTeam(true);
        }
      } catch (err) {
        console.log('erro 39',err)
        setError("Time não encontrado");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id, user]);

  
  async function handleLeaveTeam() {
    if (!user) return;

    try {
      await api.patch(`/players/leave-team`, { userId: user.id });
      alert("Você saiu do time!");
      window.location.reload();
    } catch (err) {
      console.error("Erro ao sair do time:", err);
      alert("Erro ao sair do time.");
    }
  }

  if (loading) return <p className="text-center text-white">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="relative min-h-screen mt-10 font-[Inter]">
        {/* Campeonatos */}
        <div className="rounded-lg flex-col  max-w-4xl mx-auto mb-8 flex items-center justify-center md:justify-start p-2">
          <div>
          <span className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse mr-2"></span>
          <h2 className="font-semibold">Participando:</h2>
          </div>
          {team?.championshipTeams?.length > 0 ? (
            <ul>
              {team.championshipTeams.map((entry) => (
                <li key={entry.id} className="text-gray-800 text-[12px] ml-4">
                  {entry.championship.name} - {entry.championship.year}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">Este time não está participando de nenhum campeonato no momento.</p>
          )}
        </div>

        {/* Informações do time */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Logo do time */}
          <div className="relative w-1/3 flex justify-center">
            <Image
              src={team.logo || "/img/team-placeholder.png"}
              alt={team.name}
              width={350}
              height={350}
              className="rounded-lg shadow-lg border-4 border-white"
            />
          </div>

          {/* Exibir convite apenas se o usuário for o dono do time */}
          {user?.id === team?.createdBy?.id && (
            <div>
              <InvitePlayer teamId={id} />
            </div>
          )}

          {/* Se o usuário for jogador do time, exibe botão para sair */}
          {isPlayerInTeam && (
            <div>
              <PlButton className="bg-red-500" onClick={handleLeaveTeam}>
                Sair do time
              </PlButton>
            </div>
          )}

          {/* Informações gerais do time */}
          <div className="flex-1 p-8">
            <h1 className="text-5xl font-bold uppercase">{team.name}</h1>
            <p className="text-2xl opacity-75">
              {team.city}, {team.state}
            </p>
            <p className="mt-2 text-xl">Fundado em: {team.foundedYear || "N/A"}</p>
            <p className="mt-2 text-xl">Títulos conquistados: {team.championshipsWon || 0}</p>
          </div>
        </div>

        {/* Lista de jogadores */}
        <div className="mt-12">
          <PlayerCarousel players={team.players} />
        </div>
      </div>
    </>
  );
}
