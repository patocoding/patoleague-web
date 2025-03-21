"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/config/axios";
import Image from "next/image";
import PlButton from "@/app/components/button/button";
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa";
import Header from "@/app/components/home/Header";

export default function PlayerPage() {
  const router = useRouter();
  const { player } = useParams();
  const [playerObject, setPlayerObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!player) return;

    const fetchPlayer = async () => {
      try {
        const response = await api.get(`/players/player/${player}`);
        setPlayerObject(response.data);
      } catch (err) {
        console.log(err);
        setError("Jogador não encontrado");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [player]);

  if (loading) return <p className="text-center">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="relative min-h-screen mt-6 font-[Inter] px-4 md:px-8">
        {/* Cabeçalho */}
        <div className="bg-[#0c2f37] py-6 text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-12 rounded-lg">
          <div className="flex items-center gap-4">
            {playerObject.team && (
              <Image
                src={playerObject.team.logo || "/img/team-placeholder.png"}
                alt="Team Logo"
                width={50}
                height={50}
                className="hidden md:block"
              />
            )}
            <h1 className="text-3xl md:text-4xl font-bold uppercase text-center md:text-left">
              ATLETAS
            </h1>
          </div>
        </div>

        {/* Informações principais */}
        <div className="max-w-6xl mx-auto mt-6 px-4 md:px-0 flex flex-col md:flex-row items-center md:justify-between">
          {/* Nome e Estatísticas */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-700 font-[Poppins]">
              <span className="font-extralight font-[Inter]">
                #{playerObject.jerseyNumber}
              </span>{" "}
              {playerObject.name}
            </h2>

            {/* Estatísticas principais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-black text-white p-4 rounded-lg text-center">
                <p className="text-sm md:text-xl font-semibold">PONTOS</p>
                <p className="text-3xl md:text-4xl font-bold">
                  {playerObject.pointsPerGame}
                </p>
              </div>
              <div className="bg-black text-white p-4 rounded-lg text-center">
                <p className="text-sm md:text-xl font-semibold">REBOTES</p>
                <p className="text-3xl md:text-4xl font-bold">
                  {playerObject.reboundsPerGame}
                </p>
              </div>
              <div className="bg-black text-white p-4 rounded-lg text-center">
                <p className="text-sm md:text-xl font-semibold">ASSISTS</p>
                <p className="text-3xl md:text-4xl font-bold">
                  {playerObject.assistsPerGame}
                </p>
              </div>
              <div className="bg-black text-white p-4 rounded-lg text-center">
                <p className="text-sm md:text-xl font-semibold">EFICIÊNCIA</p>
                <p className="text-3xl md:text-4xl font-bold">0.0</p>
              </div>
            </div>
          </div>

          {/* Imagem do jogador */}
          <div className="mt-6 md:mt-0 flex flex-col items-center">
            <div className="relative w-40 h-56 md:w-60 md:h-80 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <Image
                src={playerObject.photoUrl || "/img/player-placeholder.png"}
                alt={playerObject.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="text-[10px] text-center mt-2">
              Envie sua foto no WhatsApp
            </div>
          </div>
        </div>

        {/* Ficha Técnica */}
        <div className="max-w-6xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold uppercase mb-4 text-center md:text-left">
            Ficha Técnica
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2 md:p-3 font-semibold">Nome</td>
                <td className="p-2 md:p-3">{playerObject.name}</td>
                <td className="p-2 md:p-3 font-semibold">Posição</td>
                <td className="p-2 md:p-3">{playerObject.position}</td>
              </tr>
              {playerObject.team && (
                <tr className="border border-gray-300">
                  <td className="p-2 md:p-3 font-semibold">Equipe</td>
                  <td className="p-2 md:p-3">{playerObject.team.name}</td>
                  <td className="p-2 md:p-3 font-semibold">Naturalidade</td>
                  <td className="p-2 md:p-3">Desconhecida</td>
                </tr>
              )}
              <tr className="border border-gray-300">
                <td className="p-2 md:p-3 font-semibold">Idade</td>
                <td className="p-2 md:p-3">{playerObject.age} anos</td>
                <td className="p-2 md:p-3 font-semibold">Altura / Peso</td>
                <td className="p-2 md:p-3">
                  {playerObject.height}m / {playerObject.weight}kg
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compartilhamento e Voltar */}
        <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <span>Compartilhe:</span>
            <FaFacebookF className="text-blue-600 cursor-pointer" size={24} />
            <FaTwitter className="text-blue-400 cursor-pointer" size={24} />
            <FaGooglePlusG className="text-red-500 cursor-pointer" size={24} />
          </div>

          <PlButton hierarchy="secondary" onClick={() => router.back()}>
            Voltar
          </PlButton>
        </div>
      </div>
    </>
  );
}
