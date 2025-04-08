import { Championship } from "./Championship";
import { Team } from "./Team";

export type ChampionshipTeam = {
    id: number;
    championship: Championship;
    team: Team;
    joinedAt: Date;
}