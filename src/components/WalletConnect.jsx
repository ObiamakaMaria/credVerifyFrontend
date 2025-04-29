import React from "react";
import { appKit } from "../config/AppKit.js";
import { useAppKitAccount } from "@reown/appkit/react";
import { shortenAddress } from "../utils/index.js";

export default function ConnectButton() {
  const { address, isConnected } = useAppKitAccount();

  console.log("useAppKitAccount State: isConnected=", isConnected, "address=", address);

  const openConnectModal = () => {
    try {
      console.log("Opening modal via appKit...");
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
    <div>
      {!isConnected ? (
        <button 
          onClick={openConnectModal} 
          className="bg-button-gradient text-white font-bold py-2 px-6 rounded cursor-pointer"
        >
          Connect Wallet
        </button>
      ) : (
        <button 
          onClick={openConnectModal} 
          className="bg-button-gradient text-white font-bold py-2 px-6 rounded cursor-pointer"
        >
          {address ? shortenAddress(address) : 'Connecting...'}
        </button>
      )}
    </div>
  );
}
