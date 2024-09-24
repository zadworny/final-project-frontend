import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createPublicClient, http, parseEther } from 'viem';
import { sepolia } from 'viem/chains';
import { useAccount, useWalletClient } from 'wagmi';

export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_priceFeedAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "finalPrice",
				"type": "uint256"
			}
		],
		"name": "AuctionFinalized",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "emitETHUSDPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ethUsdPrice",
				"type": "uint256"
			}
		],
		"name": "ETHUSDPriceFetched",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_itemId",
				"type": "uint256"
			}
		],
		"name": "finalizeAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "ItemPosted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"name": "NewHighestBid",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "performData",
				"type": "bytes"
			}
		],
		"name": "performUpkeep",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_itemId",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			}
		],
		"name": "postItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "checkUpkeep",
		"outputs": [
			{
				"internalType": "bool",
				"name": "upkeepNeeded",
				"type": "bool"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLatestETHUSDPrice",
		"outputs": [
			{
				"internalType": "int256",
				"name": "price",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "itemCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "items",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "highestBidPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSold",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
export const CONTRACT_ADDRESS = '0x7194C573Ee4ed6E6DE8C4c03392024be658A0496';

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
  
  interface ContractContextType {
	client: any;
	price: number;
	fetchPrice: () => void;
	finalizeAuction: (itemId: number) => Promise<void>;
	placeBid: (itemId: number, bidAmount: number) => Promise<void>;
	fetchAuctions: () => Promise<Auction[]>;
  }
  
  const ContractContext = createContext<ContractContextType | undefined>(undefined);
  
  export const ContractProvider = ({ children }: { children: ReactNode }) => {
	const { address } = useAccount(); // Get user's address
	const { data: walletClient } = useWalletClient(); // Get the wallet client
	const [client, setClient] = useState<any>(null);
	const [price, setPrice] = useState<number>(0);
  
	useEffect(() => {
	  const clientInstance = createPublicClient({
		chain: sepolia,
		transport: http(),
	  });
	  console.log('Client instance created:', clientInstance);
	  setClient(clientInstance);
	}, []);
  
	const fetchPrice = async () => {
	  if (client) {
		try {
		  const result = await client.readContract({
			address: CONTRACT_ADDRESS,
			abi: CONTRACT_ABI,
			functionName: 'getLatestETHUSDPrice',
		  });
		  console.log('Contract call result:', result);
		  const adjustedPrice = Number(result) / 100000000;
		  const formattedPrice = adjustedPrice.toFixed(2);
		  setPrice(Number(formattedPrice));
		} catch (error) {
		  console.error('Error interacting with contract:', error);
		  setPrice(0);
		}
	  }
	};
  
	const placeBid = async (itemId: number, bidAmount: number) => {
	  try {
		if (!walletClient) {
		  throw new Error('No wallet client available');
		}
		if (!address) {
		  throw new Error('No account address available');
		}
		const txHash = await walletClient.writeContract({
		  address: CONTRACT_ADDRESS,
		  abi: CONTRACT_ABI,
		  functionName: 'placeBid',
		  args: [itemId],
		  value: parseEther(bidAmount.toString()),
		  account: address,
		  chain: sepolia,
		});
		console.log(`Bid of ${bidAmount} placed on item ${itemId}. Transaction hash: ${txHash}`);
	  } catch (error) {
		console.error('Error placing bid:', error);
		throw error; // Rethrow error to be handled by the calling function
	  }
	};
  
	const finalizeAuction = async (itemId: number) => {
	  try {
		if (!walletClient) {
		  throw new Error('No wallet client available');
		}
		if (!address) {
		  throw new Error('No account address available');
		}
		const txHash = await walletClient.writeContract({
		  address: CONTRACT_ADDRESS,
		  abi: CONTRACT_ABI,
		  functionName: 'finalizeAuction',
		  args: [itemId],
		  account: address,
		  chain: sepolia,
		});
		console.log(`Auction for item ${itemId} finalized. Transaction hash: ${txHash}`);
	  } catch (error) {
		console.error('Error finalizing auction:', error);
	  }
	};
  
	const fetchAuctions = async (): Promise<Auction[]> => {
	  if (!client) {
		throw new Error('No client available');
	  }
	  try {
		const itemCount = await client.readContract({
		  address: CONTRACT_ADDRESS,
		  abi: CONTRACT_ABI,
		  functionName: 'itemCount',
		});
		const auctions: Auction[] = [];
		for (let i = 0; i < itemCount; i++) {
		  const item = await client.readContract({
			address: CONTRACT_ADDRESS,
			abi: CONTRACT_ABI,
			functionName: 'items',
			args: [i],
		  });
		  auctions.push({
			itemId: item.itemId,
			owner: item.owner,
			name: item.name,
			description: item.description,
			price: Number(item.price),
			highestBidder: item.highestBidder,
			highestBidPrice: Number(item.highestBidPrice),
			expiryDate: Number(item.expiryDate),
			isSold: item.isSold,
			imageUrl: item.imageUrl,
		  });
		}
		return auctions;
	  } catch (error) {
		console.error('Error fetching auctions:', error);
		throw error;
	  }
	};
  
	useEffect(() => {
	  fetchPrice();
	}, [client]);
  
	return (
	  <ContractContext.Provider value={{ client, price, fetchPrice, finalizeAuction, placeBid, fetchAuctions }}>
		{children}
	  </ContractContext.Provider>
	);
  };
  
  export const useContract = () => {
	const context = useContext(ContractContext);
	if (context === undefined) {
	  throw new Error('useContract must be used within a ContractProvider');
	}
	return context;
  };
