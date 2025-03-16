import { useState } from "react";
import api from "@/config/axios";

export default function ChampionshipToggle({ championshipId, initialStatus }) {
  const [isActive, setIsActive] = useState(initialStatus);

  const handleToggle = async () => {
    try {
      const updatedStatus = !isActive;
      await api.patch(`/championships/${championshipId}`, { isActive: updatedStatus });
      setIsActive(updatedStatus);
    } catch (error) {
      console.error("Erro ao atualizar status do campeonato:", error);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={isActive}
        onChange={handleToggle}
      />
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          isActive ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
            isActive ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="ml-2 text-sm font-medium">{isActive ? "Ativo" : "Inativo"}</span>
    </label>
  );
}
