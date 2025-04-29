import React, { useEffect, useState } from "react";
import { appKit } from "../config/index";

export default function ConnectButton() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (appKit.isConnected?.()) {
          const accounts = await appKit.getAccounts?.();
          if (accounts && accounts.length > 0) {
            setConnected(true);
            setAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error("Connection check error:", error);
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts) => {
      if (accounts && accounts.length > 0) {
        setConnected(true);
        setAddress(accounts[0]);
      } else {
        setConnected(false);
        setAddress("");
      }
    };

    appKit.on?.('accountsChanged', handleAccountsChanged);

    return () => {
      appKit.off?.('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const openConnectModal = () => {
    try {
      console.log("Opening modal...");
      if (appKit.open) {
        appKit.open();
      } else if (appKit.connect) {
        appKit.connect();
      }
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  const openNetworkModal = () => {
    try {
      console.log("Opening network modal...");
      if (appKit.open) {
        appKit.open({ view: "Networks" });
      }
    } catch (error) {
      console.error("Error opening network modal:", error);
    }
  };

  return (
    <div>
      {!connected ? (
        <button 
          onClick={openConnectModal} 
          className="bg-button-gradient text-white font-bold py-2 px-6 rounded cursor-pointer"
        >
          Connect Wallet
        </button>
      ) : (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h3>Connected!</h3>
          <p><strong>Address:</strong> {address}</p>
          <button 
            onClick={openConnectModal}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded cursor-pointer mt-2 text-sm"
          >
            Manage Connection
          </button>
        </div>
      )}
    </div>
  );
}
