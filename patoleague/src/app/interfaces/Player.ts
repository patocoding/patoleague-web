export interface Player {
    id: number;
    name: string;
    nickname: string;
    team?: {
      name: string;
    };
    jerseyNumber: number;
    position: string;
    height: number;
    weight: number;
    age: number;
    totalPoints: number;
    totalAssists: number;
    totalRebounds: number;
  }