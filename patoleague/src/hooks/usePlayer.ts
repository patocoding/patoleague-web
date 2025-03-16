import { useEffect, useState } from "react";
import api from "@/config/axios";
import { useAuthentication } from "@/hooks/useAuthentication";

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
}

export function usePlayer() {
  const { user } = useAuthentication();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      checkIfUserHasPlayer(user.id);
    }
  }, [user]);

  async function checkIfUserHasPlayer(userId: number) {
    try {
      const response = await api.get(`/players/user/${userId}`);
      if (response.data) {
        setPlayer(response.data);
      }
    } catch (error) {
      console.error("Erro ao verificar jogador:", error);
    } finally {
      setLoading(false);
    }
  }

  return { player, hasPlayer: !!player, loading };
}