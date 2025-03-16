"use client";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import { useRouter } from "next/navigation";
import Header from "@/app/components/home/Header";
import PlButton from "@/app/components/button/button";

export default function PlayerInvites() {
  const [nickname, setNickname] = useState("");
  const [invites, setInvites] = useState([]);
  const [hasTeam, setHasTeam] = useState(false);
  const router = useRouter()
  console.log(nickname)
  useEffect(() => {
    // 🔍 Obtém o nickname do usuário logado
    const storedNickname = localStorage.getItem("playerNickname") || "null"
    if (!storedNickname) {
      router.push("/auth");
      return;
    }

    setNickname(storedNickname);

    // 📤 Busca convites pendentes pelo nickname
    async function fetchInvites() {
      try {
        const response = await api.get(`/team-invites/player/nickname/${storedNickname}`);
        setInvites(response.data);
        const playerResponse = await api.get(`players/player/${storedNickname}`);
        if (playerResponse.data.team) {
          setHasTeam(true);
        }
      } catch (error) {
        console.error("Erro ao buscar convites:", error);
      }
    }

    fetchInvites();
  }, []);

  const handleResponse = async (inviteId, response) => {
    try {
      await api.patch(`/team-invites/${inviteId}/respond`, { response });
      setInvites(invites.filter((invite) => invite.id !== inviteId));
    } catch (error) {
      console.error("Erro ao responder convite:", error);
    }
  };

  return (
    <div className="font-[Inter]">
      <Header/>
      <div className="p-2">
        <h2 className="md:text-4xl text-2xl p-4 font-[Poppins] font-bold  ">Seus convites de time</h2>
        <div className="bg-red-500 h-1 ">
        </div>
      </div>
     
     <div className="p-4">
     <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto mt-10">
      
      {invites.length === 0 ? (
        <p className="text-gray-600">Você não tem convites pendentes.</p>
      ) : (
        invites.map((invite) => (
          <div key={invite.id} className="p-4 border rounded-md mb-2 flex justify-between items-center">
            <div className="flex flex-col gap-y-2">
            <p className="text-lg font-bold">{invite.team?.name || "Time desconhecido"}</p>
            <PlButton onClick={() => router.push(`/times/${invite.team?.id}`)} hierarchy="secondary" className="w-16 md:w-fit">Ver time</PlButton>
            </div>
            <div className="flex items-end flex-col gap-y-2">
              <button
                onClick={() => handleResponse(invite.id, "accepted")}
                className={`px-4 py-1 rounded-md w-24 ${
                  hasTeam ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white"
                }`}
                disabled={hasTeam} // 🔥 Desabilita se já tiver um time
              >
                Aceitar
              </button>
              <button
                onClick={() => handleResponse(invite.id, "declined")}
                className="bg-red-500 text-white px-4 w-24 py-1 rounded-md"
              >
                Recusar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
     </div>
    </div>
  );
}
