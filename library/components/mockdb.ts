export interface Auction {
  id: number;
  name: string;
  image: string;
  // startBidPrice: number;
  currentBid: number;
  winnerId: string | null;
  status: 'ongoing' | 'completed';
  startTime: string;
  endTime: string;
  description: string;
}

export const auctions: Auction[] = [
  { 
    id: 1, 
    name: "Vintage Watch", 
    image: "/watch.jpeg", 
    // startBidPrice: 1.5,
    currentBid: 2.2, 
    winnerId: null,
    status: 'ongoing',
    startTime: "2024-09-01T15:00:00",
    endTime: "2024-10-01T15:00:00",
    description: "A beautiful vintage watch from the 1960s."
  },
  { 
    id: 2, 
    name: "Antique Vase", 
    image: "/vase.webp", 
    // startBidPrice: 150,
    currentBid: 2, 
    winnerId: null,
    status: 'ongoing',
    startTime: "2024-09-02T18:00:00",
    endTime: "2024-10-02T18:00:00",
    description: "An exquisite antique vase from the Ming dynasty."
  },
  { 
    id: 3, 
    name: "Rare Coin", 
    image: "/coin.jpg", 
    // startBidPrice: 400,
    currentBid: 5, 
    winnerId: "0xdeDcd4A8152F5fdf4bA4e7B95D12276A7685d4d1",
    status: 'completed',
    startTime: "2024-08-03T12:00:00",
    endTime: "2024-09-03T12:00:00",
    description: "A rare gold coin from ancient Rome."
  },
];