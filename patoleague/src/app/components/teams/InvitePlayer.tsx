import { useState } from "react";
import api from "@/config/axios";
import { useAuthentication } from "@/hooks/useAuthentication";

export default function InvitePlayer({ teamId }) {
  const [nickname, setNickname] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useAuthentication()

  // 🔍 Função para buscar jogadores conforme o usuário digita
  const handleSearch = async (query) => {
    setNickname(query);
    if (query.length < 1) return setSuggestions([]);

    try {
      const response = await api.get(`/players/search/${query}`);
      setSuggestions(response.data);
    } catch (error) {
      setSuggestions([]);
    }
  };

  // 📌 Quando um jogador é selecionado na lista de sugestões
  const selectPlayer = (player) => {
    setSelectedPlayer(player);
    setNickname(player.nickname);
    setSuggestions([]);
  };

  // 📤 Enviar convite ao jogador selecionado
  const handleInvite = async () => {
    if (!selectedPlayer) return setMessage("Selecione um jogador válido.");

    try {
      await api.post("/team-invites/invite", {
        teamId,
        playerId: selectedPlayer.id,
        invitedById: user.id
      });
      setMessage(`Convite enviado para ${selectedPlayer.nickname}!`);
    } catch (error) {
      setMessage("Erro ao enviar convite.");
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-2">Convidar Jogador</h2>
      <input
        type="text"
        placeholder="Digite o nickname"
        value={nickname}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
      
      {/* Lista de sugestões */}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 w-full shadow-md max-h-40 overflow-y-auto">
          {suggestions.map((player) => (
            <li
              key={player.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => selectPlayer(player)}
            >
              {player.nickname} ({player.name})
            </li>
          ))}
        </ul>
      )}

      {/* Botão de envio */}
      <button
        onClick={handleInvite}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Enviar Convite
      </button>

      {message && <p className="mt-2 text-center text-green-500">{message}</p>}
    </div>
  );
}
