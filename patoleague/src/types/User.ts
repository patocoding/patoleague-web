import { Player } from './Player'
import { Team } from "./Team";

export interface User  {
    id: string;
    fullName: string;
    email: string;
    teams: Team[];
    player: Player;
    isAdmin: boolean;
    team: Team;
}