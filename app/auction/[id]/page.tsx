'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAccount, useBalance } from 'wagmi';
import Image from 'next/image';
import { auctions } from '@/library/components/mockdb';

export default function AuctionDetails() {
  const { id } = useParams();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  const auction = auctions.find(a => a.id === Number(id));

  if (!auction) {
    return <div>Auction not found</div>;
  }

  // there is an error with this, it isn't working well
  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    const bid = parseFloat(bidAmount);
    if (bid <= auction.currentBid) {
      setError(`Bid must be higher than the current bid of $${auction.currentBid}`);
    } else if (balance && bid > parseFloat(balance.formatted)) {
      setError(`Bid cannot exceed your wallet balance of ${balance.formatted} ${balance.symbol}`);
    } else {
      // Send bid to backend
      console.log(`Placed bid of $${bid}`);
      setError('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row ">
          {/* Image Section */}
          <div className="md:w-1/2 bg-gray-300">
            <div className="relative w-full h-[500px]">
              <Image 
                src={auction.image} 
                alt={auction.title} 
                fill
                style={{objectFit: "contain"}}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          
          {/* Details and Bidding Section */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">{auction.title}</h1>
            <p className="text-gray-600 mb-4">{auction.description}</p>
            <div className="mb-4">
              <p className="text-xl font-semibold">Current Bid: ${auction.currentBid}</p>
              <p className="text-sm text-gray-500">Auction ends: {new Date(auction.endTime).toLocaleString()}</p>
            </div>
            {isConnected ? (
              <form onSubmit={handleBid} className="mt-6">
                <div className="mb-4">
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">Your Bid</label>
                  <input
                    type="number"
                    id="bidAmount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                    placeholder="Enter bid amount"
                    min={auction.currentBid + 1}
                    step="0.01"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                  Place Bid
                </button>
                {error && <p className="mt-2 text-red-500">{error}</p>}
              </form>
            ) : (
              <p className="mt-4 text-center text-gray-600">Please connect your wallet to place a bid.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}