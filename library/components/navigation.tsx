'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navigation = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white font-bold text-xl">Auction App</div>
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link href="/create" className="text-white hover:text-gray-300">
          Create Auction
        </Link>
        <ConnectButton />
      </div>
    </div>
  </nav>
);

export default Navigation;