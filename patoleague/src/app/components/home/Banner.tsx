"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PlButton from "../button/button";
import PlModal from "../modal/PlModal";
import { RiTeamFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { FaMapPin, FaSpinner } from "react-icons/fa";
import { FaLandmarkFlag, FaBasketball } from "react-icons/fa6";
export default function Banner() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasPlayer, setHasPlayer] = useState(false);
  const [player, setPlayer] = useState(null);
  const [user, setUser] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamCity, setTeamCity] = useState("");
  const [teamState, setTeamState] = useState("");
  const [checkingData, setCheckingData] = useState(true); 
  const [team, setTeam] = useState(null);
  const [hasTeam, setHasTeam] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser && storedUser.id) {
      setUser(storedUser);
      checkUserData(storedUser.id);
    } else {
      setCheckingData(false);   
    }
  }, []);

  
  async function checkUserData(userId) {
    try {
      const playerResponse = await api.get(`/players/user/${userId}`);
      if (playerResponse.data) {
        setHasPlayer(true);
        setPlayer(playerResponse.data);
        if (playerResponse.data.team) {
          setHasTeam(true); // Jogador já está em um time
          setTeam(playerResponse.data.team);
        }
      }
  
      const teamResponse = await api.get(`/teams/user/${userId}`);
      if (teamResponse.data) {
        setHasTeam(true);
        setTeam(teamResponse.data);
      }
    } catch (error) {
      console.error("Erro ao verificar jogador/time:", error);
    } finally {
      setCheckingData(false);
    }
  }
  

  const handleCreateTeam = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }
  
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/teams", {
        name: teamName,
        city: teamCity,
        state: teamState,
        createdById: user.id
      });
  
      if (response.status === 201 || response.status === 200) {
        alert("Time criado com sucesso!");
        setIsTeamModalOpen(false);
        await checkUserData(user.id); // Atualiza os dados do usuário
      }
    } catch (err) {
      console.log(err)
      setError("Falha ao criar time. Tente novamente.");
    }
    setLoading(false);
  };
  


  const handleCreatePlayer = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await api.post("/players", {
        name: playerName,
        jerseyNumber: Number(jerseyNumber),
        position,
        height,
        age,
        weight,
        userId: user.id,
        nickname
      });

      if (response.status === 201 || response.status === 200) {
        alert("Jogador criado com sucesso!");
        setIsModalOpen(false);
        await checkUserData(user.id);
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
      setError("Falha ao criar jogador. Tente novamente.");
    }

    setLoading(false);
  };

  const handleButtonClick = (action) => {
    if (!user) {
      router.push("/auth");
      return;
    }

    if (action === "createTeam") {
     setIsTeamModalOpen(true);
    } else if (action === "createPlayer") {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-[#0c2f37] flex flex-col md:flex-row mt-8 rounded-2xl items-center md:justify-center font-[Inter]">
      <div className="px-12 py-8 flex flex-col">
        <h1 className="text-4xl font-bold text-white">
          Pato <span className="text-orange-500">League</span> <br />
          <span className="uppercase text-6xl">de cara nova</span>
        </h1>
        <h1 className="text-2xl font-semibold text-white">
          Crie seu time, convide seus jogadores
          <br />
          e construa sua <span className="uppercase text-orange-500">dinastia</span>
        </h1>
      </div>

      <div className="flex flex-col gap-y-4 lg:ml-8">
        {/* Verificação de time */}
        {checkingData ? (
          <PlButton hierarchy="secondary" fontSize={24} disabled>
            <FaSpinner className="animate-spin mr-2" /> Verificando...
          </PlButton>
        ) : hasTeam ? (
          <PlButton hierarchy="secondary" fontSize={24} onClick={() => router.push(`/times/${team.id}`)}>
            Acessar Meu Time <RiTeamFill />
          </PlButton>
        ) : (
          <PlButton hierarchy="secondary" fontSize={24} onClick={() => handleButtonClick("createTeam")}>
            Criar Time <RiTeamFill />
          </PlButton>
        )}

        {/* Verificação de jogador */}
        {checkingData ? (
          <PlButton hierarchy="secondary" fontSize={24} disabled>
            <FaSpinner className="animate-spin mr-2" /> Verificando...
          </PlButton>
        ) : hasPlayer ? (
          <PlButton hierarchy="secondary" fontSize={24} onClick={() => router.push(`/jogadores/${player.nickname}`)}>
            Acessar Meu Jogador <IoPerson />
          </PlButton>
        ) : (
          <PlButton hierarchy="secondary" fontSize={24} onClick={() => handleButtonClick("createPlayer")}>
            Criar Jogador <IoPerson />
          </PlButton>
        )}
        {checkingData ? (
          <PlButton hierarchy="secondary" fontSize={24} disabled>
            <FaSpinner className="animate-spin mr-2" /> Verificando...
          </PlButton>
          
        ): user &&(
          <PlButton hierarchy="secondary" fontSize={24} onClick={() => router.push('/times/seus-convites')}>
            Seus convites de Time <FaBasketball />
          </PlButton>  
        )
        }
      </div>

      <div>
        <Image src="/img/wemby.png" alt="ball" width={600} height={800} />
      </div>
      <PlModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)}>
        <h2 className="text-xl font-bold font-[Poppins]">Crie seu Time</h2>
        <p className="text-gray-400">Preencha as informações para criar um time</p>
        <div className="mt-4 flex flex-col gap-y-8 overflow-auto">
        <div className="relative flex items-center">
          <RxLetterCaseCapitalize className="absolute left-4 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Nome do Time"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border p-4 pl-12 rounded-3xl w-full"
          />
        </div> 
          <div className="relative flex items-center">
            <FaMapPin className="absolute left-4 text-gray-500 text-xl"/>
          <input
            type="text"
            placeholder="Cidade"
            value={teamCity}
            onChange={(e) => setTeamCity(e.target.value)}
            className="border p-4 pl-12 rounded-3xl w-full"
          />
          </div>
          <div className="relative flex items-center">
            <FaLandmarkFlag className="absolute left-4 text-gray-500 text-xl"/>
          <input
            type="text"
            placeholder="Estado"
            value={teamState}
            onChange={(e) => setTeamState(e.target.value)}
            className="border p-4 pl-12 rounded-3xl w-full"
          />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <PlButton hierarchy="primary" onClick={handleCreateTeam} disabled={loading}>
            {loading ? "Criando..." : "Criar Time"}
          </PlButton>
        </div>
      </PlModal>

      {/* Modal de Criação de Jogador */}
      <PlModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold">Criar Jogador</h2>
        <div className="mt-4 flex flex-col gap-y-8 overflow-auto">
          <input type="text" placeholder="Nome Completo" value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="border p-6 rounded-xl" />
          <input type="text" placeholder="Nickname de Jogador" value={nickname} onChange={(e) => setNickname(e.target.value)} className="border p-6 rounded-xl" />
          <input type="number" placeholder="Número da Camisa" value={jerseyNumber} onChange={(e) => setJerseyNumber(e.target.value)} className="border p-6 rounded-xl" />
          <select value={position} onChange={(e) => setPosition(e.target.value)} className="border p-6 rounded-xl">
            <option value="">Posição em que Joga</option>
            <option value="Armador">Armador</option>
            <option value="Ala-Armador">Ala-Armador</option>
            <option value="Ala">Ala</option>
            <option value="Ala-Pivô">Ala-Pivô</option>
            <option value="Pivô">Pivô</option>
          </select>
          <input type="text" placeholder="Altura em CM" value={height} onChange={(e) => setHeight(e.target.value)} className="border p-6 rounded-xl" />
          <input type="text" placeholder="Idade" value={age} onChange={(e) => setAge(e.target.value)} className="border p-6 rounded-xl" />
          <input type="text" placeholder="Peso em KG" value={weight} onChange={(e) => setWeight(e.target.value)} className="border p-6 rounded-xl" />
          {error && <p className="text-red-500">{error}</p>}
          <PlButton hierarchy="primary" onClick={handleCreatePlayer} disabled={loading}>
            {loading ? "Criando..." : "Criar Jogador"}
          </PlButton>
        </div>
      </PlModal>
    </div>
  );
}
