import { PlayerMatchStats } from "./PlayerMatchStats";
import { PlayerTeam } from "./PlayerTeam";
import { Team } from "./Team";
import { User } from "./User";

export interface Player {
    id: number;
    name: string;
    nickname: string | null;
    jerseyNumber: number | null;
    position: string;
    height: number | null;
    weight: number | null;
    age: number | null;
    pointsPerGame: number;
    assistsPerGame: number;
    reboundsPerGame: number;
    totalPoints: number;
    totalAssists: number;
    totalRebounds: number;
    team: Team | null;
    user: User;
    matchStats: PlayerMatchStats[];
    createdAt: string; 
    updatedAt: string;
    gamesPlayed: number | null;
    playerTeams: PlayerTeam[];
    photoUrl: string | null;
  }