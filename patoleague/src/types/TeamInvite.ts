import { Player } from "./Player";
import { Team } from "./Team";
import { User } from "./User";

export interface TeamInvite {
    id: number;
    status: 'pending' | 'accepted' | 'declined';
    invitedBy: User;
    createdAt: string;
    player: Player;
    team: Team;
}