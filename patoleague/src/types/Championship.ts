// types/Championship.ts
import { Match } from './Match';
import { ChampionshipTeam } from './ChampionshipTeam';

export type ChampionshipFormat = '5v5' | '3v3';

export interface Championship {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string | null;
  matches: Match[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  championshipTeams: ChampionshipTeam[];
  format: ChampionshipFormat;
}
