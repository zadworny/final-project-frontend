"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  userAuctions,
  UserAuction,
} from "@/library/components/userAuctionsMockData";
import { useAccount } from 'wagmi';
import Link from "next/link";

export default function ManageAuctions() {
  const [selectedAuction, setSelectedAuction] = useState<UserAuction | null>(
    null
  );
  const [newEndTime, setNewEndTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { address } = useAccount();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExtendAuction = () => {
    if (selectedAuction && newEndTime) {
      // send to backend here
      console.log(`Extending auction ${selectedAuction.id} to ${newEndTime}`);
      alert("Auction extended successfully!");
      setNewEndTime("");
    }
  };

  const isAuctionEnded = (endTime: string) => {
    return new Date(endTime) < currentTime;
  };

  if (!address) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-gray-700">Please connect your wallet to view your wins.</p>
      </div>
    );
  }

  if (userAuctions.length === 0) {
    return (
      <div className="flex justify-center h-screen bg-gray-100 text-gray-900 pt-40">
        <div className="text-center">
          <p className="text-xl mb-4">You don't have any Auctions,</p>
          <span className="text-xl mb-4">
            Click{" "}
            <Link href={"/create"}>
              <button>here</button>
            </Link>{" "}
            to create one.
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100 text-[#171717]">
      {/* Sidebar with auction list */}
      <div className="w-1/4 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Your Auctions</h2>
        {userAuctions.map((auction) => (
          <div
            key={auction.id}
            className={`p-2 mb-2 cursor-pointer rounded ${
              selectedAuction?.id === auction.id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedAuction(auction)}
          >
            <h3 className="font-semibold">{auction.title}</h3>
            <p className="text-sm text-gray-600">
              Current Bid: ${auction.currentBid}
            </p>
            <p className="text-sm text-gray-600">
              Status: {isAuctionEnded(auction.endTime) ? <span className=" text-red-600 font-semibold">Ended</span> : <span className=" text-green-600 font-semibold">Active</span>}
            </p>
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
                <h1 className="text-3xl font-bold mb-4">
                  {selectedAuction.title}
                </h1>
                <p className="text-gray-600 mb-4">
                  {selectedAuction.description}
                </p>
                <p className="font-semibold">
                  Current Bid: ${selectedAuction.currentBid}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Ends: {new Date(selectedAuction.endTime).toLocaleString()}
                </p>

                {/* Extend auction form */}
                {!isAuctionEnded(selectedAuction.endTime) ? (
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
                ) : (
                  <p className="text-red-500 font-semibold">This auction has ended and cannot be extended.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Select an auction to view details
          </p>
        )}
      </div>
    </div>
  );
}