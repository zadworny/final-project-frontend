// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Auction, auctions } from '@/library/components/mockdb';

const AuctionCard = ({ id, name, image, currentBid, endTime, status }: Auction) => (
  <Link href={`/auction/${id}`} className="block">
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative w-full h-48">
        <Image 
          src={image} 
          alt={name} 
          fill
          style={{objectFit: "cover"}}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'ongoing' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {status === 'ongoing' ? 'Ongoing' : 'Completed'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 font-semibold">Current Bid: Ξ{currentBid}</p>
        <p className="text-sm text-gray-500 font-semibold">Ends: {new Date(endTime).toLocaleString()}</p>
      </div>
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className='text-gray-900'>
      <h1 className="text-3xl font-bold mb-6">Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}
      </div>
    </div>
  );
}