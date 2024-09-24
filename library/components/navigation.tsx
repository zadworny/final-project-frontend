"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AuthModal from "./authModal";
import axios from "axios";
import { useAccount } from "wagmi";

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      connectWallet(address);
    }
  }, [isConnected, address]);

  const connectWallet = async (walletAddress: string) => {
    try {
      const response = await axios.post("/connectwallet", {
        walletAddress: walletAddress,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      console.log("Wallet connected and user logged in");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

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
        </div>
        <ConnectButton />
      </div>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navigation;