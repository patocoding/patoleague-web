"use client";
import { useState } from "react";
import AdminChampionships from "../components/admin/AdminChampionships";
import AdminTeams from "../components/admin/AdminTeams";
import AdminMatches from "../components/admin/AdminMatches";
import AdminStandings from "../components/admin/AdminStandings";
import AdminPlayers from "../components/admin/AdminPlayers";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("championships");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>

      {/* Tabs de navegação */}
      <div className="flex space-x-4 border-b pb-2 mb-4">
        {["championships", "teams", "matches", "standings", "players"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Renderiza o componente da aba ativa */}
      {activeTab === "championships" && <AdminChampionships />}
      {activeTab === "teams" && <AdminTeams />}
      {activeTab === "matches" && <AdminMatches />}
      {activeTab === "standings" && <AdminStandings />}
      {activeTab === "players" && <AdminPlayers />}
    </div>
  );
}
