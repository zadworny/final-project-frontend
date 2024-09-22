'use client';

import { useState } from 'react';
import Image from 'next/image';
import { userAuctions, UserAuction } from '@/library/components/userAuctionsMockData';

export default function ManageAuctions() {
  const [selectedAuction, setSelectedAuction] = useState<UserAuction | null>(null);
  const [newEndTime, setNewEndTime] = useState('');

  const handleExtendAuction = () => {
    if (selectedAuction && newEndTime) {
      // In a real application, you would send this update to your backend
      console.log(`Extending auction ${selectedAuction.id} to ${newEndTime}`);
      alert('Auction extended successfully!');
      setNewEndTime('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-[#171717]">
      {/* Sidebar with auction list */}
      <div className="w-1/4 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Your Auctions</h2>
        {userAuctions.map((auction) => (
          <div
            key={auction.id}
            className={`p-2 mb-2 cursor-pointer rounded ${
              selectedAuction?.id === auction.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => setSelectedAuction(auction)}
          >
            <h3 className="font-semibold">{auction.title}</h3>
            <p className="text-sm text-gray-600">Current Bid: ${auction.currentBid}</p>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {selectedAuction ? (
          <div>
            <div className="flex mb-6">
              <div className="w-1/3 mr-6">
                <Image
                  src={selectedAuction.image}
                  alt={selectedAuction.title}
                  width={300}
                  height={300}
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="w-2/3">
                <h1 className="text-3xl font-bold mb-4">{selectedAuction.title}</h1>
                <p className="text-gray-600 mb-4">{selectedAuction.description}</p>
                <p className="font-semibold">Current Bid: ${selectedAuction.currentBid}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Ends: {new Date(selectedAuction.endTime).toLocaleString()}
                </p>

                {/* Extend auction form */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Extend Auction</h3>
                  <input
                    type="datetime-local"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="border rounded p-2 mr-2"
                  />
                  <button
                    onClick={handleExtendAuction}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Extend
                  </button>
                </div>
              </div>
            </div>

            {/* Bids list */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Bids</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left">Bidder</th>
                    <th className="border p-2 text-left">Amount</th>
                    <th className="border p-2 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAuction.bids.map((bid, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">{bid.bidder}</td>
                      <td className="border p-2">${bid.amount}</td>
                      <td className="border p-2">{new Date(bid.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Select an auction to view details</p>
        )}
      </div>
    </div>
  );
}