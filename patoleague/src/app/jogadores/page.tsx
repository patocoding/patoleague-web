"use client";

import Header from "../components/home/Header";
import PlayersList from "../components/player/PlayerList";

export default function PlayersPage() {
  return (
    <>
      <Header/>
      <div className=" min-h-screen p-10">
      <PlayersList />
    </div>
    </>
  );
}