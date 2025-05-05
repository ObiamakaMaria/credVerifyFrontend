import React from 'react';
import { Link } from 'react-router-dom';
import { useAppKitAccount } from "@reown/appkit/react";
import { appKit } from "../config/AppKit.js";
import { shortenAddress } from "../utils/index.js";

const LaunchPage = () => {
  const { address, isConnected } = useAppKitAccount();

  const openConnectModal = () => {
    try {
      if (appKit.open) {
        appKit.open();
      } else if (appKit.connect) {
        appKit.connect();
      }
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#12081f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to CredVerify</h1>
          <Link 
            to="/" 
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg px-4 py-2 transition"
          >
            Back to Home
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Connect Your Wallet</h2>
          <p className="text-gray-300 mb-8">
            To access the dashboard and start building your credit, please connect your wallet.
          </p>

          {!isConnected ? (
            <button 
              onClick={openConnectModal} 
              className="bg-button-gradient text-white font-bold py-3 px-6 rounded-lg cursor-pointer hover:opacity-90 transition"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                <span className="text-green-400">Wallet Connected</span>
                <span className="text-gray-400">{shortenAddress(address)}</span>
              </div>
              <Link 
                to="/dashboard" 
                className="inline-block bg-button-gradient text-white font-bold py-3 px-6 rounded-lg cursor-pointer hover:opacity-90 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchPage; 