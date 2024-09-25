// app/auction/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAccount, useBalance } from 'wagmi';
import Image from 'next/image';
import { useContract, Auction } from '@/library/contexts/ContractContext';

export default function AuctionDetails() {
  const { id } = useParams();
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const { price, placeBid, fetchAuctionById } = useContract();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAuction = async () => {
      try {
        const auctionData = await fetchAuctionById(Number(id));
        setAuction(auctionData);
      } catch (err) {
        console.error('Error fetching auction:', err);
        setError('Failed to load auction');
      } finally {
        setLoading(false);
      }
    };
    getAuction();
  }, [fetchAuctionById, id]);

  if (loading) {
    return <div>Loading auction...</div>;
  }

  if (!auction) {
    return <div>{error || 'Auction not found'}</div>;
  }

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault();
    const bid = parseFloat(bidAmount);

    if (bid <= auction.highestBidPrice) {
      setError(`Bid must be higher than the current bid of Ξ${auction.highestBidPrice}`);
    } else if (balance && bid > parseFloat(balance.formatted || '0')) {
      setError(`Bid cannot exceed your wallet balance of ${balance.formatted} ${balance.symbol}`);
    } else {
      try {
        await placeBid(auction.itemId, bid);
        alert(`Placed bid of Ξ${bid}`);
        setError('');
        setBidAmount('');
        // Optionally, refresh the auction data
        const updatedAuction = await fetchAuctionById(auction.itemId);
        setAuction(updatedAuction);
      } catch (err) {
        setError('Error placing bid, please try again.');
        console.error('Error during placing bid:', err);
      }
    }
  };

  const isExpired = auction.expiryDate * 1000 <= Date.now();
  const status = auction.isSold ? 'completed' : isExpired ? 'expired' : 'ongoing';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 bg-gray-200">
            <div className="relative w-full h-[500px]">
              <Image 
                src={auction.imageUrl} 
                alt={auction.name} 
                fill 
                style={{ objectFit: 'contain' }} 
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="rounded-t-md md:rounded-none"
              />
            </div>
          </div>

          {/* Details and Bidding Section */}
          <div className="md:w-1/2 p-8 bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{auction.name}</h1>
            <p className="text-lg text-gray-800 mb-4">{auction.description}</p>
            <div className="mb-6 space-y-2">
              <p className="text-2xl font-semibold text-gray-900 ">
                Current Bid: Ξ{auction.highestBidPrice.toFixed(4)} 
                <span className="text-gray-400 font-normal">
                  &nbsp;${(price * auction.highestBidPrice).toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600 font-semibold">
                Start Time: {new Date(auction.expiryDate * 1000 - 7 * 24 * 3600 * 1000).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 font-semibold">
                End Time: {new Date(auction.expiryDate * 1000).toLocaleString()}
              </p>
              <p className={`text-sm font-semibold ${status === 'ongoing' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {status.charAt(0).toUpperCase() + status.slice(1)}
              </p>
            </div>

            {status === 'ongoing' ? (
              isConnected ? (
                <form onSubmit={handleBid} className="mt-6">
                  <div className="mb-6">
                    <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 pb-2">
                      Your Bid
                    </label>
                    <input
                      type="number"
                      id="bidAmount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="input"
                      placeholder="Enter bid amount"
                      min={auction.highestBidPrice + 0.0001} // To ensure bid is higher
                      step="0.0001"
                      required
                    />
                  </div>
                  <button type="submit" className="btn w-full">
                    Place Bid
                  </button>
                  {error && <p className="text-error mt-2">{error}</p>}
                </form>
              ) : (
                <p className="mt-6 text-center text-gray-700">Please connect your wallet to place a bid.</p>
              )
            ) : (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Auction Ended</h2>
                <p className="text-gray-700">
                  Winning Bid: <span className="font-semibold">Ξ{auction.highestBidPrice}</span>
                </p>
                <p className="text-gray-700">
                  Winner: <span className="font-semibold">{auction.highestBidder || 'No winner'}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className={price === 0 ? 'text-red-500' : 'text-gray-900'}>
        <br />
        Latest ETH/USD Price: <span className="text-gray-400">&nbsp;${price.toFixed(2)}</span>
      </p>
    </div>
  );
}
