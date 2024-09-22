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

  const auction = auctions.find((a) => a.id === Number(id));

  if (!auction) {
    return <div>Auction not found</div>;
  }

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    const bid = parseFloat(bidAmount);
    if (bid <= auction.currentBid) {
      setError(`Bid must be higher than the current bid of $${auction.currentBid}`);
    } else if (balance && bid > parseFloat(balance.formatted)) {
      setError(`Bid cannot exceed your wallet balance of ${balance.formatted} ${balance.symbol}`);
    } else {
      console.log(`Placed bid of $${bid}`);
      setError('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 bg-gray-200">
            <div className="relative w-full h-[500px]">
              <Image 
                src={auction.image} 
                alt={auction.title} 
                fill 
                style={{ objectFit: 'contain' }} 
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="rounded-t-md md:rounded-none"
              />
            </div>
          </div>

          {/* Details and Bidding Section */}
          <div className="md:w-1/2 p-8 bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{auction.title}</h1>
            <p className="text-lg text-gray-800 mb-4">{auction.description}</p>
            <div className="mb-6">
              <p className="text-2xl font-semibold text-gray-900">Current Bid: ${auction.currentBid}</p>
              <p className="text-sm text-gray-600">Auction ends: {new Date(auction.endTime).toLocaleString()}</p>
            </div>

            {isConnected ? (
              <form onSubmit={handleBid} className="mt-6">
                <div className="mb-6">
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">Your Bid</label>
                  <input
                    type="number"
                    id="bidAmount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="input" // Using the global .input class
                    placeholder="Enter bid amount"
                    min={auction.currentBid}
                    step="0.01"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-full" // Using the global .btn class
                >
                  Place Bid
                </button>
                {error && <p className="text-error">{error}</p>} {/* Using the global .text-error class */}
              </form>
            ) : (
              <p className="mt-6 text-center text-gray-700">Please connect your wallet to place a bid.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}