"use client";

import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navigation = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <Link href="/" className="text-white hover:text-gray-300">
          <Image
            src="/logo.png" // Path to the image file in the 'public' directory
            alt="Auction App Logo"
            width={150} // Adjust width as needed
            height={50} // Adjust height as needed
            priority // Ensures the image loads quickly
          />
        </Link>
      </div>
      <div className="flex items-center space-x-8">
        <Link href="/create" className="text-white hover:text-gray-300">
          Create Auction
        </Link>
        <Link
          href="/manage-auctions"
          className="text-white hover:text-gray-300"
        >
          Manage Auctions
        </Link>
        <ConnectButton />
      </div>
    </div>
  </nav>
);

export default Navigation;
