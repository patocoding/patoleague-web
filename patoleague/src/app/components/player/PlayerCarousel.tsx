"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function PlayerCarousel({ players }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [filter, setFilter] = useState("TODOS");

  const positions = ["TODOS", "Armador", "Ala-Armador", "Ala", "Ala-Pivô", "Pivô"];
  
  const filteredPlayers =
    filter === "TODOS" ? players : players.filter((player) => player.position === filter);

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

  return (
    <div className="bg-black text-white py-8">
      <h2 className="text-4xl font-bold text-center mb-4">JOGADORES</h2>

      {/* Filtros */}
      <div className="flex justify-center flex-col md:flex-row space-x-4 text-sm uppercase">
        {positions.map((pos) => (
          <button
            key={pos}
            className={`px-4 py-2 ${
              filter === pos ? "border-b-4 border-white font-bold" : "text-gray-400"
            }`}
            onClick={() => setFilter(pos)}
          >
            {pos}
          </button>
        ))}
      </div>
      
      {/* Carrossel */}
      <div className="relative mt-4 px-8">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md z-10 hidden md:block"
        >
          <FaChevronLeft size={20} />
        </button>
        { players.length === 0 && (
          <div className="text-center">
            Não há jogadores nesse time.
          </div>
        )}
        <div ref={scrollRef} className="overflow-x-auto flex space-x-4 scrollbar-hide p-4">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="min-w-[180px] bg-green-700 border border-gray-400 shadow-md rounded-lg cursor-pointer"
              onClick={() => router.push(`/jogadores/${player.nickname}`)}
            >
              <div className="relative">
                <span className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs font-bold">
                  #{player.jerseyNumber}
                </span>
                <Image
                  src={player.image || "/img/player-placeholder.png"}
                  alt={player.name}
                  width={180}
                  height={200}
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-2 text-center">
                <p className="text-lg font-bold">{player.name.split(" ")[0]} {player.name.split(" ")[1]}</p>
              </div>
              <div className="bg-black text-white text-xs grid grid-cols-3 p-2 text-center">
                <div>
                  <p className="font-bold">Posição</p>
                  <p>{player.position.substr(0,7)}</p>
                </div>
                <div>
                  <p className="font-bold">Altura</p>
                  <p>{player.height}</p>
                </div>
                <div>
                  <p className="font-bold">Idade</p>
                  <p>{player.age}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md z-10 hidden md:block"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
