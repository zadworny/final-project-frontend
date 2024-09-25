'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContract } from '@/library/contexts/ContractContext';

interface Auction {
  itemId: number;
  owner: string;
  name: string;
  description: string;
  price: number;
  highestBidder: string;
  highestBidPrice: number;
  expiryDate: number;
  isSold: boolean;
  imageUrl: string;
}

const AuctionCard = ({ item, price }: { item: Auction; price: number }) => {
  const { itemId, name, imageUrl, highestBidPrice, expiryDate, isSold } = item;

  const isExpired = expiryDate * 1000 <= Date.now();
  const status = isSold ? 'completed' : isExpired ? 'expired' : 'ongoing';

  return (
    <Link href={`/auction/${itemId}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
              status === 'ongoing' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {status === 'ongoing' ? 'Ongoing' : 'Completed'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 font-semibold">
            Current Bid: Ξ{highestBidPrice.toFixed(4)}{' '}
            <span className="text-gray-400 font-normal">
              &nbsp;${(price * highestBidPrice).toFixed(2)}
            </span>
          </p>
          <p className="text-sm text-gray-500 font-semibold">
            Ends: {new Date(expiryDate * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const { client, price, fetchAuctions } = useContract();

  const [auctionItems, setAuctionItems] = useState<Auction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait until the client is initialized
    if (!client) {
      console.log('Client not ready yet.');
      return;
    }

    const getAuctions = async () => {
      try {
        const auctions = await fetchAuctions();
        setAuctionItems(auctions);
      } catch (err) {
        console.error('Error fetching auctions:', err);
        setError('Failed to load auctions');
      } finally {
        setLoading(false);
      }
    };
    getAuctions();
  }, [fetchAuctions, client]);

  if (loading) {
    return <div>Loading auctions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctionItems.map((auction) => (
          <AuctionCard key={auction.itemId} item={auction} price={price} />
        ))}
      </div>

      <p className={price == 0 ? 'text-red-500' : ''}>
        <br />
        Latest ETH/USD Price: <span className="text-gray-400">&nbsp;${price.toFixed(2)}</span>
      </p>
    </div>
  );
}
