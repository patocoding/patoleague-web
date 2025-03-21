"use client";

import Image from "next/image";

interface Player {
  id: number;
  name: string;
  nickname: string;
  position: string;
  height: number;
  weight: number;
  age: number;
  team?: {
    name: string;
  };
  photoUrl: string;
}

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <Image src={player.photoUrl || "/img/player-placeholder.png"} alt="Jogador" width={100} height={100} className="rounded-full" />
      <h2 className="text-xl font-bold mt-4">{player.name} ({player.nickname})</h2>
      <p className="text-gray-600">{player.position}</p>
      <p className="text-sm text-gray-500">{player.team ? `Time: ${player.team.name}` : "Sem time"}</p>
      <p className="text-sm mt-2">Altura: {player.height}m | Peso: {player.weight}kg</p>
      <p className="text-sm">Idade: {player.age} anos</p>
    </div>
  );
}