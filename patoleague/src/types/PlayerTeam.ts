import { Player } from "@/app/interfaces/Player";
import { User } from "./User";
import { Team } from "./Team";

export interface PlayerTeam  {
    id: number;
    player: Player;
    invitedBy: User;
    team: Team;
    createdAt: string;
}