'use client'; // NEW

import Link from 'next/link';
import Image from 'next/image';
import { useContract } from '@/library/contexts/ContractContext'; // NEW 1/3
import { Auction, auctions } from '@/library/components/mockdb';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchAuctions = async (): Promise<Auction[]> => {
  const { data } = await axios.get('/api/auctions');
  return data.auctions;
};

const AuctionCard = ({ id, name, image, currentBid, endTime, status, price }: Auction & { price: number }) => ( // NEW (price added) + line 35
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
        <p className="text-gray-600 font-semibold">Current Bid: Ξ{currentBid} <span className="text-gray-400 font-normal">&nbsp;${(price * currentBid).toFixed(2)}</span></p>
        <p className="text-sm text-gray-500 font-semibold">Ends: {new Date(endTime).toLocaleString()}</p>
      </div>
    </div>
  </Link>
);

export default function Home() {
  const { price } = useContract(); // NEW 2/3
  // const { data: auctions, isLoading, error } = useQuery<Auction[], Error>({
  //   queryKey: ['auctions'],
  //   queryFn: fetchAuctions,
  // });

  // if (isLoading) {
  //   return <div className="text-center mt-8">Loading...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className="text-center mt-8">
  //       <p className="text-red-500 font-semibold">
  //         {error instanceof Error ? error.message : "Couldn't get all auctions. Something went wrong!"}
  //       </p>
  //     </div>
  //   );
  // }
  
  return (
    <div className='text-gray-900'>
      <h1 className="text-3xl font-bold mb-6">Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}
      </div>

      {/* NEW 3/3 */}
      <p className={price==0 ? 'text-red-500' : ''}>
        <br/>Latest ETH/USD Price: <span className="text-gray-400">&nbsp;${(price).toFixed(2)}</span>
      </p>
      
    </div>
  );
}
