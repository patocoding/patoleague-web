// types/PlayerMatchStats.ts
import { Player } from './Player';
import { Match } from './Match';

export interface PlayerMatchStats {
  id: number;
  player: Player;
  match: Match;

  fgm: number;
  fga: number;
  fgPercent: number;

  threePm: number;
  threePa: number;
  threePPercent: number;

  ftm: number;
  fta: number;
  ftPercent: number;

  oreb: number;
  dreb: number;
  treb: number;

  ast: number;
  stl: number;
  blk: number;
}
