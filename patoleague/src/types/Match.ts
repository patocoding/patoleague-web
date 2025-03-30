// types/Match.ts
import { Team } from './Team';
import { PlayerMatchStats } from './PlayerMatchStats';
import { Championship } from './Championship';

export type MatchStatus = 'Agendado' | 'Em andamento' | 'Finalizado';

export interface Match {
  id: number;
  championship: Championship
  teamHome: Team;
  teamAway: Team;
  date: string; // ou Date, dependendo da conversão no front
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  createdAt: string;
  updatedAt: string;
  playerStats: PlayerMatchStats[];
}
