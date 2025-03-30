
import { ChampionshipTeam } from "./ChampionshipTeam";
import { Player } from "./Player";
import { TeamInvite } from "./TeamInvite";
import { User } from "./User";


export interface Team  {
    id: number;
    name: string;
    city: string;
    state: string;
    foundedYear: number;
    championshipsWon: number;
    players: Player[];
    owners: User[];
    championshipTeams: ChampionshipTeam[];
    createdBy: User;
    createdAt: string;
    updatedAt: string;
    allTimePoints: number;
    invites: TeamInvite[];
    photoUrl: string;
};