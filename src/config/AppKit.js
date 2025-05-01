import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { liskSepolia, mainnet } from "@reown/appkit/networks";

export const supportedNetworks = [ liskSepolia, mainnet];

const projectId = process.env.VITE_REOWN_PROJECT_ID;

export const metadata = {
    name: "My dApp",
    description: "My Web3 application",
    url: window.location.origin,
    icons: ["https://mydapp.com/icon.png"],
  };

export const appKit = createAppKit({
    adapters: [new EthersAdapter()],
    networks: [liskSepolia, mainnet],
    metadata,
    projectId,
    features: {
      analytics: true,
    },
});