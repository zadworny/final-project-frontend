"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AuthModal from "./authModal";

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="text-white font-bold text-xl">
          <Link href="/" className="text-white hover:text-gray-300">
            <Image
              src="/logo.png"
              alt="Auction App Logo"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>
        <div className="flex items-center space-x-10 font-bold">
          <Link href="/create" className="text-white hover:text-gray-400">
            Create Auction
          </Link>
          <Link
            href="/manage-auctions"
            className="text-white hover:text-gray-400"
          >
            Manage Auctions
          </Link>
          <Link href="/my-wins" className="text-white hover:text-gray-400">
            My Wins
          </Link>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="text-white hover:text-gray-300"
          >
            Sign In
          </button> */}
        </div>
        <ConnectButton />
      </div>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navigation;
