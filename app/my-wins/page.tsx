// app/my-wins/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';
import { auctions, Auction } from '@/library/components/mockdb';

const WonAuctionCard = ({ auction }: { auction: Auction }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-48">
      <Image
        src={auction.image}
        alt={auction.name}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{auction.name}</h3>
      <p className="text-green-600 font-semibold">Winning Bid: ${auction.currentBid}</p>
      <p className="text-sm text-gray-500">Ended: {new Date(auction.endTime).toLocaleString()}</p>
      <Link href={`/auction/${auction.id}`} className="mt-2 inline-block text-blue-600 hover:underline">
        View Details
      </Link>
    </div>
  </div>
);

export default function MyWins() {
  const { address } = useAccount();
  const [wonAuctions, setWonAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const userWonAuctions = auctions.filter(
      auction => auction.status === 'completed' && auction.winnerId === address
    );
    setWonAuctions(userWonAuctions);
  }, [address]);

  if (!address) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-gray-700">Please connect your wallet to view your wins.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Won Auctions</h1>
      {wonAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wonAuctions.map(auction => (
            <WonAuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-700 text-center">You haven't won any auctions yet. Keep bidding!</p>
      )}
    </div>
  );
}