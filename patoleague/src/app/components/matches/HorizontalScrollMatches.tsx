"use client";
import { useEffect, useRef, useState } from "react";
import api from "@/config/axios";
import { FaChevronLeft, FaChevronRight, FaBasketballBall } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import './matches.css'
export default function HorizontalScrollMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  async function fetchMatches() {
    try {
      const response = await api.get("/matches");
      setMatches(response.data);
    } catch (err) {
      setError("Erro ao carregar partidas");
    } finally {
      setLoading(false);
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) return <p className="text-center">Carregando partidas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!matches.length) return <p className="text-center">Nenhuma partida encontrada.</p>;

  return (
   <>
    <div className="font-bold text-3xl font-[Poppins] border-b-4 border-red-500 gap-x-4 m pb-4 md:pl-4 md:pr-4 md:ml-8 md:w-fit  flex text-center items-center justify-center">
            <FaBasketballBall/><p className="text-center">Jogos</p>
        </div>
    <div className="relative w-full px-4 font-[Inter]">
        
      {/* Botões de Navegação */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md z-10 hidden md:block"
      >
        <FaChevronLeft size={20} />
      </button>

      <div ref={scrollRef} className="overflow-x-auto flex space-x-4 scrollbar-hide p-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="md:min-w-[400px] min-w-[250px] bg-white bg bg-cover bg-center shadow-md rounded-lg p-4 flex flex-col items-center text-center border border-gray-300"
          >
            <p className="text-lg font-semibold text-[10px] ">{match.championship.name}</p>
            <div className="flex items-center justify-center space-x-2 my-2">
              {/* <span className="font-bold text-xl capitalize font-[Poppins]">{match.teamHome.name}</span> */}
              <Image width={120} height={120} alt="time1" src="https://logodetimes.com/wp-content/uploads/chicago-bulls.png" ></Image>
              <span className="text-gray-500">vs</span>
              <Image width={120} height={120} alt="time1" src="https://logodetimes.com/wp-content/uploads/chicago-bulls.png" ></Image>
            </div>
            <p className="text-gray-600 text-[10px]">
  {format(new Date(match.date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
</p>
            <p className={`bg-white p-2 rounded-3xl border border-black font-semibold mt-2 ${match.status === "Finalizado" ? "text-green-600" : "text-blue-600"}`}>
              {match.status}
            </p>
          </div>
        ))}
      </div>

      {/* Botões de Navegação */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md z-10 hidden md:block"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
   </>
  );
}
