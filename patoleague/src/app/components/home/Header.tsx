"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMenu, FiLogOut, FiX } from "react-icons/fi";
import { FaChevronDown, FaHome } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { GiBasketballJersey } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useDispatch } from "react-redux";
import { signOut } from "../../../redux/slices/userSlice";
import { FaBasketballBall } from "react-icons/fa";
import Dropdown from "../dropdown/Dropdown";
import './header.css'
export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuthentication();
  console.log(user)
  const [menuOpen, setMenuOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  console.log(optionsOpen)
  const [dropdown, setDropdown] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const logoutUser = () => {
    dispatch(signOut());
    setMenuOpen(false);
    setOptionsOpen(false);
    router.push("/auth");
  };

  const handleChangeRoute = (route) => {
    router.push(route);
    setMenuOpen(false);
    setOptionsOpen(false);
  };

  const toggleDropdown = (section) => {
    setDropdown(dropdown === section ? null : section);
  };

  if (!hasMounted) return null;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center font-[Inter] p-2 md:p-0   bg-white rounded-xl shadow-md w-full">
      {/* Logo */}
      <div className="flex items-center md:pl-6">
        <Image src="/img/basketball.png" alt="ball" width={50} height={50} />
        <p className="text-amber-700 font-bold text-2xl ml-2">PL</p>
      </div>

     {/* Menu Desktop */}
<div className="hidden md:flex">
  <ul className="flex font-medium text-lg text-zinc-600">
    <li className="menu-item" onClick={() => handleChangeRoute("/")}>
      Início
    </li>

    {/* Dropdown Campeonato */}
    <Dropdown
      title="Campeonato"
      items={[
        { label: "Classificação", route: "/classificacao" },
        { label: "Tabela de Jogos", route: "/tabela-jogos" },
        { label: "Técnicos", route: "/tecnicos" },
        { label: "Árbitros", route: "/arbitros" },
      ]}
      onItemClick={handleChangeRoute}
    />

    <li className="menu-item" onClick={() => handleChangeRoute("/times")}>
      Equipes
    </li>
    <li className="menu-item" onClick={() => handleChangeRoute("/jogadores")}>
      Atletas
    </li>
    <li className="menu-item" onClick={() => handleChangeRoute("/estatisticas")}>
      Estatísticas
    </li>
  </ul>
</div>


      {/* Ícone de Menu Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(true)}>
          <FiMenu size={30} />
        </button>
      </div>

      {/* SideSheet do Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop escuro ao fundo */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* SideSheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-[#f3ece4] shadow-lg z-50 flex flex-col items-center py-6"
            >
              {/* Botão de Fechar */}
              <div className="flex justify-between w-full px-4">
                <FiX size={30} className="cursor-pointer text-orange-500" onClick={() => setMenuOpen(false)} />
              </div>

              {/* Menu Mobile */}
              <ul className="flex flex-col gap-y-8 p-4 mt-6 font-medium text-lg text-zinc-800 w-full text-center">
                <li className="flex items-center justify-center gap-x-4 hover:text-orange-500 duration-200 cursor-pointer" onClick={() => handleChangeRoute("/")}>
                  <FaHome /> Início
                </li>

                {/* Dropdown Campeonato no Mobile */}
                <li className="flex items-center justify-center gap-x-4 hover:text-orange-500 duration-200 cursor-pointer" onClick={() => toggleDropdown("campeonato")}>
                  <FaBasketballBall /> <span className="">Campeonato</span> <FaChevronDown/>
                </li>
                {dropdown === "campeonato" && (
                  <motion.ul className="pl-6 flex flex-col text-gray-700">
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleChangeRoute("/classificacao")}>
                      Classificação
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleChangeRoute("/tabela-jogos")}>
                      Tabela de Jogos
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleChangeRoute("/tecnicos")}>
                      Técnicos
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleChangeRoute("/arbitros")}>
                      Árbitros
                    </li>
                  </motion.ul>
                )}

                <li className="hover:text-orange-500 duration-200 flex items-center justify-center gap-x-4 cursor-pointer" onClick={() => handleChangeRoute("/times")}>
                  <FaPeopleLine /> Times
                </li>
                <li className="hover:text-orange-500 duration-200 flex items-center justify-center gap-x-4 cursor-pointer" onClick={() => handleChangeRoute("/jogadores")}>
                  <GiBasketballJersey /> Jogadores
                </li>
              </ul>

              {/* Botão de Logout */}
              {isAuthenticated ? (
                <button className="bg-red-500 px-6 py-2 rounded-2xl font-bold text-white flex items-center gap-2 mt-6" onClick={logoutUser}>
                  <FiLogOut /> Logout
                </button>
              ) : (
                <button className="bg-orange-500 px-6 py-2 rounded-2xl font-bold text-white flex items-center gap-2 mt-6" onClick={() => handleChangeRoute("/auth")}>
                  <FiLogOut /> Fazer Login
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    <div className="hidden md:flex justify-end">
    {isAuthenticated ? (
                    <button className="bg-red-500 px-6 py-2 rounded-2xl font-bold text-white flex items-center gap-2 mt-6" onClick={logoutUser}>
                      <FiLogOut /> Logout
                    </button>
                  ) : (
                    <button className="bg-orange-500 px-6 py-2 rounded-2xl font-bold text-white flex items-center gap-2 mt-6" onClick={() => handleChangeRoute("/auth")}>
                      <FiLogOut /> Fazer Login
                    </button>
                  )}
    </div>
    </div>
  );
}
