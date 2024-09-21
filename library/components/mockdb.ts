// lib/mockDatabase.ts
export interface Auction {
  id: number;
  title: string;
  image: string;
  currentBid: number;
  endTime: string;
  description: string;
}

export const auctions: Auction[] = [
  { 
    id: 1, 
    title: "Vintage Watch", 
    image: "/watch.jpeg", 
    currentBid: 0.2, 
    endTime: "2024-10-01T15:00:00",
    description: "A beautiful vintage watch from the 1960s."
  },
  { 
    id: 2, 
    title: "Antique Vase", 
    image: "/vase.webp", 
    currentBid: 200, 
    endTime: "2024-10-02T18:00:00",
    description: "An exquisite antique vase from the Ming dynasty."
  },
  { 
    id: 3, 
    title: "Rare Coin", 
    image: "/coin.jpg", 
    currentBid: 500, 
    endTime: "2024-10-03T12:00:00",
    description: "A rare gold coin from ancient Rome."
  },
];