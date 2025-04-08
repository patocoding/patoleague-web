"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TeamCard({ team }) {
  const router = useRouter();

  return (
    <div
      className="bg-gray-900  text-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer hover:scale-105 transition transform duration-300"
      onClick={() => router.push(`/times/${team.id}`)}
    >
      {/* Logo do Time */}
      <div className="w-full bg-gray-800 flex justify-center p-4">
        <Image
          src={team.photoUrl || "/img/team-placeholder.png"}
          alt={team.name}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Nome do Time */}
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold capitalize font-[Poppins]">{team.name}</h2>
        <p className="text-gray-400 text-sm mt-1">{team.city}, {team.state}</p>
        <p className="text-gray-400 text-sm">Fundado em {team.foundedYear || "N/A"} - {team.championshipsWon || 0} títulos</p>
      </div>

      {/* Botão de Acesso */}
      <div className="w-full bg-gray-800 p-3 text-center hover:bg-red-500 transition">
        <span className="font-bold">Acessar Time →</span>
      </div>
    </div>
  );
}
