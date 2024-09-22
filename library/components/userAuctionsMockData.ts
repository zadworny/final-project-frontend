
export interface Bid {
  bidder: string;
  amount: number;
  timestamp: string;
}

export interface UserAuction {
  id: number;
  title: string;
  image: string;
  currentBid: number;
  endTime: string;
  description: string;
  bids: Bid[];
}

export const userAuctions: UserAuction[] = [
  {
    id: 1,
    title: "Vintage Watch",
    image: "/watch.jpeg",
    currentBid: 150,
    endTime: "2024-10-01T15:00:00",
    description: "A beautiful vintage watch from the 1960s.",
    bids: [
      { bidder: "0x1234...5678", amount: 150, timestamp: "2024-09-15T10:30:00" },
      { bidder: "0x8765...4321", amount: 140, timestamp: "2024-09-14T14:45:00" },
    ]
  },
  {
    id: 2,
    title: "Antique Vase",
    image: "/vase.webp",
    currentBid: 200,
    endTime: "2024-10-02T18:00:00",
    description: "An exquisite antique vase from the Ming dynasty.",
    bids: [
      { bidder: "0x2345...6789", amount: 200, timestamp: "2024-09-16T09:15:00" },
      { bidder: "0x9876...5432", amount: 180, timestamp: "2024-09-15T11:20:00" },
    ]
  },
  {
    id: 3,
    title: "Rare Coin",
    image: "/coin.jpg",
    currentBid: 500,
    endTime: "2024-10-03T12:00:00",
    description: "A rare gold coin from ancient Rome.",
    bids: [
      { bidder: "0x3456...7890", amount: 500, timestamp: "2024-09-17T16:45:00" },
      { bidder: "0x0987...6543", amount: 480, timestamp: "2024-09-16T13:30:00" },
    ]
  },
];