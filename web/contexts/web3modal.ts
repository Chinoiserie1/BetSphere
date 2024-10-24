"use client";
import { PropsWithChildren } from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const testnet = {
  chainId: 4,
  name: "Rinkeby",
  currency: "ETH",
  explorerUrl: "https://rinkeby.etherscan.io",
  rpcUrl: "https://rinkeby.infura.io",
};

const blastMainet = {
  chainId: 81457,
  name: "Blast",
  currency: "ETH",
  explorerUrl: "https://blastscan.io",
  rpcUrl: "https://rpc.ankr.com/blast",
};

const blastTestnet = {
  chainId: 168587773,
  name: "Blast Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.blastexplorer.io",
  rpcUrl: "https://rpc.ankr.com/blast_testnet_sepolia",
};

const anvil = {
  chainId: 31337,
  name: "Anvil",
  currency: "ETH",
  explorerUrl: "",
  rpcUrl: "http://127.0.0.1:8545",
};

// 3. Create a metadata object
const metadata = {
  name: "better",
  description: "better is a decentralized betting platform.",
  url: process.env.NEXT_PUBLIC_WEBSITE_URL || "",
  icons: ["https://avatars.mywebsite.com/"],
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [blastTestnet, anvil],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3Modal({ children }: PropsWithChildren<{}>) {
  return children;
}
