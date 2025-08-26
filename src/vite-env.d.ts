/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK_ID: string;
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend window interface for appKit
declare global {
  interface Window {
    appKit?: {
      open?: () => void;
      connect?: () => void;
    };
  }
}
