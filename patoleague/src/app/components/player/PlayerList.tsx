"use client";

import { useEffect, useState } from "react";
import api from "@/config/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Player } from "@/app/interfaces/Player";

export default function PlayersList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await api.get("/players");
        setPlayers(response.data);
      } catch (err) {
        console.log(err)
        setError("Erro ao carregar jogadores.");
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, []);

  if (loading) return <p className="text-center text-white">Carregando jogadores...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!players.length) return <p className="text-center text-white">Nenhum jogador encontrado.</p>;

  return (
    <>
      <div className="atletes py-6 text-white flex flex-col md:flex-row items-center justify-between px-12 font-[Poppins]">
        <h1 className="text-4xl font-bold uppercase">Atletas</h1>
      </div>
    <div className="max-w-7xl mx-auto mt-6 px-6">
      {/* Título */}
      

      {/* Grid de Jogadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer hover:scale-105 transition transform duration-300"
            onClick={() => router.push(`/jogadores/${player.nickname}`)}
          >
            {/* Imagem do Jogador */}
            <div className="relative w-full lebron flex justify-center p-4">
              <Image
                src={player.photoUrl || "/img/player-placeholder.png"}
                alt={player.name}
                width={80}
                height={80}
                className="object-contain rounded-full"
              />
            </div>

            {/* Informações do Jogador */}
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold Capitalize"><span className=" font-thin">#{player.jerseyNumber}</span> {player.name.split(" ")[0][0]}. {player.name.split(" ")[1]}</h2>
              <p className="text-gray-400 text-sm mt-1">{player.team?.name || "Sem time"}</p>
            </div>

            {/* Botão Perfil */}
            <div className="w-full bg-gray-800 p-3 text-center hover:bg-orange-500 transition">
              <span className="font-thin capitalize">perfil jogador →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
