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
  const [isSeasonStats, setIsSeasonStats] = useState(true);

  useEffect(() => {
    if (!player) return;

    const fetchPlayer = async () => {
      try {
        const response = await api.get(`/players/player/${player}`);
        setPlayerObject(response.data);
      } catch (err) {
        setError("Jogador não encontrado");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [player]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
    <Header/>
    <div className="relative min-h-screen mt-10 font-[Inter]">
      {/* Cabeçalho do Jogador */}
      <div className="bg-[#0c2f37] py-6 text-white flex flex-col md:flex-row items-center justify-between px-12">
        <div className="flex items-center gap-4">
          {playerObject.team && (
            <Image src={playerObject.team.logo || "/img/team-placeholder.png"} alt="Team Logo" width={50} height={50} />
          )}
          <h1 className="text-4xl font-bold uppercase">ATLETAS</h1>
        </div>
      </div>

      {/* Informações principais */}
      <div className="max-w-6xl mx-auto mt-6 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Nome e Estatísticas */}
          <div className="flex-1">
            <h2 className="md:text-5xl text-3xl font-bold text-zinc-700 font-[Poppins]">
              <span className="font-extralight font-[Inter]">#{playerObject.jerseyNumber}</span> <span className="">{playerObject.name.split(" ")[0]}</span>{" "}
              <span className="font-extrabold">{playerObject.name.split(" ")[1]}</span>
            </h2>

            {/* Estatísticas principais */}
            <div className="flex gap-6 mt-4">
              <div className="bg-black text-white p-4 rounded-lg text-center w-32 ">
                <p className="text-xl font-semibold">PONTOS</p>
                <p className="text-4xl font-bold">{playerObject.pointsPerGame}</p>
              </div>
              <div className="bg-black text-white p-4 rounded-lg text-center w-32 ">
                <p className="text-xl font-semibold">REBOTES</p>
                <p className="text-4xl font-bold">{playerObject.reboundsPerGame}</p>
              </div>
              <div className="bg-black text-white p-4 rounded-lg text-center w-32 ">
                <p className="text-xl font-semibold">ASSISTS</p>
                <p className="text-4xl font-bold">{playerObject.assistsPerGame}</p>
              </div>
              <div className="bg-black text-white p-4 rounded-lg text-center ">
                <p className="text-xl font-semibold">EFICIÊNCIA</p>
                <p className="text-4xl font-bold">0.0</p> 
              </div>
            </div>

            {/* Alternância entre estatísticas da temporada e carreira */}
            {/* <div className="mt-6 flex items-center gap-3">
              <span className="text-gray-700">NBB</span>
              <div
                className={`relative w-20 h-8 flex items-center cursor-pointer rounded-full p-1 ${
                  isSeasonStats ? "bg-red-500" : "bg-gray-400"
                }`}
                onClick={() => setIsSeasonStats(!isSeasonStats)}
              >
                <div
                  className={`h-6 w-6 bg-white rounded-full transition-transform ${
                    isSeasonStats ? "translate-x-0" : "translate-x-12"
                  }`}
                />
              </div>
              <span className="text-gray-700">{isSeasonStats ? "TEMPORADA" : "CARREIRA"}</span>
            </div> */}
          </div>

          {/* Imagem do jogador */}
         <div className="flex flex-col">
         <div className="relative  w-60 h-80 bg-gray-800 flex justify-center items-center rounded-lg shadow-lg">
            <Image
              src={playerObject.image || "/img/player-placeholder.png"}
              alt={playerObject.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            
          </div>
          <div className="text-[10px] text-center">
              Envie sua foto no WhatsApp
            </div>
         </div>
        </div>
      </div>

      {/* Ficha Técnica */}
      <div className="max-w-6xl mx-auto mt-12 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold uppercase mb-4">Ficha Técnica</h3>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border border-gray-300">
              <td className="p-3 font-semibold">Nome</td>
              <td className="p-3">{playerObject.name}</td>
              <td className="p-3 font-semibold">Posição</td>
              <td className="p-3">{playerObject.position}</td>
            </tr>
            {playerObject.team && (
              <tr className="border border-gray-300">
                <td className="p-3 font-semibold">Equipe(s)</td>
                <td className="p-3">{playerObject.team.name}</td>
                <td className="p-3 font-semibold">Naturalidade</td>
                <td className="p-3">Desconhecida</td>
              </tr>
            )}
            <tr className="border border-gray-300">
              <td className="p-3 font-semibold">Idade</td>
              <td className="p-3">{playerObject.age} anos</td>
              <td className="p-3 font-semibold">Altura / Peso</td>
              <td className="p-3">{playerObject.height}m / {playerObject.weight}kg</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Compartilhamento e Voltar */}
      <div className="max-w-6xl mx-auto mt-8 flex justify-between items-center">
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
    </div></>
  );
}
