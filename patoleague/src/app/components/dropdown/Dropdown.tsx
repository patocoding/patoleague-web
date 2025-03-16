"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import '../home/header.css'

export default function Dropdown({ title, items, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group z-50 ">
      <button className="menu-item" onClick={() => setIsOpen(!isOpen)}>
        {title} <FaChevronDown />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 border border-white  bg-[#0c2f37] shadow-lg rounded-md w-60 flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <ul className="text-gray-700">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-orange-400 text-white cursor-pointer flex justify-between duration-200"
                  onClick={() => {
                    onItemClick(item.route);
                    setIsOpen(false);
                  }}
                >
                  {item.label} <FaChevronRight />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
