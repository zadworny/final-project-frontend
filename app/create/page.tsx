'use client';

import React, { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';

interface FormData {
  title: string;
  description: string;
  startBidPrice: string;
  endTime: string;
  image: File | null;
}

export default function CreateAuction() {
  const { isConnected } = useAccount();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    startBidPrice: '',
    endTime: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Upload image to IPFS and data to the backend
    console.log('Auction created:', formData);
  };

  if (!isConnected) {
    return <p className="text-center text-gray-600">Please connect your wallet to create an auction.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Create New Auction</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startBidPrice">
            Starting Bid Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startBidPrice"
            type="number"
            name="startBidPrice"
            value={formData.startBidPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
            End Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endTime"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Item Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            onChange={handleImageUpload}
            accept="image/*"
            required
          />
        </div>
        {imagePreview && (
          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">Image Preview</p>
            <Image src={imagePreview} alt="Item preview" width={200} height={200} className="object-cover" />
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Auction
          </button>
        </div>
      </form>
    </div>
  );
}